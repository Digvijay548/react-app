// Home.js

import React, { useContext } from 'react';
import './style/PersonalPage.css';
import { UserContext } from '../index.js';
import {NavLink } from 'react-router-dom';

const PersonalPage = () => {
  const { user } = useContext(UserContext);
  return (
    <div className='Main-PersonalPage'>
      <div className='contentStyle'>
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
        <button>Play Now</button>
      </div>
    </div>
  );
};

export default PersonalPage;
