// Import necessary components
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
    RadialLinearScale,
} from 'chart.js';
import './ProfessorResultsPage.css';

// Register required Chart.js components
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
    const { query } = location.state || {};
    const professorName = query || 'Unknown Professor';

    const [professorData, setProfessorData] = useState(null);

    useEffect(() => {
        const fetchedData = {
            name: professorName,
            photo: '/images/Professor_image.png',
            department: 'Computer Science Department',
            contact: 'john.doe@university.edu',
            bio: 'Dr. John Doe is a distinguished professor of Computer Science with over 20 years of teaching experience in AI and Data Science.',
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
                nightingale: [80, 65, 45],
            },
            comments: [
                'Great professor, explains the concepts clearly.👍',
                'Provides real-world examples to make learning easy.👍👌',
                'Courses are challenging but rewarding.💯',
                'Very approachable and willing to help.😇',
            ],
        };
        setProfessorData(fetchedData);
    }, [professorName]);

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
                            <div className="chart-container">
                                <h3>Would Like to Take it Again?</h3>
                                <Doughnut data={donutData} />
                            </div>

                            <div className="chart-container">
                                <h3>Nightingale Chart</h3>
                                <PolarArea data={nightingaleData} />
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
                        <h2 className="card-title">Sample Comments/Reviews</h2>
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
