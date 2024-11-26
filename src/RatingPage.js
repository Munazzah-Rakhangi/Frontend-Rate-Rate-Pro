import React, { useState, useEffect } from 'react';
import './RatingPage.css';
import { useNavigate, useLocation } from 'react-router-dom';

const RatingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { professor_id, courses = [] } = location.state || {}; 

    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    const [courseData, setCourseData] = useState(courses.length > 0 ? courses : storedCourses);
    const [professorData, setProfessorData] = useState({ id: '', name: '', department: '' });
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedCourseDetails, setSelectedCourseDetails] = useState({ id: '', status: '' });
    const [ratingData, setRatingData] = useState({
        overallRating: 4,
        academicAbility: 0,
        teachingQuality: 0,
        interactionWithStudents: 0,
        courseHardness: 0,
        userGPA: '',
        comments: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

    // Hardcoded inappropriate comments
    const inappropriateComments = [
        "This professor is a dumbass",
        "This professor is a useless piece of crap",
        "What an absolute asshole of a professor",
        "The professor is a lazy bastard",
        "The professor is a looser"
    ];

    useEffect(() => {
        const storedProfessorID = localStorage.getItem('professorID');
        const storedProfessorName = localStorage.getItem('professorName');
        const storedProfessorDepartment = localStorage.getItem('professorDepartment');
        
        setProfessorData({
            id: storedProfessorID || '',
            name: storedProfessorName || '',
            department: storedProfessorDepartment || ''
        });

        if (professor_id && courses.length === 0) {
            fetch(`http://54.209.124.57:8000/v1/professor/courses/?professor_id=${professor_id}`)
                .then(response => response.json())
                .then(data => {
                    setCourseData(data);
                    localStorage.setItem('courses', JSON.stringify(data));
                })
                .catch(error => console.error('Error fetching professor data:', error));
        }
    }, [professor_id, courses]);

    const hardcodedCourses = {
        "PSD": { id: 3, status: "Active" },
        "Intro to AI": { id: 1, status: "Active" },
        "Intro to ML": { id: 2, status: "Active" }
    };

    const handleCourseSelect = (courseName) => {
        setSelectedCourse(courseName);
        const courseDetails = hardcodedCourses[courseName] || { id: '', status: '' };
        setSelectedCourseDetails({
            id: courseDetails.id,
            status: courseDetails.status
        });
    };

    const handleChange = (name, value) => {
        setRatingData({
            ...ratingData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        // Validate comments field for inappropriate content
        if (!ratingData.comments || ratingData.comments.trim() === '') {
            setError('Comments cannot be empty.');
            return;
        }

        // Check for inappropriate comments
        const containsInappropriateComment = inappropriateComments.some(comment =>
            ratingData.comments.toLowerCase().includes(comment.toLowerCase())
        );

        if (containsInappropriateComment) {
            setError('Your comment contains inappropriate language. Please revise.');
            return;
        }

        setShowModal(true);

        fetch('http://3.88.219.13:8000/v1/rating/post/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                course_id: selectedCourseDetails.id,
                student_id: 1,
                professor_id: professorData.id,
                overall_rating: ratingData.overallRating,
                academic_ability: ratingData.academicAbility,
                teaching_ability: ratingData.teachingQuality,
                interactions_with_students: ratingData.interactionWithStudents,
                hardness: ratingData.courseHardness,
                feedback: ratingData.comments,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        setError(data.message || 'Failed to submit rating');
                        throw new Error(data.message || 'Failed to submit rating');
                    });
                }
                return response.json();
            })
            .then(() => {
                console.log('Rating submitted successfully!');
                setShowModal(true);
                // Reset form fields on successful submission
                setRatingData({
                    overallRating: 4,
                    academicAbility: 0,
                    teachingQuality: 0,
                    interactionWithStudents: 0,
                    courseHardness: 0,
                    userGPA: '',
                    comments: '',
                });
                setSelectedCourse('');
                setSelectedCourseDetails({ id: '', status: '' });
            })
            .catch((error) => console.error('Error submitting rating:', error));
    };

    const sliderLabels = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

    const renderTimeline = (label, valueKey) => (
        <div className="form-group">
            <label>{label}:</label>
            <div className="timeline-container">
                {sliderLabels.map((label) => (
                    <div
                        key={label}
                        className={`timeline-marker ${ratingData[valueKey] === label ? 'active' : ''}`}
                        onClick={() => handleChange(valueKey, label)}
                    />
                ))}
            </div>
            <div className="slider-labels-below">
                {sliderLabels.map((label) => (
                    <span key={label}>{label}</span>
                ))}
            </div>
        </div>
    );

    return (
        <div className="rating-page-container">
            <div className="top-row">
                <button className="top-button rating-home-button" onClick={() => navigate('/')}>Homepage</button>
                <button className="top-button rating-username-button">Username</button>
            </div>

            <div className="details-row">
                <div className="course-info">
                    <label>Course ID</label>
                    <input type="text" className="detail-input" value={selectedCourseDetails.id} readOnly />

                    <label>Course Name</label>
                    <select
                        className="detail-input"
                        value={selectedCourse}
                        onChange={(e) => handleCourseSelect(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a course</option>
                        <option value="PSD">PSD</option>
                        <option value="Intro to AI">Intro to AI</option>
                        <option value="Intro to ML">Intro to ML</option>
                    </select>

                    <label>Course Status</label>
                    <input type="text" className="detail-input" value={selectedCourseDetails.status} readOnly />
                </div>
                <div className="prof-info">
                    <label>Prof ID</label>
                    <input type="text" className="detail-input" value={professorData.id} readOnly />
                    <label>Name</label>
                    <input type="text" className="detail-input" value={professorData.name} readOnly />
                    <label>Department</label>
                    <input type="text" className="detail-input" value={professorData.department} readOnly />
                </div>
            </div>

            <form className="rating-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Would take again:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="wouldTakeAgain"
                                value="yes"
                                checked={ratingData.wouldTakeAgain === 'yes'}
                                onChange={(e) => handleChange('wouldTakeAgain', e.target.value)}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="wouldTakeAgain"
                                value="no"
                                checked={ratingData.wouldTakeAgain === 'no'}
                                onChange={(e) => handleChange('wouldTakeAgain', e.target.value)}
                            />
                            No
                        </label>
                    </div>
                </div>

                {renderTimeline('Academic Ability', 'academicAbility')}
                {renderTimeline('Teaching Quality', 'teachingQuality')}
                {renderTimeline('Interaction with Students', 'interactionWithStudents')}
                {renderTimeline('Hardness of the course', 'courseHardness')}

                <div className="form-group">
                    <label>GPA:</label>
                    <input
                        type="text"
                        name="userGPA"
                        value={ratingData.userGPA}
                        onChange={(e) => handleChange('userGPA', e.target.value)}
                        placeholder="Enter your GPA"
                    />
                </div>

                <div className="form-group">
                    <label>Comments:</label>
                    <textarea
                        name="comments"
                        value={ratingData.comments}
                        onChange={(e) => handleChange('comments', e.target.value)}
                        placeholder="Write your comments"
                    />
                </div>

                <button type="submit" className="submit-button">Submit</button>
            </form>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span role="img" aria-label="thumbs up">👍</span>
                        <p>Your rating has been successfully posted!</p>
                        <button onClick={() => {
                            // Close the modal and reset form data
                            setShowModal(false);
                            setRatingData({
                                overallRating: 4,
                                academicAbility: 0,
                                teachingQuality: 0,
                                interactionWithStudents: 0,
                                courseHardness: 0,
                                userGPA: '',
                                comments: '',
                            });
                            setSelectedCourse('');
                            setSelectedCourseDetails({ id: '', status: '' });
                        }}>Close</button>
                    </div>
                </div>
            )}

            {error && (
                <div className="modal-overlay">
                    <div className="modal-content error">
                        <span role="img" aria-label="error">⚠️</span>
                        <p>{error}</p>
                        <button onClick={() => setError(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RatingPage;
