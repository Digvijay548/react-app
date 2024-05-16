// Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import './style/Footer.css'; // Import CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <Link to="/">
                        <img
                            src="https://www.brandbucket.com/sites/default/files/logo_uploads/462074/large_logophoria.png"
                            alt="Logo"
                            className="logo"
                        />
                    </Link>
                </div>
                <div className="footer-content">
                    <p style={{ display: 'inline-block', marginRight: '10px' }} >Stay Connected:</p>
                    <div className="social-icons" style={{ display: 'inline-block' }}>
                        <Link to="#" className="social-icon">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </Link>
                        <Link to="#" className="social-icon">
                            <FontAwesomeIcon icon={faTwitter} />
                        </Link>
                        <Link to="#" className="social-icon">
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>
                        <Link to="#" className="social-icon">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </Link>
                    </div>
                    <p>&copy; 2024 Your Company Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
