import React from 'react';
import './ProfessorComparePage.css';

const ProfessorComparePage = () => {
    return (
        <div className="professor-compare-container">
            {/* Heading positioned in the top-left corner */}
            <h1 className="professor-compare-heading">Compare Professors</h1>
            
            {/* Search bar below the heading */}
            <div className="search-bar-container">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search professor by name"
                />
            </div>

            {/* Section containing the professor comparison cards */}
            <div className="professor-compare-section">
                {/* First professor card */}
                <div className="professor-card">
                    <h2>Abhimanyu Gupta</h2>
                    <p>Overall Quality: 4.5</p>
                    <p>Business at Saint Louis University</p>
                </div>

                {/* Second professor card */}
                <div className="professor-card">
                    <h2>Daniel Abbott</h2>
                    <p>Overall Quality: 3.9</p>
                    <p>Civil Engineering at Missouri University of Science and Technology</p>
                </div>
            </div>
        </div>
    );
};

export default ProfessorComparePage;
