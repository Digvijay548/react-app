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
                <div className="footer-content">
                    <p className='StayConnected'>Stay Connected:</p>
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
                    <p className='copyrigths'>&copy; 2024 Your Company Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
