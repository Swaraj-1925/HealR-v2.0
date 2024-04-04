import { Link } from 'react-router-dom';
import './../style/doc_landingPage.css';


function Doc_landingPage() {

    return (
        <>

            <div id='#doc-home' className="landingPageDoctor-landingPage-container">
               <div className="landingPageDoctor-textAndButton">
                <h1>HealR</h1>
                <p>Attract Clients, Expand Reach: Sign Up as a Therapist Today!</p>
                
                <Link to="doc-signup"><button type="button">Sign Up</button></Link>
               </div>
            </div>
        </>
    );
}

export default Doc_landingPage;