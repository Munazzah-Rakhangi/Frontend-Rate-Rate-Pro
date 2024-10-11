import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Doughnut, PolarArea, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    RadialLinearScale, // No trailing comma after RadialLinearScale if this is the last item
} from 'chart.js';
import './ProfessorResultsPage.css';

// Register the required components from Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadialLinearScale);

const ProfessorResultsPage = () => {
    const location = useLocation();
    const { query } = location.state || {};
    const professorName = query || 'Unknown Professor';

    // State to hold professor data
    const [professorData, setProfessorData] = useState(null);

    // Fetch professor data from the backend (simulated for now)
    useEffect(() => {
        // Simulated professor data from backend
        const fetchedData = {
            name: professorName,
            photo: '/images/Professor_image.png',
            department: 'Computer Science Department',
            contact: 'john.doe@university.edu',
            bio: 'Dr. John Doe is a distinguished professor of Computer Science with over 20 years of teaching experience in AI and Data Science.',
            courses: [
                { code: 'CS101', name: 'Introduction to Computer Science' },
                { code: 'CS202', name: 'Data Structures and Algorithms' },
                { code: 'CS303', name: 'Artificial Intelligence' }
            ],
            overallRating: 3.5, // Overall rating value out of 5
            ratingsDistribution: { // Sample data for horizontal bar chart
                Awful: 3,
                OK: 0,
                Good: 1,
                Great: 0,
                Awesome: 0
            },
            chartData: {
                donut: [70, 30], // Sample data for donut chart
                nightingale: [80, 65, 45], // Sample data for nightingale chart
            },
            comments: [
                'Great professor, explains the concepts clearly.👍',
                'Provides real-world examples to make learning easy.',
                'Courses are challenging but rewarding.',
                'Very approachable and willing to help.'
            ]
        };
        setProfessorData(fetchedData);
    }, [professorName]);

    // Donut chart data configuration
    const donutData = {
        labels: ['Yes', 'No'],
        datasets: [
            {
                label: 'Would like to take it again?',
                data: professorData ? professorData.chartData.donut : [0, 0],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverOffset: 4,
            },
        ],
    };

    // Nightingale (Polar Area) chart data configuration
    const nightingaleData = {
        labels: ['Academic Ability', 'Teaching Quality', 'Interaction with Students'],
        datasets: [
            {
                label: 'Ratings',
                data: professorData ? professorData.chartData.nightingale : [0, 0, 0],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    // Horizontal Bar Chart configuration
    const horizontalBarData = {
        labels: professorData ? Object.keys(professorData.ratingsDistribution) : [],
        datasets: [
            {
                label: 'Number of Students',
                data: professorData ? Object.values(professorData.ratingsDistribution) : [],
                backgroundColor: '#007bff',
                hoverBackgroundColor: '#0056b3',
            }
        ],
    };

    const horizontalBarOptions = {
        indexAxis: 'y', // Horizontal bar chart
        scales: {
            x: {
                beginAtZero: true,
                max: 5 // Scale should match the number of ratings categories
            }
        },
        responsive: true,
        plugins: {
            legend: {
                display: false // Hide legend for simplicity
            },
        },
    };

    return (
        <div className="professor-results-container">
            {professorData ? (
                <div className="professor-results-content">
                    <div className="professor-profile-section card">
                        <img src={professorData.photo} alt={`${professorData.name}`} className="professor-photo" />
                        <h3>{professorData.name}</h3>
                        <p>{professorData.department}</p>
                        <p>Email: {professorData.contact}</p>
                        {/* Compare and Rate buttons */}
                        <div className="button-container">
                            <button className="compare-button">Compare</button>
                            <button className="rate-button">Rate</button>
                        </div>
                    </div>

                    <div className="professor-courses-section card">
                        <h2 className="card-title">List of Courses</h2>
                        <ul>
                            {professorData.courses?.map((course) => (
                                <li key={course.code}>
                                    <span className="course-code">{course.code}:</span> {course.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="professor-data-visualization-section card">
                        <h2 className="card-title">Ratings and Visualizations</h2>
                        <div className="visualizations">
                            {/* Donut Chart */}
                            <div className="chart-container">
                                <h3>Would Like to Take it Again?</h3>
                                <Doughnut data={donutData} />
                            </div>

                            {/* Nightingale (Polar Area) Chart */}
                            <div className="chart-container">
                                <h3>Nightingale Chart</h3>
                                <PolarArea data={nightingaleData} />
                            </div>

                            {/* Horizontal Bar Graph and Overall Rating */}
                            <div className="rating-graph-container">
                                <h3>Rating Distribution</h3>
                                <div className="horizontal-bar-chart">
                                    <Bar data={horizontalBarData} options={horizontalBarOptions} />
                                </div>

                                {/* Overall Rating */}
                                <div className="overall-rating">
                                    <h3>Overall Rating</h3>
                                    <div className="rating-score">
                                        <span className="score-value">{professorData.overallRating}</span>
                                        <span className="score-max">/5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="professor-comments-section card">
                        <h2 className="card-title">Sample Comments/Reviews</h2>
                        <ul className="comments-list">
                            {professorData.comments?.map((comment, index) => (
                                <li key={index}>{comment}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <p>Loading...</p> // Show a loading indicator if data is not yet loaded
            )}
        </div>
    );
};

export default ProfessorResultsPage;
