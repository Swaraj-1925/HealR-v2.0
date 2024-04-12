import { Link } from 'react-router-dom';
import './../style/doc_landingPage.css';


function Doc_landingPage() {

    return (
        <>

            <div id='#doc-home' className="landingPageDoctor-landingPage-container">
               <div className="landingPageDoctor-textAndButton">
                <h1>HealR</h1>
                <p>Attract Clients, Expand Reach: Sign Up as a Therapist Today!</p>
                <div className='landingPageDoctor-button'>
                <Link to="doc-signup"><button type="button">Sign Up</button></Link>
                <Link to="doc-verify"><button type="button">Verify</button></Link>
                </div>
               </div>
            </div>
        </>
    );
}

export default Doc_landingPage;