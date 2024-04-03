
import { useState } from "react";

import star from './style/images/star.png';
import temp from './style/images/image.png';

import './style/clientBookAppointment.css';
import { Link } from 'react-router-dom';

function BookAppointment() {

    const [docid, setDocid] = useState("red");
    console.log(docid);
    
    return (
        <>
        <div className="bookAppointment-sortOption-container">
             <div className="bookAppointment-sortOption-item sortOption-stars">
                <h5>&#11088;</h5>
                <div className="sortOption-stars-up"><button>&#11014;</button></div>
                <div className="sortOption-stars-down"><button> &#11015;</button></div>
            </div>
            <div className="bookAppointment-sortOption-item sortOption-prices">
                <h5>review</h5>
                <div className="sortOption-prices-up"><button>&#11014;</button></div>
                <div className="sortOption-prices-down"><button> &#11015;</button></div>
            </div>
            <div className="bookAppointment-sortOption-item sortOption-review">
                <h5>price</h5>
                <div className="sortOption-review-up"><button>&#11014;</button></div>
                <div className="sortOption-review-down"><button> &#11015;</button></div>
            </div>
            <div className="bookAppointment-sortOption-item sortOption-numberofpatients">
                <h5>no. patients</h5>
                <div className="sortOption-review-up"><button>&#11014;</button></div>
                <div className="sortOption-review-down"><button> &#11015;</button></div>
            </div>

        </div>
        <div className="bookAppointment-mainContainer-grid">
            <Link to="doctordes">
                <div onClick={() => setDocid} className="bookAppoinment-cardContainer-grid">
                    <div className="bookAppoinment-cardItem bookAppoinment-cardItem-doctorImgdiv">
                        <img className="bookAppoinment-cardItem-doctorImg" src={temp} alt="" />
                    </div>
                    <div className="bookAppoinment-cardItem bookAppoinment-doctordescriptiondiv">
                        <div className="bookAppoinment-cardItem-doctordescription-gridContainer">
                            <div className="doctordescription-gridItem name">
                                <h1>Dr. Jonathan Rivers</h1>
                            </div>
                            <div className="doctordescription-gridItem proffesion">
                                <h3> Clinical Psychologist</h3>
                                <hr />
                            </div>
                            <div className="doctordescription-gridItem Doctor-reviwsAndStar">
                                <img src={star} alt="star" />
                                <h2>4.8| 20 Reviews</h2>
                            </div>
                            <div className="doctordescription-gridItem keyPoints">
                                <ul>
                                    <li>Over 20 years of experience in diverse mental health concerns.</li>
                                    <li>Holistic approach focusing on biological, psychological, social, and environmental factors.</li>
                                    <li>Culturally competent care tailored to diverse backgrounds.</li>
                                    <li>Compassionate and nonjudgmental support fostering authentic heali</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="bookAppoinment-cardItem  doctordescription-gridItem-price">
                        7777/hr
                    </div>
                </div>
            </Link>
        </div>
        </>
    );
}

export default BookAppointment;
