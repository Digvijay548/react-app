import React, { useState, useEffect } from 'react';
import './style/Login.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import conf from '../conf/conf.js';
import authService from '../appwrite/auth.js';
import { logout, login } from '../store/authSlice.js';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Login = () => {
  const MySwal = withReactContent(Swal);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [UserLogInDone, setUserLogInDone] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [LoggedInUser, setLoggedInUser] = useState(null)
  const dispach=useDispatch()

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    console.log(conf);
    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const Remember = (e) => {
    setRememberMe(e.target.checked);
    if (e.target.checked) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      console.log("stored data");
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      console.log("removed stored data");
    }
  };

  // This is for Appwrite
  const handleSubmitAppwrite = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Start loading
    try {
      await authService.logout(); // Ensure user is logged out first
      const loginSuccess = await authService.login({ email, password });
      if (loginSuccess) {
        const user = await authService.getCurrentUser();
        setLoggedInUser(user);
        dispach(login({ user }));
        console.log("Login return => ", user);
        setUserLogInDone(true);

        // Display success alert
        MySwal.fire({
          title: 'Login Successful!',
          text: `Welcome back, ${user.name}!`,
          icon: 'success',
          customClass: {
            popup: 'custom-swal-popup' // Custom class for width and height
          }
        });
      } else {
        setUserLogInDone(false);
        dispach(logout());
        setErrorMessage("Login failed: Invalid email or password");

        // Display error alert
        MySwal.fire({
          title: 'Login Failed',
          text: 'Invalid email or password',
          icon: 'error',
          customClass: {
            popup: 'custom-swal-popup' // Custom class for width and height
          }
        });
      }
    } catch (error) {
      setErrorMessage("Login failed: " + error.message);

      // Display error alert
      MySwal.fire({
        title: 'Login Failed',
        text: error.message,
        icon: 'error',
        customClass: {
          popup: 'custom-swal-popup' // Custom class for width and height
        }
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // This is for MongoDB (not used in this case)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(username + ' pass=>' + password);
      const response = await axios.post('http://localhost:3006/login', { username, password });
      setErrorMessage(response.data);
      console.log(errorMessage);
      console.log('User details sent:', response.data);
      setUserLogInDone(true);
    } catch (error) {
      console.error('There was an error sending details:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full h-screen bg-black" style={{ backgroundImage: "url('/HomeBg.jpg')", backgroundSize: 'cover' }}>
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full h-screen">
            <img src="./loading.png" alt="Loading" className="animate-spin w-20 h-20" />
          </div>
        ) : (
          !UserLogInDone ? (
            <section className="h-screen mb-10 bg-white bg-opacity-10 rounded-3xl mt-10">
              <div className="h-full">
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                  <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                    <img
                      src="./loginvector.webp"
                      className="w-full"
                      alt="Sample image"
                    />
                  </div>
                  <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 mr-10">
                    <form onSubmit={handleSubmitAppwrite}>
                      <div className="flex flex-row items-center justify-center lg:justify-center">
                        <p className="mb-0 mr-4 text-lg text-white">Sign In with</p>
                        {/* Social media buttons */}
                        <button
                          type="button"
                          className="mx-1 h-9 w-9 rounded-full bg-primary text-white"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="mx-1 h-9 w-9 rounded-full bg-primary text-white"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="mx-1 h-9 w-9 rounded-full bg-primary text-white"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                          </svg>
                        </button>
                      </div>
                      <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        <p className="mx-4 mb-0 text-center font-semibold dark:text-white">Or</p>
                      </div>
                      <div className="mb-6 flex-col justify-center">
                        <label htmlFor="email" className="text-white mb-2">Email Id</label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); console.log(email); }}
                          className="form-input w-full p-2 rounded-lg"
                          required
                          style={{ width: "300px" }}
                        />
                      </div>
                      <div className="mb-6 flex-col justify-center">
                        <label htmlFor="password" className="text-white mb-2">Password</label>
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => { setPassword(e.target.value); console.log(password); }}
                          className="form-input w-full p-2 rounded-lg"
                          required
                          style={{ width: "300px" }}
                        />
                      </div>
                      <div className="mb-6 flex items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          checked={rememberMe}
                          onChange={Remember}
                          className="form-checkbox h-4 w-4 text-primary rounded"
                        />
                        <label htmlFor="rememberMe" className="ml-2 text-white">Remember Me</label>
                      </div>
                      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                      <div className="text-center lg:text-left">
                        <button
                          type="submit"
                          className="inline-block bg-blue-200 rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-black shadow-lg transition duration-150 ease-in-out hover:bg-blue-300 focus:outline-none"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          ) : (

            <div className="text-white flex flex-col items-center justify-center mt-60">
            <h1 className="flex font-bold text-3xl pb-5">Login Successful!</h1>
            <div className="flex flex-row">
                <p className="flex font-semibold text-l pb-5">Welcome back, </p>
                <p className="flex font-bold text-l pb-5 ml-2 text-purple-300">{LoggedInUser.name} !</p>
            </div>
        </div>
          )
        )}
      </div>
    </>
  );
};

export default Login;
