// Home.js

import React, { useContext } from 'react';
import homeBg from './HomeBg.jpg'; // Import the image
import { UserContext } from '../index.js';
import {NavLink } from 'react-router-dom';

const PersonalPage = () => {
  const homeStyle = {
    position: 'relative',
    overflow: 'hidden',
    height: '100vh',
    backgroundImage: `url(${homeBg})`, // Set background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const contentStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    zIndex: 1,
    color: '#fff',
  };

  const buttonStyle = {
    backgroundColor: '#FF5733',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '1.2em',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop:'20px',
  };

  const { user } = useContext(UserContext);
  return (
    <div style={homeStyle}>
      <div style={contentStyle}>
        {typeof user.feedback !== "undefined" ? (
          <h1>Welcome to Our Personal Site! feedback is = {user.feedback}</h1>
        ) :
          (<>
            <h1>Welcome to Our Personal Site! There is no feedback</h1>
          <span></span>
          <div>
          <NavLink to="/about" className="active">Go to About</NavLink>
          </div>
          </>
          )}
          <br/>
        <button style={buttonStyle}>Play Now</button>
      </div>
    </div>
  );
};

export default PersonalPage;
