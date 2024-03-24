import './style/Css/landingPageFooter.css';
import Logo from './style/Images/logo/HealR_transparent.png';
import InstagramIcon from './style/Images/instagram.png';
import DiscordIcon from './style/Images/Discord.png';
import LinkedinIcon from './style/Images/linkedin.png';
import { Link } from 'react-router-dom';


function Footer() {
    const terms_and_condition="";
    const contactUs="";
    const instagram="";
    const discord="";
    const linkedin="";
    return (
        <>
            <div className="landingPage-Footer-grid-container " id='contact'>
                <div className="landingPage-Footer-grid-item flexContainer">
                    <img src={Logo} alt="Logo footer" />
                    <p>HealR is online therapy platform where we try to give mental health realted help at as cheap rate as possiable</p>
                </div>
                <div className="landingPage-Footer-grid-item flexContainer">
                    <h3>Our service</h3>
                    <div>
                        <Link to='/about-us' className='link'><h5>About us</h5></Link>
                        <Link to='/sign-up' className='link'> <h5>Sign up</h5></Link>
                        <Link to='/sign-in' className='link'><h5>Sign in</h5></Link>
                    </div>
                </div>
                <div className="landingPage-Footer-grid-item flexContainer">
                    <h3>Company</h3>
                    <div>
                    <Link to={terms_and_condition} className='link'> <h5>Terms and conditions</h5></Link>
                        <Link to={contactUs} className='link'> <h5>Contact Us</h5></Link>
                    </div>
                </div>
                <div className="landingPage-Footer-grid-item right-flexContainer">
                    <h3>Follow us</h3>
                    <div className="landingPage-Footer-grid-right-flex-row" >
                        <img src={InstagramIcon} alt="Logo footer" />
                        <Link to={instagram} className='link'> <h4>Instagram</h4></Link>
                    </div>
                    <div className="landingPage-Footer-grid-right-flex-row" >
                        <img src={DiscordIcon} alt="Logo footer" />
                        <Link to={discord} className='link'> <h4>Discord</h4></Link>
                    </div>
                    <div className="landingPage-Footer-grid-right-flex-row" >
                        <img src={LinkedinIcon} alt="Logo footer" />
                        <Link to={linkedin} className='link'>  <h4>Linkedin</h4></Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;