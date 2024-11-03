import React, { useState } from 'react';
import './RatingPage.css';
import { useNavigate } from 'react-router-dom';

const RatingPage = () => {
  const navigate = useNavigate();
  const [ratingData, setRatingData] = useState({
    wouldTakeAgain: '',
    academicAbility: 0,
    teachingQuality: 0,
    interactionWithStudents: 0,
    courseHardness: 0,
    userGPA: '',
    comments: '',
  });

  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleChange = (name, value) => {
    setRatingData({
      ...ratingData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true); // Show modal on submit

    // Send POST request to submit the rating data
    fetch('http://3.88.219.13:8000/v1/rating/post/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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

    // Close the modal after a few seconds, clear form data, and don't navigate away
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
        <button className="top-button home-button" onClick={() => navigate('/')}>Homepage</button>
        <button className="top-button username-button">Username</button>
      </div>

      <div className="details-row">
        <div className="course-info">
          <label>CourseID</label>
          <input type="text" className="detail-input" />
          <label>CourseName</label>
          <input type="text" className="detail-input" />
          <label>CourseStatus</label>
          <input type="text" className="detail-input" />
        </div>
        <div className="prof-info">
          <label>ProfID</label>
          <input type="text" className="detail-input" />
          <label>Name</label>
          <input type="text" className="detail-input" />
          <label>Department</label>
          <input type="text" className="detail-input" />
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

      {/* Modal Popup */}
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
