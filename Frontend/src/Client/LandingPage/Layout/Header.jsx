import { Link } from 'react-scroll';
import Logo from './style/Images/logo/logoWhite.png';
import './style/Css/landingPageHeader.css';

function Header() {
    return (
        <>
            
                <header className="Client-LandingPage-Header-navbar-wrapper">
                    <nav className="Client-LandingPage-Header-navbar">
                        <ul className="Client-LandingPage-Header-gridContiner">
                            <li className="Client-LandingPage-Header-navbar-item item1">
                                <Link to="about" smooth={true} duration={500}>
                                    <img src={Logo} alt="logo landing page white" />
                                </Link>
                            </li>
                            <li className="Client-LandingPage-Header-navbar-item item2">
                                <Link to="contact" smooth={true} duration={500}>
                                    Home
                                </Link>
                            </li>
                            <li className="Client-LandingPage-Header-navbar-item item2">
                                <Link to="contact" smooth={true} duration={500}>
                                    Services
                                </Link>
                            </li>
                            <li className="Client-LandingPage-Header-navbar-item item2">
                                <Link to="contact" smooth={true} duration={500}>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>
             

        </>
    );
}

export default Header;