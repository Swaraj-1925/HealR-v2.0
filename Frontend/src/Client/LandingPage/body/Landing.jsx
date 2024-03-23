import './style/css/LandingPage-landing.css';
import Background from './style/images/LandingPage-background.jpg';
import Depression from './style/images/Depression.jpg';
import Anxiety from './style/images/anxiety.jpg';
import Bipolar from './style/images/bipolar.jpg';
import Loneliness from './style/images/loneliness.jpg';
import Ptsd from './style/images/ptsd.jpg';
import ADHD from './style/images/adhd.jpg';
import ExpertTherapy from './style/images/expert-therapy.jpg';
import QandA from './style/images/Anonymity Q&A.jpg';
import ResourceLibrary from './style/images/Resource-Library.jpg';
import SupportForums from './style/images/Support-Forums.jpg';
import { Link } from 'react-router-dom';


function Landing() {
    const commonChallengesstr = "These challenges are part of life's journey, but you don't have to face them alone. Join us we will help";
    return (<>
        <div className="landingPage-body-wrapper">
            <section className="grid-container" id='home'>
                <div className="image-container">
                    <img src={Background} alt="Image description" />
                    <div className="text-overlay">
                        <h1>HealR</h1>
                        <p>
                            You are not alone. You are seen. I am with you. You are not alone.
                        </p>
                        <div className='landing-page-buttons'>
                            <Link to="sign-up"><button type="button">Join Us</button></Link>
                            <Link to="/about-us"><button type="button">About us</button></Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="landingPage-body-section commonChallenges">
                <div className='commonChallenges-title'>
                    <div><h1>Common Challenges</h1></div>
                    <div><p>{commonChallengesstr}</p></div>
                </div>
                <div className='commonChallenges-gridContainer'>

                    <div className='gridItem-flexContainer'>
                        <img src={Depression} alt=" comman challage depression" />
                        <h3 className='flexItem-title'>Depression</h3>
                        <p className='flexItem-description'>a heavy fog that blankets the mind, sapping joy and energy</p>
                    </div>
                    <div className='gridItem-flexContainer'>
                        <img src={Anxiety} alt=" comman challage Anxiety" />
                        <h3 className='flexItem-title'>Anxiety</h3>
                        <p className='flexItem-description'>a relentless companion, causing a perpetual state of worry and unease</p>
                    </div>
                    <div className='gridItem-flexContainer'>
                        <img src={Bipolar} alt=" comman challage Bipolar" />
                        <h3 className='flexItem-title'>Bipolar disorder</h3>
                        <p className='flexItem-description'>a rollercoaster of highs and lows, disrupting the equilibrium of daily life.</p>
                    </div>
                    <div className='gridItem-flexContainer'>
                        <img src={Loneliness} alt=" comman challage Loneliness" />
                        <h3 className='flexItem-title'>Loneliness</h3>
                        <p className='flexItem-description'> haunting sensation that isolates one from the world, leaving an ache for connection</p>
                    </div>
                    <div className='gridItem-flexContainer'>
                        <img src={Ptsd} alt=" comman challage Post-traumatic stress disorder" />
                        <h3 className='flexItem-title'>Post-traumatic stress disorder</h3>
                        <p className='flexItem-description'>PTSD, a battle scar from past trauma, triggering overwhelming emotions and flashbacks.</p>
                    </div>
                    <div className='gridItem-flexContainer'>
                        <img src={ADHD} alt=" comman challage ADHD" />
                        <h3 className='flexItem-title'>ADHD</h3>
                        <p className='flexItem-description'>where the mind races like a loose steering wheel, and focus slips like a stuck gas pedal.</p>
                    </div>


                </div>
            </section>
            <section className="landingPage-body-section Services" id='services'>
                <div className='Services-title'>
                    <h2>Services..</h2>
                </div>
                <div className='Services-gridContainer'>

                    <div className='Services-gridContainer-item1'>
                        <h2>Expert Sessions</h2>
                        <p>
                            Access to specialized therapist sessions.
                        </p>
                        <img className="Servicesimg" src={ExpertTherapy} alt="Expert Therapy" />
                    </div>

                    <div className='Services-gridContainer-item2 containerTwo'>
                        <div className='Services-gridContainer-containerTwo-item1'>
                            <h2>Anonymity Q&A</h2>
                            <p>
                                Ask questions anonymously to therapists.
                            </p>
                            <img className="Servicesimg" src={QandA}
                                alt="team builder feature icon" />
                        </div>
                        <div className='Services-gridContainer-containerTwo-item2'>
                            <h2>Resource Library</h2>
                            <p>
                                Access books,music and much more.
                            </p>
                            <img className="Servicesimg" src={ResourceLibrary}
                                alt="karma feature icon" />
                        </div>
                    </div>

                    <div className='Services-gridContainer-item3'>
                        <h2>Support Forums</h2>
                        <p>
                            Share experiences and connect
                        </p>
                        <img className="Servicesimg" src={SupportForums} alt="" />
                    </div>

                </div>
            </section>
        </div>
    </>);
}

export default Landing;