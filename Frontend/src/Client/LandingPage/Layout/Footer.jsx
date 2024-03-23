import './style/Css/landingPageFooter.css';
import Logo from './style/Images/logo/HealR_transparent.png';
import InstagramIcon from './style/Images/instagram.png';
import DiscordIcon from './style/Images/Discord.png';
import LinkedinIcon from './style/Images/linkedin.png';
 

function Footer() {
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
                        <h5>About us</h5>
                        <h5>Sign up</h5>
                        <h5>Sign in</h5>
                    </div>
                </div>
                <div className="landingPage-Footer-grid-item flexContainer">
                    <h3>Company</h3>
                    <div>
                        <h5>Terms and conditions</h5>
                        <h5>Contact Us</h5>
                    </div>
                </div>
                <div className="landingPage-Footer-grid-item right-flexContainer">
                    <h3>Follow us</h3>
                    <div className="landingPage-Footer-grid-right-flex-row" >
                        <img src={InstagramIcon} alt="Logo footer" />
                        <h4>Instagram</h4>
                    </div>
                    <div className="landingPage-Footer-grid-right-flex-row" >
                        <img src={DiscordIcon} alt="Logo footer" />
                        <h4>Discord</h4>
                    </div>
                    <div className="landingPage-Footer-grid-right-flex-row" >
                        <img src={LinkedinIcon} alt="Logo footer" />
                        <h4>Linkedin</h4>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;