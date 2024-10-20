import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Doughnut, PolarArea, Bar } from 'react-chartjs-2';
import './ProfessorResultsPage.css';

// Register required Chart.js components
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
} from 'chart.js';
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    RadialLinearScale
);

const ProfessorResultsPage = () => {
    const location = useLocation();
    const { professor, query } = location.state || {};  // Get both professor object or query
    
    const [professorData, setProfessorData] = useState(null);

    useEffect(() => {
        if (professor) {
            // When professor object is provided (e.g., from LandingPage.js)
            const fetchedData = {
                name: professor.username,
                photo: '/images/Professor_image.png',
                department: `${professor.major} Department`,
                contact: 'john.doe@university.edu',
                bio: 'Dr. John Doe is a distinguished professor with over 20 years of teaching experience.',
                courses: [
                    { code: 'CS101', name: 'Introduction to Computer Science' },
                    { code: 'CS202', name: 'Data Structures and Algorithms' },
                    { code: 'CS303', name: 'Artificial Intelligence' },
                ],
                overallRating: 3.5,
                emojiRatings: {
                    '😡 Awful': 3,
                    '😐 OK': 0,
                    '🙂 Good': 1,
                    '😄 Great': 0,
                    '🤩 Awesome': 0,
                },
                chartData: {
                    donut: [70, 30],
                    nightingale: [80, 65, 45, 70], // Hardness included
                },
                comments: [
                    'Great professor, explains the concepts clearly.👍',
                    'Courses are challenging but rewarding.💯',
                    'Very approachable and willing to help.😇',
                ],
            };
            setProfessorData(fetchedData);
        } else if (query) {
            // Simulate fetching professor data based on the query (from App.js)
            const fetchedData = {
                name: query,
                photo: '/images/Professor_image.png',
                department: 'Computer Science Department',
                contact: `${query.toLowerCase()}@university.edu`,
                bio: `Professor ${query} is a well-respected faculty member with expertise in multiple areas.`,
                courses: [
                    { code: 'CS101', name: 'Introduction to Computer Science' },
                    { code: 'CS202', name: 'Data Structures and Algorithms' },
                    { code: 'CS303', name: 'Artificial Intelligence' },
                ],
                overallRating: 4.0,
                emojiRatings: {
                    '😡 Awful': 1,
                    '😐 OK': 2,
                    '🙂 Good': 4,
                    '😄 Great': 5,
                    '🤩 Awesome': 3,
                },
                chartData: {
                    donut: [85, 15],
                    nightingale: [90, 80, 60, 75],
                },
                comments: [
                    'Excellent teaching style.👍',
                    'Provides real-world examples.👌',
                    'Courses are challenging but rewarding.💯',
                ],
            };
            setProfessorData(fetchedData);
        }
    }, [professor, query]);

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

    const donutOptions = {
        plugins: {
            legend: {
                display: false, // Hide the legend for the Donut chart
            },
        },
        maintainAspectRatio: false, // Ensure the chart fits its container
    };

    const nightingaleData = {
        labels: ['Academic Ability', 'Teaching Quality', 'Interaction with Students', 'Hardness'], // Added "Hardness"
        datasets: [
            {
                label: 'Ratings',
                data: professorData ? professorData.chartData.nightingale : [0, 0, 0, 0], // Updated data to include Hardness
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'], // Added color for Hardness
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    const nightingaleOptions = {
        maintainAspectRatio: false, // Allow the chart to grow to fill the container
        scales: {
            r: {
                ticks: {
                    display: false, // Remove inner axis labels for a cleaner look
                },
            },
        },
        plugins: {
            legend: {
                display: false, // Hide the legend labels
            },
        },
    };

    const emojiBarData = {
        labels: professorData ? Object.keys(professorData.emojiRatings) : [],
        datasets: [
            {
                label: 'Number of Students',
                data: professorData ? Object.values(professorData.emojiRatings) : [],
                backgroundColor: ['#FF4C4C', '#FFB74D', '#4CAF50', '#64B5F6', '#BA68C8'],
                hoverBackgroundColor: ['#FF3D3D', '#FFA726', '#43A047', '#42A5F5', '#AB47BC'],
            },
        ],
    };

    const emojiBarOptions = {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                max: 5,
            },
        },
        plugins: {
            legend: {
                display: false, // Remove the legend for the emoji bar chart
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value} students`;
                    },
                },
            },
        },
        responsive: true,
    };

    return (
        <div className="professor-results-container">
            {professorData ? (
                <div className="professor-results-content">
                    <div className="professor-profile-section card">
                        <img
                            src={professorData.photo}
                            alt={`${professorData.name}`}
                            className="professor-photo"
                        />
                        <h3>{professorData.name}</h3>
                        <p>{professorData.department}</p>
                        <p>Email: {professorData.contact}</p>
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
                            <div className="chart-container doughnut-chart">
                                <h3>Would Like to Take it Again?</h3>
                                <Doughnut data={donutData} options={donutOptions} />
                            </div>

                            <div className="chart-container nightingale-chart">
                                <h3>Nightingale Chart</h3>
                                <PolarArea data={nightingaleData} options={nightingaleOptions} />
                            </div>

                            <div className="rating-graph-container">
                                <h3>Emoji-Based Rating Distribution</h3>
                                <div className="horizontal-bar-chart">
                                    <Bar data={emojiBarData} options={emojiBarOptions} />
                                </div>

                                <div className="overall-rating">
                                    <h3>Overall Rating</h3>
                                    <div className="rating-score">
                                        <span className="score-value">{professorData.overallRating}</span>
                                        <span className="score-max">/5</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Separate Legends Section */}
                        <div className="chart-legends">
                            <div className="donut-chart-legend">
                                {/* <h3>Donut Chart Legend</h3> */}
                                <div className="donut-legend-item">
                                    <span className="donut-legend-color" style={{ backgroundColor: '#36A2EB' }}></span>
                                    Yes
                                </div>
                                <div className="donut-legend-item">
                                    <span className="donut-legend-color" style={{ backgroundColor: '#FF6384' }}></span>
                                    No
                                </div>
                            </div>

                            <div className="nightingale-chart-legend">
                                {/* <h3>Nightingale Chart Legend</h3> */}
                                <div className="nightingale-legend-item">
                                    <span className="nightingale-legend-color" style={{ backgroundColor: '#36A2EB' }}></span>
                                    Academic Ability
                                </div>
                                <div className="nightingale-legend-item">
                                    <span className="nightingale-legend-color" style={{ backgroundColor: '#FF6384' }}></span>
                                    Teaching Quality
                                </div>
                                <div className="nightingale-legend-item">
                                    <span className="nightingale-legend-color" style={{ backgroundColor: '#FFCE56' }}></span>
                                    Interaction with Students
                                </div>
                                <div className="nightingale-legend-item">
                                    <span className="nightingale-legend-color" style={{ backgroundColor: '#4BC0C0' }}></span>
                                    Hardness
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="professor-comments-section card">
                        <h2 className="card-title">Feedbacks / Reviews</h2>
                        <ul className="comments-list">
                            {professorData.comments?.map((comment, index) => (
                                <li key={index}>{comment}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProfessorResultsPage;

