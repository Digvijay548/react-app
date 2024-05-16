import React from 'react';
import './style/ForgotPassword.css';
import { NavLink } from 'react-router-dom';

const ForgotPassword = () => {
    return (
        <div className="forgot-password-container centered">
            <div className="forgot-password-container">
                <h2>Forgot Password</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required />
                    </div>
                    <button type="submit">Reset Password</button>
                </form>
                <div className="extra-links">
                    <NavLink to="/login" exact activeClassName="active" className="nav-link">go back</NavLink>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
