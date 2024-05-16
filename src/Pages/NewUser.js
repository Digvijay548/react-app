import React,{useContext,useState} from 'react';
import {NavLink } from 'react-router-dom';
import { UserContext } from '../index.js'; 


const NewUser = () => {
    const [ email,SetEmail ] = useState("");
    const [ username,Setusername ] = useState("");
    const [ password,Setpassword ] = useState("");
    const [ submitted,Setsubmitted ] = useState(false);
    const { setUser } = useContext(UserContext);
    
    
    const Usernamechanged=(e)=>{
        Setusername(e.target.value);

    }
    
    const Passwordchanged=(e)=>{
        Setpassword(e.target.value);

    }
    
    const Emailchanged=(e)=>{
        SetEmail(e.target.value);

    }


    const handleSubmit=(e)=>{
        
    e.preventDefault();
    setUser({email,username,password})
    Setsubmitted(true)
    console.log(email)
    console.log(username)
    console.log(password)

    }

    return (
        <div className="new-user-container centered">
            <div className="new-user-container">
                <h2>New User Registration</h2>
                {!submitted ? (
                <form onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" onChange={Usernamechanged} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={Emailchanged} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={Passwordchanged} required />
                    </div>
                    <button type="submit">Register</button>
                </form>
                ): (
                    <p className="thanks-msg">Registation Done</p>
                  )}

                <div className="extra-links">
                    <NavLink to="/login" exact activeClassName="active" className="nav-link">go back</NavLink>
                </div>
            </div>
        </div>
    );
};

export default NewUser;
