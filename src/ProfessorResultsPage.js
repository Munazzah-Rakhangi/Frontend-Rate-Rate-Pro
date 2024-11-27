import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const { professor } = location.state || {};

    const [professorData, setProfessorData] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch professor data
                const response = await fetch('http://54.209.124.57:8000/v1/fetch/overallrating/?professor_id=1');
                const data = await response.json();

                console.log("API Response:", data); // Debug log to inspect data

                // Save professor details and API response to local storage
                const professorId = professor?.id || '1'; // Use provided ID or fallback to default
                const professorName = professor?.username || 'Unknown Professor';
                const professorDepartment = professor?.department || 'Unknown Department';
                const professorEmail = professor?.email || 'Unknown Email';

                const storedData = {
                    id: professorId,
                    username: professorName,
                    department: professorDepartment,
                    email: professorEmail,
                    overallRating: data.overall_rating,
                    wouldTakeAgain: [data.would_take_again["1"], data.would_take_again["0"]],
                    nightingaleData: [
                        data.academic_ability,
                        data.teaching_ability,
                        data.interactions_with_students,
                        data.hardness,
                    ],
                    courses: data.courses,
                    comments: data.feedback,
                };

                localStorage.setItem('professorData', JSON.stringify(storedData));

                // Set professor data to state
                const fetchedData = {
                    name: professorName,
                    department: professorDepartment,
                    email: professorEmail,
                    photo: '/images/Professor_image.png',
                    bio: 'Dr. John Doe is a distinguished professor of Computer Science with over 20 years of teaching experience in AI and Data Science.',
                    courses: data.courses.map((course) => ({ name: course.name || 'Course Name Unavailable' })),
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
            } catch (error) {
                console.error('Error fetching professor data:', error);
            }
        };

        fetchData();
    }, [professor]);

    const handleRateClick = () => {
        console.log("Navigating with courses:", professorData.courses); // Debugging log to verify course data
        navigate('/rating', { state: { professor_id: professor.id, courses: professorData.courses } });
    };

    const handleCompareClick = () => {
        navigate('/professor-compare');
    };

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
                display: false,
            },
        },
        maintainAspectRatio: false,
    };

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
                    <div className="professor-profile-section card">
                        <img
                            src={professorData.photo}
                            alt={`${professorData.name}`}
                            className="professor-photo"
                        />
                        <h3>{professorData.name}</h3>
                        <p>{professorData.department}</p>
                        <p>Email: {professorData.email}</p>
                        <div className="button-container">
                            <button className="compare-button" onClick={handleCompareClick}>Compare</button>
                            <button className="rate-button" onClick={handleRateClick}>Rate</button>
                        </div>
                    </div>
                    
                    <div className="professor-courses-section card">
                        <h2 className="card-title">List of Courses</h2>
                        <ul>
                            {professorData.courses?.map((course, index) => (
                                <li key={index}>{course.name}</li>
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
