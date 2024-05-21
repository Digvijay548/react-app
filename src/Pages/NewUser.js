import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../index.js';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth.js';
import { logout, login } from '../store/authSlice.js';

const NewUser = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phoneno, setPhoneno] = useState("");

    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();

    const firstnameChanged = (e) => {
        setFirstname(e.target.value);
    }

    const lastnameChanged = (e) => {
        setLastname(e.target.value);
    }

    const phonenoChanged = (e) => {
        setPhoneno(e.target.value);
    }

    const usernameChanged = (e) => {
        setUsername(e.target.value);
    }

    const passwordChanged = (e) => {
        setPassword(e.target.value);
    }

    const emailChanged = (e) => {
        setEmail(e.target.value);
    }
    //this is appwrite



    const handleSubmitAppwrite = async (e) => {
        e.preventDefault();
        await authService.createAccount({ email: email, password: password, name: firstname + " " + lastname })
        await authService.getCurrentUser().then((data) => {
            if (data) {
                setSubmitted(true)
            }
            else {
                setSubmitted(false)
            }
        })
    }



    //this is mangodb
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3006/new-user', { firstname, lastname, username, email, phoneno, password });
            console.log('User inserted:', response.data);
            navigate('/login');
            setSubmitted(true);
            console.log(submitted)
        } catch (error) {
            console.error('There was an error inserting the user:', error);
        }
    }
    const resetState = (e) => {
        console.log(submitted)
        setSubmitted(false)
    }

    return (
        <div className="flex justify-center items-center h-screen" style={{ backgroundImage: "url('/HomeBg.jpg')", backgroundSize: 'cover' }}>
            <div className="flex flex-col justify-center w-1/2 max-w-2xl h-auto p-10 rounded-2xl bg-white bg-opacity-10 shadow-lg">
                {!submitted ? (
                    <form onSubmit={handleSubmitAppwrite}>
                        <div className="flex flex-row justify-between pt-5">
                            <div className="w-1/2 ">
                                <div className="flex flex-col mb-4 items-center">
                                    <label htmlFor="firstname" className="text-white font-extralight">First Name</label>
                                    <input type="text" id="firstname" style={{ width: "250px", borderRadius: "20px" }} className="p-2" onChange={firstnameChanged} required />
                                </div>
                                <div className="flex flex-col mb-4 items-center">
                                    <label htmlFor="lastname" className="text-white font-extralight">Last Name</label>
                                    <input type="text" id="lastname" style={{ width: "250px", borderRadius: "20px" }} className="p-2" onChange={lastnameChanged} required />
                                </div>
                                <div className="flex flex-col mb-4 items-center">
                                    <label htmlFor="phoneno" className="text-white font-extralight">Phone No</label>
                                    <input type="text" id="phoneno" style={{ width: "250px", borderRadius: "20px" }} className="p-2" onChange={phonenoChanged} required />
                                </div>
                            </div>
                            <div className="w-1/2 ml-4">
                                <div className="flex flex-col mb-4 items-center">
                                    <label htmlFor="username" className="text-white font-extralight">Username</label>
                                    <input type="text" id="username" style={{ width: "250px", borderRadius: "20px" }} className="p-2" onChange={usernameChanged} required />
                                </div>
                                <div className="flex flex-col mb-4 items-center">
                                    <label htmlFor="password" className="text-white font-extralight">Password</label>
                                    <input type="password" id="password" style={{ width: "250px", borderRadius: "20px" }} className="p-2" onChange={passwordChanged} required />
                                </div>
                                <div className="flex flex-col mb-4 items-center">
                                    <label htmlFor="email" className="text-white font-extralight">Email</label>
                                    <input type="email" id="email" style={{ width: "250px", borderRadius: "20px" }} className="p-2" onChange={emailChanged} required />
                                </div>
                            </div>
                        </div>
                        <div className='flex  flex-row justify-center pt-10'>
                            <button type="submit" style={{ width: "200px", borderRadius: "25px" }} className="w-full p-3 bg-blue-500 text-white hover:bg-blue-700 transition">Register</button>
                        </div>
                        <div className="mt-4 text-center">
                            <NavLink to="/login" className="text-blue-500 hover:text-blue-700 transition">Login ?</NavLink>
                        </div>
                    </form>
                ) : (


                    <div className="mt-4 text-center">
                        <div className="text-white font-semibold mb-7  transition">Register Done...!</div>
                        <a onClick={resetState} className="text-blue-500 hover:text-blue-700 transition">New Register ?</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewUser;
