import { Link } from 'react-router-dom';
import Logo from './style/Images/logo/logoBlack.png';
import './style/Css/landingPageHeader.css';
 

function Header() {


    return (
        <>


            <header className="Client-LandingPage-Header-navbar-wrapper">
                <nav className="Client-LandingPage-Header-navbar">
                    <ul className="Client-LandingPage-Header-gridContiner">
                        <li className="Client-LandingPage-Header-navbar-item item1">
                            <Link to="/" >
                                <img src={Logo} alt="logo landing page white" />
                            </Link>
                        </li>
                        <li className="Client-LandingPage-Header-navbar-item item2">
                             
                                <a href="/#home">
                                    Home</a>
    
                        </li>
                        <li className="Client-LandingPage-Header-navbar-item item2">
                           <a href="/#services"> Services</a> 
                        </li>
                        <li className="Client-LandingPage-Header-navbar-item item2">
                            <a href="#contact">Contact</a> 
                        </li>
                        <li className="Client-LandingPage-Header-navbar-item item2">
                            <Link to="/sign-in"><button type="button" className='Client-LandingPage-Header-navbar-button'>Sign In</button></Link>
                        </li>
                    </ul>
                </nav>
            </header>


        </>
    );
}

export default Header;