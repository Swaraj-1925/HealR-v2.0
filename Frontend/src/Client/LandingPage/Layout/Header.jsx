import { Link, useLocation } from 'react-router-dom';
import Logo from './style/Images/logo/logoBlack.png';
import './style/Css/landingPageHeader.css';

function Header() {
    const location = useLocation();

    // Function to determine button text based on the current path
    const getButtonText = () => {
        if (location.pathname === '/') {
            return 'Sign In';
        } else if (location.pathname === '/sign-in') {
            return 'Sign Up';
        } else {
            return 'Sign In';
        }
    };

    // Function to determine the link based on the current path
    const getLinkTo = () => {
        if (location.pathname === '/') {
            return '/sign-in';
        } else if (location.pathname === '/sign-in') {
            return '/sign-up';
        } else {
            return '/sign-in';
        }
    };

    return (
        <header className="Client-LandingPage-Header-navbar-wrapper">
            <nav className="Client-LandingPage-Header-navbar">
                <ul className="Client-LandingPage-Header-gridContiner">
                    <li className="Client-LandingPage-Header-navbar-item item1">
                        <Link to="/">
                            <img src={Logo} alt="logo landing page white" />
                        </Link>
                    </li>
                    <li className="Client-LandingPage-Header-navbar-item item2">
                        <a href="/#home">Home</a>
                    </li>
                    <li className="Client-LandingPage-Header-navbar-item item2">
                        <a href="/#services"> Services</a>
                    </li>
                    <li className="Client-LandingPage-Header-navbar-item item2">
                        <a href="#contact">Contact</a>
                    </li>
                    <li className="Client-LandingPage-Header-navbar-item item2">
                        <Link to={getLinkTo()}>
                            <button type="button" className='Client-LandingPage-Header-navbar-button'>
                                {getButtonText()}
                            </button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
