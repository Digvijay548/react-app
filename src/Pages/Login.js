import React, { useState, useContext  } from 'react';
import './style/Login.css';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../index.js';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [UserLogInDone, setUserLogInDone] = useState(false);

  const { user,setIsUserLoggedIn,IsUserLoggedIn} = useContext(UserContext);

 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === user.username && password === user.password) {
      // Redirect or perform some action upon successful login
      console.log('Login successful');
      setUserLogInDone(true)
      setIsUserLoggedIn(true)
      console.log("This is from login.js :=>"+IsUserLoggedIn)
    } else {
      setUserLogInDone(false)
      setIsUserLoggedIn(false)
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="centered">
      <div className="login-container">
        <h2 className='heading-login'>Login</h2>
        {!UserLogInDone ?
          (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className='button-class' type="submit">Login</button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          ) :
          (
            <div className='sucess-container'>
            <h4>You are logged In...</h4>
            </div>
          )}
        <div className="extra-links">
          <NavLink to="/forget-password" exact activeClassName="active" className="nav-link">Forgot password</NavLink>
          <span> | </span>
          <NavLink to="/new-user" exact activeClassName="active" className="nav-link">Register here</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
