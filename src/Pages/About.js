// About.js

import React, { useState,useContext } from 'react';

const About = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className='bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 w-full h-screen flex justify-center items-center'>
    <div className="about-container bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 flex flex-col justify-center items-center w-1/3 h-1/2 rounded-2xl">
      <h1 className='font-semibold text-zinc-100 text-xl'>About Articles</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex-col flex justify-center items-center">
          <div className='flex-col flex justify-center items-center'>
          <label htmlFor="feedback" className='text-white'>Feedback:</label>
          <textarea
            id="feedback"
            name="feedback"
            value={feedback}
            onChange={handleChange}
            rows="4"
            cols="50"
            style={{ width: "350px", borderRadius: "20px" }} 
            required
          ></textarea>
          </div>
          <button className='text-l mt-10 bg-blue-400 hover:bg-blue-600 text-white' style={{ width: "200px",height:"30px", borderRadius: "20px" }}  type="submit">Submit</button>
        </form>
      ) : (
        <p className="thanks-msg">Thanks for your feedback!</p>
      )}
    </div>
    </div>
  );
};

export default About;
