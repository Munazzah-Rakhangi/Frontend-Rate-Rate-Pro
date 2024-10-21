import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Doughnut, PolarArea, Bar } from 'react-chartjs-2';
import './ProfessorResultsPage.css';

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
    const { professor } = location.state || {}; // Extract professor data from location state

    const [professorData, setProfessorData] = useState(null);
    
    useEffect(() => {
        let professorName, professorDepartment, professorEmail;

        if (professor && professor.username) {
            professorName = professor.username;
            professorDepartment = professor.department;
            professorEmail = professor.email;
        } else {
            // Try to retrieve professor details from localStorage if not passed through state
            const storedProfessor = localStorage.getItem('selectedProfessor');
            if (storedProfessor) {
                const { username, department, email } = JSON.parse(storedProfessor);
                professorName = username;
                professorDepartment = department;
                professorEmail = email;
            } else {
                professorName = 'Unknown Professor';
                professorDepartment = 'Unknown Department';
                professorEmail = 'Unknown Email';
            }
        }

        // Fetch data from API
        fetch('http://54.144.209.246:8000/v1/fetch/overallrating/?professor_id=1') // Replace with your actual API endpoint
            .then((response) => response.json())
            .then((data) => {
                // Map API response to the required structure
                const fetchedData = {
                    name: professorName,
                    department: professorDepartment,
                    email: professorEmail, // Store the email
                    photo: '/images/Professor_image.png', // Assume this stays static
                    bio: 'Dr. John Doe is a distinguished professor of Computer Science with over 20 years of teaching experience in AI and Data Science.', // Static for now
                    courses: data.courses.map((course) => ({ code: '', name: course })), // Mapping API course data
                    overallRating: data.overall_rating,
                    emojiRatings: {
                        '😡 Awful': 1,
                        '😐 OK': 2,
                        '🙂 Good': 4,
                        '😄 Great': 3,
                        '🤩 Awesome': 1,
                    },
                    chartData: {
                        donut: [data.would_take_again["1"], data.would_take_again["0"]],
                        nightingale: [
                            data.academic_ability,
                            data.teaching_ability,
                            data.interactions_with_students,
                            data.hardness,
                        ],
                    },
                    comments: data.feedback,
                };
                setProfessorData(fetchedData);
            })
            .catch((error) => {
                console.error('Error fetching professor data:', error);
            });
    }, [professor]);

    // Donut chart for "Would take again?"
    const donutData = {
        labels: ['Yes', 'No'],
        datasets: [
            {
                label: 'Votes',
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

    // Nightingale chart for professor ratings
    const nightingaleData = {
        labels: ['Academic Ability', 'Teaching Quality', 'Interaction with Students', 'Hardness'],
        datasets: [
            {
                label: 'Ratings',
                data: professorData ? professorData.chartData.nightingale : [0, 0, 0, 0],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    const nightingaleOptions = {
        maintainAspectRatio: false,
        scales: {
            r: {
                ticks: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    // Emoji-based bar chart
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
                display: false,
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
                {/* Professor Profile Section */}
                    <div className="professor-profile-section card">
                        <img
                            src={professorData.photo}
                            alt={`${professorData.name}`}
                            className="professor-photo"
                        />
                        <h3>{professorData.name}</h3>
                        <p>{professorData.department}</p>
                        <p>Email: {professorData.email}</p> {/* Display the email */}
                        <div className="button-container">
                            <button className="compare-button">Compare</button>
                            <button className="rate-button">Rate</button>
                        </div>
                    </div>
                    {/* Courses Section */}
                    <div className="professor-courses-section card">
                        <h2 className="card-title">List of Courses</h2>
                        <ul>
                        {professorData.courses?.map((course, index) => (
                                <li key={index}>
                                    <span className="course-code">{course.code}</span> {course.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Data Visualization Section */}
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

                        {/* Legends Section */}
                        <div className="chart-legends">
                            <div className="donut-chart-legend">
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
