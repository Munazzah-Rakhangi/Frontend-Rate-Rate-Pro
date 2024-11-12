import React, { useState, useEffect } from 'react';
import './RatingPage.css';
import { useNavigate, useLocation } from 'react-router-dom';

const RatingPage = () => { 
  const navigate = useNavigate();
  const location = useLocation();
  const { professor_id, courses = [] } = location.state || {}; // Retrieve professor_id and courses from location.state
  
  const [professorData, setProfessorData] = useState({
    id: '',
    name: '',
    department: ''
  });
  const [courseData, setCourseData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(''); // New state for selected course
  const [ratingData, setRatingData] = useState({
    wouldTakeAgain: '',
    academicAbility: 0,
    teachingQuality: 0,
    interactionWithStudents: 0,
    courseHardness: 0,
    userGPA: '',
    comments: '',
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Retrieve professor data from local storage
    const storedProfessorID = localStorage.getItem('professorID');
    const storedProfessorName = localStorage.getItem('professorName');
    const storedProfessorDepartment = localStorage.getItem('professorDepartment');
    
    // Set professor data from local storage if available
    setProfessorData({
      id: storedProfessorID || '',
      name: storedProfessorName || '',
      department: storedProfessorDepartment || ''
    });

    // Fetch professor-specific course data
    fetch(`http://3.88.219.13:8000/v1/professor/${professor_id}`)
      .then(response => response.json())
      .then(data => {
        setCourseData(data.courses); // Assuming `courses` array in response
      })
      .catch(error => console.error('Error fetching professor data:', error));
  }, [professor_id]);

  const handleChange = (name, value) => {
    setRatingData({
      ...ratingData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true); // Show confirmation modal on submit

    // Submit the rating data via POST request
    fetch('http://3.88.219.13:8000/v1/rating/post/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        course: selectedCourse, // Include selected course in submission
        would_take_again: ratingData.wouldTakeAgain === 'yes' ? '1' : '0',
        academic_ability: ratingData.academicAbility,
        teaching_ability: ratingData.teachingQuality,
        interactions_with_students: ratingData.interactionWithStudents,
        hardness: ratingData.courseHardness,
        feedback: ratingData.comments,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Rating submitted successfully!');
        } else {
          console.error('Failed to submit rating');
        }
      })
      .catch((error) => console.error('Error submitting rating:', error));

    // Reset form and close modal after submission
    setTimeout(() => {
      setShowModal(false);
      setRatingData({
        wouldTakeAgain: '',
        academicAbility: 0,
        teachingQuality: 0,
        interactionWithStudents: 0,
        courseHardness: 0,
        userGPA: '',
        comments: '',
      });
      setSelectedCourse('');
    }, 3000); // Adjust the timeout as needed
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
          <input type="text" className="detail-input" value={courseData.length ? courseData[0].id : ''} readOnly />

          {/* Course Name Dropdown */}
          <label>Course Name</label>
          <select
            className="detail-input"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            required
          >
            <option value="" disabled>Select a course</option>
            {courses.map((course, index) => (
              <option key={index} value={course.name}>{course.name}</option>
            ))}
          </select>

          <label>Course Status</label>
          <input type="text" className="detail-input" value={courseData.length ? courseData[0].status : ''} readOnly />
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

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      {/* Modal Popup for confirmation */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span role="img" aria-label="thumbs up">👍</span>
            <p>Your rating has been successfully posted!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingPage;
