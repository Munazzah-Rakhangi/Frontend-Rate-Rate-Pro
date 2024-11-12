import React, { useEffect, useState } from 'react';
import { Doughnut, PolarArea, Bar } from 'react-chartjs-2';
import './ProfessorComparePage.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale, BarElement, CategoryScale, LinearScale);

const ProfessorComparePage = () => {
    const [professorData, setProfessorData] = useState(null);
    const [showSecondColumn, setShowSecondColumn] = useState(true);
    const [showThirdColumn, setShowThirdColumn] = useState(true);

    useEffect(() => {
        const storedProfessor = localStorage.getItem('selectedProfessor');
        if (storedProfessor) {
            const parsedProfessor = JSON.parse(storedProfessor);
            setProfessorData(parsedProfessor);
        }
    }, []);

    const handleCloseSecondColumn = () => {
        setShowSecondColumn(false);
    };

    const handleCloseThirdColumn = () => {
        setShowThirdColumn(false);
    };

    const wouldTakeAgainData = {
        labels: ['Yes', 'No'],
        datasets: [
            {
                label: 'Would Take Again',
                data: professorData ? professorData.wouldTakeAgain : [0, 0],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverOffset: 4,
            },
        ],
    };

    const nightingaleData = {
        labels: ['Academic Ability', 'Teaching Quality', 'Interaction with Students', 'Hardness'],
        datasets: [
            {
                label: 'Ratings',
                data: professorData ? professorData.nightingaleData : [0, 0, 0, 0],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
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

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: { display: false } // Remove legend for all charts
        }
    };

    return (
        <div className="professor-compare-container">
            <button className="compare-home-button">Home</button>
            <button className="compare-username-button">Username</button>
            <h1 className="professor-compare-heading">Compare Professors</h1>

            <div className="rating-search-bar">
                <input type="text" placeholder="Search Professor" />
            </div>

            <div className="cards-container">
                {/* First Column of Cards */}
                <div className="professor-card-column">
                    {professorData && (
                        <div className="professor-card">
                            <h2 className="professor-card-heading">{professorData.username}</h2>
                            <p>Major: {professorData.department}</p>
                            <p>Email: {professorData.email}</p>
                            <p>Overall Rating: {professorData.overallRating}</p>
                        </div>
                    )}
                    <div className="professor-card donut-card">
                        <h2>Would Take Again</h2>
                        <div className="donut-chart-container">
                            <Doughnut data={wouldTakeAgainData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="professor-card nightingale-card">
                        <h2>Nightingale Chart</h2>
                        <div className="nightingale-chart-container">
                            <PolarArea data={nightingaleData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="professor-card emoji-card">
                        <h2>Emoji-Based Rating Distribution</h2>
                        <div className="emoji-bar-chart-container">
                            <Bar data={emojiBarData} options={chartOptions} />
                        </div>
                    </div>
                </div>

                {/* Second Column of Cards with Close Button */}
                {showSecondColumn && (
                    <div className="professor-card-column second-column">
                        <div className="professor-card">
                            <button className="close-button" onClick={handleCloseSecondColumn}>✕</button>
                            <h2 className="professor-card-heading">Professor B</h2>
                            <p>Major: Science</p>
                            <p>Email: professorb@example.com</p>
                            <p>Overall Rating: 4.2</p>
                        </div>
                        <div className="professor-card donut-card">
                            <h2>Would Take Again</h2>
                            <Doughnut data={wouldTakeAgainData} options={chartOptions} />
                        </div>
                        <div className="professor-card nightingale-card">
                            <h2>Nightingale Chart</h2>
                            <PolarArea data={nightingaleData} options={chartOptions} />
                        </div>
                        <div className="professor-card emoji-card">
                            <h2>Emoji-Based Rating Distribution</h2>
                            <Bar data={emojiBarData} options={chartOptions} />
                        </div>
                    </div>
                )}

                {/* Third Column of Cards with Close Button */}
                {showThirdColumn && (
                    <div className="professor-card-column third-column">
                        <div className="professor-card">
                            <button className="close-button" onClick={handleCloseThirdColumn}>✕</button>
                            <h2 className="professor-card-heading">Professor C</h2>
                            <p>Major: Arts</p>
                            <p>Email: professorc@example.com</p>
                            <p>Overall Rating: 3.8</p>
                        </div>
                        <div className="professor-card donut-card">
                            <h2>Would Take Again</h2>
                            <Doughnut data={wouldTakeAgainData} options={chartOptions} />
                        </div>
                        <div className="professor-card nightingale-card">
                            <h2>Nightingale Chart</h2>
                            <PolarArea data={nightingaleData} options={chartOptions} />
                        </div>
                        <div className="professor-card emoji-card">
                            <h2>Emoji-Based Rating Distribution</h2>
                            <Bar data={emojiBarData} options={chartOptions} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfessorComparePage;
