// Header.js
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../index.js'
import './style/Header.css'; // Import CSS file

export default function Header() {
    function LogOut(){
        setUser("")
        setIsUserLoggedIn(false)      

    }


    const { IsUserLoggedIn, user,setUser,setIsUserLoggedIn } = useContext(UserContext);
    console.log(IsUserLoggedIn)
    return (
        <header className="navbar">
            <nav>
                <div className="navbar-container">
                    <Link to="/" className="logo-link">
                        <img
                            src="https://www.brandbucket.com/sites/default/files/logo_uploads/462074/large_logophoria.png"
                            alt="Logos"
                            className="logo"
                        />
                    </Link>
                    <div className="nav-links">

                        <NavLink to="/" exact activeClassName="active" className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/getstart" activeClassName="active" className="nav-link">
                            Get started
                        </NavLink>
                        <NavLink to="/github" activeClassName="active" className="nav-link">
                            Github
                        </NavLink>
                        <NavLink to="/about" activeClassName="active" className="nav-link dropdown">
                            About
                            <div className="dropdown-content">
                                <NavLink to="/about/ComapnyPage" className="dropdown-link">Company Site</NavLink>
                                <NavLink to="/about/PersonalPage" className="dropdown-link">Personal Site</NavLink>
                            </div>
                        </NavLink>
                        <NavLink to="/contact" activeClassName="active" className="nav-link">
                            Contact
                        </NavLink>

                        {!IsUserLoggedIn ? (
                            <NavLink to="/login" activeClassName="active" className="nav-link">
                                Log in
                            </NavLink>) : (
                            <h5 className='nav-linkuser dropdown'>Welcome : {user.username}
                                <div className="dropdown-content">

                                    <button onClick={LogOut} className='btnclass'>Log Out</button>
                                </div>

                            </h5>
                        )}

                    </div>

                </div>
            </nav>
        </header>
    );
}
