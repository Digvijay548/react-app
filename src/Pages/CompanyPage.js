// Home.js

import React,{useContext} from 'react';
import { UserContext } from '../index.js'; 
import {NavLink } from 'react-router-dom';
import './style/ComapnyPage.css';


const ComapnyPage = () => {
  
  const { user } = useContext(UserContext);

  return (
    <div className='Main-Comapany'>
      <div className='contentStyle'>
        {typeof user.feedback !== "undefined"?(
        <h1>Welcome to Our Company Site! feedback is = {user.feedback}</h1>
        ):
        (<>
          <h1>Welcome to Our Company Site! There is no feedback</h1>
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

export default ComapnyPage;
