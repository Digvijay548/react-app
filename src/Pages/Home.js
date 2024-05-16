// Home.js

import React from 'react';
import homeBg from './HomeBg.jpg'; // Import the image

const Home = () => {
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
  };

  return (
    <div style={homeStyle}>
      <div style={contentStyle}>
        <h1>Welcome to Our Gaming Site!</h1>
        <p>Explore the world of gaming with us.</p>
        <button style={buttonStyle}>Play Now</button>
      </div>
    </div>
  );
};

export default Home;
