import { Link, NavLink } from 'react-router-dom';
import './style/Header.css'; // Import CSS file

export default function Header() {
    return (
        <header className="flex float-end bg-blue-300">
            <nav className='flex float-end'>
                <div className="navbar-container ">
                    <Link to="/" className="logo-link">
                        <img
                            src="https://www.brandbucket.com/sites/default/files/logo_uploads/462074/large_logophoria.png"
                            alt="Logos"
                            className="logo"
                        />
                    </Link>
                    <div className="nav-links">
                        <NavLink to="/" exact activeclassname="active" className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/getstart" activeclassname="active" className="nav-link">
                            Get started
                        </NavLink>
                        <NavLink to="/github" activeclassname="active" className="nav-link">
                            Github
                        </NavLink>
                        <div className="nav-link dropdown">
                            <NavLink to="/about" activeclassname="active" className="dropdown-toggle">
                                About
                            </NavLink>
                            <div className="dropdown-content">
                                <NavLink to="/about/ComapnyPage" className="dropdown-link">Company Site</NavLink>
                                <NavLink to="/about/PersonalPage" className="dropdown-link">Personal Site</NavLink>
                            </div>
                        </div>
                        <NavLink to="/contact" activeclassname="active" className="nav-link">
                            Contact
                        </NavLink>
                        <NavLink to="/login" activeclassname="active" className="nav-link">
                        login
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
}
