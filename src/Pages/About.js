// About.js

import React, { useState,useContext } from 'react';
import './style/About.css';
import { UserContext } from '../index.js'; 

const About = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setUser({feedback})
  };

  return (
    <div className="about-container">
      <h1>About Articles</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="feedback-form">
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            name="feedback"
            value={feedback}
            onChange={handleChange}
            rows="4"
            cols="50"
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p className="thanks-msg">Thanks for your feedback!</p>
      )}
    </div>
  );
};

export default About;
