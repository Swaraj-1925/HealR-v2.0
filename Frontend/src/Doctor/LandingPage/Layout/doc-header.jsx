import { Link, useLocation } from 'react-router-dom';
import './../style/doc-header.css';
import Logo from './../style/images/logoBlack.png';

function Doc_header() {
    const location = useLocation();

    // Function to determine button text based on the current path
    const getButtonText = () => {
        if (location.pathname === '/doctor') {
            return 'Sign In';
        } else if (location.pathname === '/doctor/doc-signin') {
            return 'Sign Up';
        } else {
            return 'Sign In';
        }
    };

    // Function to determine the link based on the current path
    const getLinkTo = () => {
        if (location.pathname === '/doctor') {
            return 'doc-signin';
        } else if (location.pathname === '/doctor/doc-signin') {
            return 'doc-signup';
        } else {
            return 'doc-signin';
        }
    };
    return (
        <>
            <header className="doctor-LandingPage-Header-navbar-wrapper">
            <nav className="doctor-LandingPage-Header-navbar">
                <ul className="doctor-LandingPage-Header-gridContiner">
                    <li className="doctor-LandingPage-Header-navbar-item doctor-item1">
                        <Link to="/">
                            <img src={Logo} alt="logo landing page white" />
                        </Link>
                    </li>
                    <li className="doctor-LandingPage-Header-navbar-item doctor-item2">
                        <a href="/doctor/#doc-home">Home</a>
                    </li>
                   
                    <li className="doctor-LandingPage-Header-navbar-item doctor-item2">
                        <a href="/doctor/#contact">Contact</a>
                    </li>
                    <li className="Client-LandingPage-Header-navbar-item doctor-item2">
                        <Link to={getLinkTo()}>
                            <button type="button" className='doctor-LandingPage-Header-navbar-button'>
                                {getButtonText()}
                            </button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
        </>
    );
}

export default Doc_header;