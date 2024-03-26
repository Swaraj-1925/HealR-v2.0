
import { useState } from "react";

import star from './style/images/star.png';
import temp from './style/images/image.png';

import './style/clientBookAppointment.css';

function BookAppointment() {
    const [docid, setDocid] = useState("red");
    return (
        <div className="bookAppointment-mainContainer-grid">

            <div onClick={()=>setDocid} className="bookAppoinment-cardContainer-grid">
                <div className="bookAppoinment-cardItem bookAppoinment-cardItem-doctorImgdiv">
                    <img className="bookAppoinment-cardItem-doctorImg" src={temp} alt="" />
                </div>
                <div className="bookAppoinment-cardItem bookAppoinment-doctordescriptiondiv">
                    <div className="bookAppoinment-cardItem-doctordescription-gridContainer">
                        <div className="doctordescription-gridItem name">
                            <h1>Dr.abcdefg xyzah</h1>
                        </div>
                        <div className="doctordescription-gridItem proffesion">
                            <h3> abcdefgjesdcdcs</h3>
                            <hr />
                        </div>
                        <div className="doctordescription-gridItem Doctor-reviwsAndStar">
                            <img src={star} alt="star" />
                            <h2>4.8| 20 Reviews</h2>
                        </div>
                        <div className="doctordescription-gridItem keyPoints">
                            <ul>
                                <li>adac</li>
                                <li>adac</li>
                                <li>adac</li>
                                <li>adac</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="bookAppoinment-cardItem  doctordescription-gridItem-price">
                    7777/hr
                </div>
            </div>

        </div>
    );
}

export default BookAppointment;
