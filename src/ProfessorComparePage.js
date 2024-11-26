import React, { useEffect, useState } from 'react';
import { Doughnut, PolarArea, Bar } from 'react-chartjs-2';
import './ProfessorComparePage.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale, BarElement, CategoryScale, LinearScale);

const ProfessorComparePage = () => {
    const [professorData, setProfessorData] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // For search input
    const [searchResults, setSearchResults] = useState([]); // Store API search results
    const [selectedProfessors, setSelectedProfessors] = useState([]); // Manage selected professors
    const [userName, setUserName] = useState(''); // State to manage the username display

    useEffect(() => {
        // Retrieve professor data from localStorage if it exists
        const storedProfessor = localStorage.getItem('selectedProfessor');
        if (storedProfessor) {
            const parsedProfessor = JSON.parse(storedProfessor);
            setProfessorData(parsedProfessor);
        }

        // Check for user data in localStorage to determine if coming from LandingPage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUserName(userData.username); // Display username if coming from LandingPage
        } else {
            setUserName(''); // Keep button as "Username" if accessed from elsewhere
        }
    }, []);

    // Fetch search results from the API
    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.trim() !== '') {
            try {
                const response = await fetch(`http://54.209.124.57:8000/v1/user/search/?query=${query}`);
                if (response.ok) {
                    const result = await response.json();
                    console.log('Search Results:', result); // Log results for debugging
                    setSearchResults(result);
                } else {
                    console.error('Error fetching search results');
                    setSearchResults([]);
                }
            } catch (error) {
                console.error(error.message);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    };

    // Handle when a professor is selected from the dropdown
    const handleSelectProfessor = (professor) => {
        if (selectedProfessors.length < 2) {
            // Add the selected professor with dummy data
            setSelectedProfessors([...selectedProfessors, {
                id: professor.userid,
                name: professor.username,
                department: professor.major,
                email: professor.email,
                overallRating: professor.overallRating || 4.0,
                wouldTakeAgain: [70, 30], // Dummy "Would Take Again" data
                nightingaleData: [4.5, 3.5, 4.0, 3.8], // Dummy Nightingale Chart data
                emojiRatings: { '😀': 40, '🙂': 30, '😐': 15, '☹️': 10, '😡': 5 } // Dummy Emoji Ratings
            }]);
        }
        setSearchQuery('');
        setSearchResults([]);
    };

    const chartOptions = {
        maintainAspectRatio: true,
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        layout: {
            padding: 10
        }
    };

    const emojiBarChartOptions = {
        ...chartOptions,
        indexAxis: 'y' // Make the bar chart horizontal
    };

    const wouldTakeAgainData = {
        labels: ['Yes', 'No'],
        datasets: [
            {
                label: 'Would Take Again',
                data: professorData?.wouldTakeAgain || [0, 0],
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
                data: professorData?.nightingaleData || [0, 0, 0, 0],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    const emojiBarData = {
        labels: professorData ? Object.keys(professorData.emojiRatings || {}) : [],
        datasets: [
            {
                label: 'Number of Students',
                data: professorData ? Object.values(professorData.emojiRatings || {}) : [],
                backgroundColor: ['#FF4C4C', '#FFB74D', '#4CAF50', '#64B5F6', '#BA68C8'],
                hoverBackgroundColor: ['#FF3D3D', '#FFA726', '#43A047', '#42A5F5', '#AB47BC'],
            },
        ],
    };

    return (
        <div className="professor-compare-container">
            <button className="compare-home-button">Home</button>
            <button className="compare-username-button">
                {userName ? `Hey, ${userName}` : 'Username'}
            </button>
            <h1 className="professor-compare-heading">Compare Professors</h1>

            <div className="rating-search-bar">
                <input
                    type="text"
                    placeholder="Search Professor"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                {searchResults.length > 0 && (
                    <div className="search-dropdown">
                        {searchResults.map((prof) => (
                            <div
                                key={prof.userid}
                                className="search-dropdown-item"
                                onClick={() => handleSelectProfessor(prof)}
                            >
                                {prof.username} ({prof.role})
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="cards-container">
                {/* First column */}
                <div className="professor-card-column first-column">
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
                        <div className="donut-chart-container first-donut">
                            <Doughnut data={wouldTakeAgainData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="professor-card nightingale-card">
                        <h2>Nightingale Chart</h2>
                        <div className="nightingale-chart-container first-nightingale">
                            <PolarArea data={nightingaleData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="professor-card emoji-card">
                        <div className="emoji-heading-container">
                            <h2>Emoji-Based Rating Distribution</h2>
                        </div>
                        <div className="emoji-bar-chart-container first-emoji-bar">
                            <Bar data={emojiBarData} options={emojiBarChartOptions} />
                        </div>
                    </div>
                </div>

                {/* Dynamically render second and third columns */}
                {selectedProfessors.map((prof, index) => (
                    <div key={index} className={`professor-card-column ${index === 0 ? 'second-column' : 'third-column'}`}>
                        <div className="professor-card">
                            <h2 className="professor-card-heading">{prof.name}</h2>
                            <p>Major: {prof.department}</p>
                            <p>Email: {prof.email}</p>
                            <p>Overall Rating: {prof.overallRating}</p>
                        </div>
                        <div className="professor-card donut-card">
                            <h2>Would Take Again</h2>
                            <div className={`donut-chart-container ${index === 0 ? 'second-donut' : 'third-donut'}`}>
                                <Doughnut
                                    data={{
                                        labels: ['Yes', 'No'],
                                        datasets: [
                                            {
                                                label: 'Would Take Again',
                                                data: prof.wouldTakeAgain,
                                                backgroundColor: ['#36A2EB', '#FF6384'],
                                                hoverOffset: 4,
                                            },
                                        ],
                                    }}
                                    options={chartOptions}
                                />
                            </div>
                        </div>
                        <div className="professor-card nightingale-card">
                            <h2>Nightingale Chart</h2>
                            <div className={`nightingale-chart-container ${index === 0 ? 'second-nightingale' : 'third-nightingale'}`}>
                                <PolarArea
                                    data={{
                                        labels: ['Academic Ability', 'Teaching Quality', 'Interaction with Students', 'Hardness'],
                                        datasets: [
                                            {
                                                label: 'Ratings',
                                                data: prof.nightingaleData,
                                                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
                                                borderColor: '#fff',
                                                borderWidth: 1,
                                            },
                                        ],
                                    }}
                                    options={chartOptions}
                                />
                            </div>
                        </div>
                        <div className="professor-card emoji-card">
                            <div className="emoji-heading-container">
                                <h2>Emoji-Based Rating Distribution</h2>
                            </div>
                            <div className={`emoji-bar-chart-container ${index === 0 ? 'second-emoji-bar' : 'third-emoji-bar'}`}>
                                <Bar
                                    data={{
                                        labels: Object.keys(prof.emojiRatings),
                                        datasets: [
                                            {
                                                label: 'Number of Students',
                                                data: Object.values(prof.emojiRatings),
                                                backgroundColor: ['#FF4C4C', '#FFB74D', '#4CAF50', '#64B5F6', '#BA68C8'],
                                                hoverBackgroundColor: ['#FF3D3D', '#FFA726', '#43A047', '#42A5F5', '#AB47BC'],
                                            },
                                        ],
                                    }}
                                    options={emojiBarChartOptions}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfessorComparePage;
