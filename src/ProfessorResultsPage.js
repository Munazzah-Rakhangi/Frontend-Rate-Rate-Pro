import React from 'react';
import { useLocation } from 'react-router-dom';
import './ProfessorResultsPage.css';

const ProfessorResultsPage = () => {
    const location = useLocation();
    const { query } = location.state || {};
    const professorName = query || 'Unknown Professor';

    const professor = {
        name: professorName,
        photo: '/images/professor.png',
        department: 'Computer Science Department',
        contact: 'john.doe@university.edu',
        bio: 'Dr. John Doe is a distinguished professor of Computer Science with over 20 years of teaching experience in AI and Data Science.',
        courses: [
            { code: 'CS101', name: 'Introduction to Computer Science' },
            { code: 'CS202', name: 'Data Structures and Algorithms' },
            { code: 'CS303', name: 'Artificial Intelligence' }
        ],
        overallRating: 4.5,
        ratings: [
            { category: 'Knowledge', score: 4.8 },
            { category: 'Clarity', score: 4.6 },
            { category: 'Helpfulness', score: 4.4 },
            { category: 'Easiness', score: 3.8 }
        ]
    };

    return (
        <div className="professor-results-container">
            {/* Professor Profile Section */}
            <div className="professor-profile">
                <div className="professor-photo-container">
                    <img src={professor.photo} alt={`${professor.name} Photo`} className="professor-photo" />
                    <div className="photo-overlay">
                        {/* Icon placed inside the photo container */}
                        <img src="/images/camera-icon.png" alt="Icon" className="overlay-icon" />
                    </div>
                </div>
                <div className="professor-details">
                    <h1 className="professor-name">{professor.name}</h1>
                    <p className="professor-department">{professor.department}</p>
                    <p className="professor-contact">Contact: {professor.contact}</p>
                    <p className="professor-bio">{professor.bio}</p>
                </div>
            </div>

            {/* Overall Rating Section */}
            <div className="professor-rating">
                <h2>Overall Rating</h2>
                <div className="rating-stars">
                    {Array.from({ length: 5 }, (_, index) => (
                        <span key={index} className={`star ${index < professor.overallRating ? 'filled' : ''}`}>
                            ★
                        </span>
                    ))}
                </div>
                <p className="rating-score">Overall Score: {professor.overallRating}/5</p>
            </div>

            {/* Courses Taught Section */}
            <div className="professor-courses">
                <h2>Courses Taught</h2>
                <ul>
                    {professor.courses.map(course => (
                        <li key={course.code}>
                            <span className="course-code">{course.code}:</span> {course.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Data Visualization Component */}
            <div className="professor-data-visualization">
                <h2>Ratings Breakdown</h2>
                <div className="ratings-chart">
                    {professor.ratings.map(rating => (
                        <div key={rating.category} className="rating-bar">
                            <div className="rating-category">{rating.category}</div>
                            <div className="rating-score-bar" style={{ width: `${rating.score * 20}%` }}>
                                {rating.score}/5
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfessorResultsPage;
