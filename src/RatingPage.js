import React, { useState, useEffect } from 'react';
import './RatingPage.css';
import { useNavigate, useLocation } from 'react-router-dom';

const RatingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { professor_id, courses = [] } = location.state || {};

    const [courseData, setCourseData] = useState([]);
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

    const inappropriateComments = [
        "dumbass", "useless", "asshole", "lazy", "loser"
    ];

    useEffect(() => {
        // Load professor data from localStorage
        const storedProfessorID = localStorage.getItem('professorID');
        const storedProfessorName = localStorage.getItem('professorName');
        const storedProfessorDepartment = localStorage.getItem('professorDepartment');
        const storedProfessorData = JSON.parse(localStorage.getItem('professorData'));

        setProfessorData({
            id: storedProfessorID || '',
            name: storedProfessorName || '',
            department: storedProfessorDepartment || '',
        });

        // Load courses from professorData in localStorage
        if (storedProfessorData && storedProfessorData.courses) {
            setCourseData(storedProfessorData.courses);
        } else if (professor_id) {
            fetch(`http://54.145.162.200:8000/v1/professor/courses/?professor_id=${professor_id}`)
                .then((response) => response.json())
                .then((data) => {
                    setCourseData(data);
                    localStorage.setItem('courses', JSON.stringify(data));
                })
                .catch((error) => console.error('Error fetching course data:', error));
        }
    }, [professor_id]);

    const handleCourseSelect = (courseName) => {
        setSelectedCourse(courseName);

        // Find course details from courseData
        const selectedCourse = courseData.find((course) => course.name === courseName);
        if (selectedCourse) {
            setSelectedCourseDetails({
                id: selectedCourse.id,
                status: selectedCourse.status,
            });
        } else {
            setSelectedCourseDetails({ id: '', status: '' });
        }
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

        // Validate comments
        if (!ratingData.comments || ratingData.comments.trim() === '') {
            setError('Comments cannot be empty.');
            return;
        }

        const containsInappropriateComment = inappropriateComments.some(keyword =>
            ratingData.comments.toLowerCase().includes(keyword)
        );

        if (containsInappropriateComment) {
            setError('Your comment contains inappropriate language. Please revise.');
            return;
        }

        // Retrieve user object from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        const studentId = user?.id; // Extract id from user object

        if (!studentId) {
            setError('User not logged in. Please log in to submit your rating.');
            return;
        }

        // Prepare the payload for the POST API
        const payload = {
            course_id: selectedCourseDetails.id,
            student_id: studentId, // Use the extracted studentId
            professor_id: professorData.id,
            overall_rating: ratingData.overallRating,
            academic_ability: ratingData.academicAbility,
            teaching_ability: ratingData.teachingQuality,
            interactions_with_students: ratingData.interactionWithStudents,
            hardness: ratingData.courseHardness,
            feedback: ratingData.comments,
        };

        console.log('Submitting payload:', payload); // Debugging log to verify payload

        // POST API call
        fetch('http://54.145.162.200:8000/v1/rating/post/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        setError(data.message || 'Your comment contains inappropriate language.');
                        throw new Error(data.message || 'Your comment contains inappropriate language.');
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log('API response:', data); // Log API response
                setShowModal(true);

                // Reset the form fields
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
            .catch((error) => {
                console.error('Error submitting rating:', error);
            });
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
                <button className="top-button rating-home-button" onClick={() => navigate('/')}>
                    Homepage
                </button>
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
                        {courseData.map((course, index) => (
                            <option key={index} value={course.name}>
                                {course.name}
                            </option>
                        ))}
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
                        required
                    />
                </div>

                <button type="submit" className="submit-button">Submit</button>
            </form>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span role="img" aria-label="thumbs up">👍</span>
                        <p>Your rating has been successfully posted!</p>
                        <button onClick={() => setShowModal(false)}>Close</button>
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
