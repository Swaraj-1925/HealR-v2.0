import axios from 'axios';
import { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { useParams } from 'react-router-dom';

import BookAppointmentPopUp from './clientPopupBookAppoinment';
import { useNavigate } from "react-router-dom";
import './style/clientDoctorDescription.css';
import experience from './style/images/experience.png';
import patient from './style/images/patient.png';
import review from './style/images/review.png';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


function DoctorDescription() {
    const { doctorId } = useParams();
    const [seen, setSeen] = useState(false)
    const [userData, setuserData] = useState("")
    const [appointments, setAppointments] = useState(false);

    const [reportReason, setReportReason] = useState('');
    const [value, setValue] = useState(1);
    const [Review, setReview] = useState('');
    const navigate = useNavigate();
    const handleRateDoctor = async () => {
        try {
            // Prepare the data to send to the backend
            const data = {
                doctorId: doctorId,
                rating: value,
                review: Review
            };
            const response = await axios.post('http://localhost:3000/user/rate-doctor', data, {
                withCredentials: true
            });
            if (response.data.message == 'successfull') {
                alert('Review added successfull')
                window.location.reload();
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleReportDoctor = async () => {
        try {
            // Prepare the data to send to the backend
            const data = {
                doctorId: doctorId,
                reason: reportReason
            };

            // Make a POST request to the backend
            const response = await axios.post('http://localhost:3000/user/report-doctor', data, {
                withCredentials: true
            });
            if (response.data.message == 'successfull') {
                alert('Report sent successfull')
                window.location.reload();
            }


        } catch (error) {
            console.error('Error:', error);

        }
    };



    function togglePop() {
        setSeen(!seen);
    }
    useEffect(() => {
        const fetchDocDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/user/docDescription/${doctorId}`, {
                    withCredentials: true
                });
                setuserData(response.data.docData)
               
                if (response.data.docData.appointment) {
                    setAppointments(true);
                }
            } catch (error) {
                alert("User not Found, signin in again")
                navigate('/sign-in'); 
                
              
            } 
        };
        fetchDocDetails();
    }, [doctorId]);

    return (
        <>
            <div className="clientDoctorDescription-wrapper">

                <div className="doctordescription-gridContainer">
                    <div className='doctordescription-gridContaineritem-main1'>
                        <div className="doctorDescription-gridItem doctorDescription-gridContainer2">

                            <div className="doctorDescription-gridContainer2-item doctorDescription-img">
                                <img src={userData.imageB} alt="" />
                            </div>
                            <div className="doctorDescription-gridContainer2-item doctorDescription-name-Proffecsion-flex">
                                <div className="doctorDescription-name-Proffecsion-flexcontainer">
                                    <h2>Dr. {userData.name}   </h2>
                                    <h3>  {userData.profession}  </h3>
                                    <div className='doctorDescription-clinicLocation'> <svg
                                        fill="#000000"
                                        version="1.1"
                                        id="Capa_1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        width="20px"
                                        height="20px"
                                        viewBox="0 0 395.71 395.71"
                                        xmlSpace="preserve"
                                    >
                                        <g>
                                            <path
                                                d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"
                                            />
                                        </g>
                                    </svg>
                                        <p>{userData.clinicLocation} </p>
                                    </div>
                                </div>
                                <div className="doctorDescription-name-Proffecsion">
                                    <button className="doctorDescription-name-Proffecsion-button" onClick={togglePop}>Book</button>
                                    {seen ? <BookAppointmentPopUp toggle={togglePop} /> : null}
                                    {seen && <div className="overlay"></div>}
                                </div>
                            </div>

                            <div className="allPricese-doctor-flexcontainer">
                                <div className=" allPricese-doctor-flexitem doctorPrice-call">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M21.384,17.752a2.108,2.108,0,0,1-.522,3.359,7.543,7.543,0,0,1-5.476.642C10.5,20.523,3.477,13.5,2.247,8.614a7.543,7.543,0,0,1,.642-5.476,2.108,2.108,0,0,1,3.359-.522L8.333,4.7a2.094,2.094,0,0,1,.445,2.328A3.877,3.877,0,0,1,8,8.2c-2.384,2.384,5.417,10.185,7.8,7.8a3.877,3.877,0,0,1,1.173-.781,2.092,2.092,0,0,1,2.328.445Z" />
                                        </svg>
                                    </div>
                                    <div>{userData.feesc}</div>
                                </div>
                                <div className="allPricese-doctor-flexitem doctorPrice-videoCall">
                                    <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                                        <defs>
                                            <style>

                                            </style>
                                        </defs>
                                        <g id="Layer_2" data-name="Layer 2">
                                            <path className="cls-1" d="M11.92,52H36.23a7.86,7.86,0,0,0,7.86-7.86V19.89A7.86,7.86,0,0,0,36.23,12H11.92A7.92,7.92,0,0,0,4,19.95V44.05A7.92,7.92,0,0,0,11.92,52ZM36,18a2,2,0,1,1-2,2A2,2,0,0,1,36,18Z" />
                                            <path className="cls-1" d="M60,43.76V20.24a2.64,2.64,0,0,0-3.85-2.35l-6.32,3.24A3.27,3.27,0,0,0,48.06,24V40a3.27,3.27,0,0,0,1.77,2.9l6.32,3.25A2.64,2.64,0,0,0,60,43.76Z" />
                                        </g>
                                    </svg>
                                    </div>
                                    <div>{userData.feesvc}</div>
                                </div>
                                <div className="allPricese-doctor-flexitem doctorPrice-message">
                                    <div><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20px"
                                        height="20px"
                                        stroke="currentColor"
                                        viewBox="0 0 2048 2048"
                                    >
                                        <defs>
                                            <style type="text/css">{` .fil1 {fill:none}`}</style>
                                        </defs>
                                        <g id="Layer_x0020_1">
                                            <metadata id="CorelCorpID_0Corel-Layer" />
                                            <path
                                                className="fil0"
                                                d="M1571.22 1327.06c-132.418,110.082 -314.681,180.751 -517.719,187.107l-435.326 275.117 -47.0103 -42.6189 143.255 -285.249c-129.174,-46.6855 -240.474,-122.671 -320.941,-217.412 -86.4261,-101.76 -137.479,-225.095 -137.479,-357.271 0,-174.676 86.9776,-332.426 227.569,-446.24 138.726,-112.305 329.847,-181.782 540.433,-181.782 210.586,0 401.706,69.4772 540.432,181.782 140.591,113.813 227.569,271.564 227.569,446.24 0,170.922 -83.9753,326.596 -220.781,440.327z"
                                            />
                                            <g id="_244790544">
                                                <rect id="_244790880" className="fil1" width="2048" height="2048" />
                                                <rect id="_244788216" className="fil1" x="255.999" y="255.999" width="1536" height="1536" />
                                            </g>
                                        </g>
                                    </svg>
                                    </div>
                                    <div>{userData.feesM}</div>
                                </div>
                                <div className="allPricese-doctor-flexitem doctorPrice-clinic">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
                                            <path d="m66.57 54.617c-4.8047 3.0117-10.488 4.7578-16.57 4.7578-6.0859 0-11.762-1.7422-16.555-4.7734-1.4922-0.96094-3.2539-1.4766-5.0508-1.4766h-0.27344c-8.6289 0-15.625 6.9961-15.625 15.625v12.5c0 4.1445 1.6484 8.1172 4.5742 11.051 2.9297 2.9297 6.9062 4.5742 11.051 4.5742h43.75c4.1445 0 8.1172-1.6484 11.051-4.5742 2.9297-2.9297 4.5742-6.9062 4.5742-11.051v-12.5c0-8.6289-6.9961-15.625-15.625-15.625-0.17578 0-0.34766 0.007812-0.51953 0.023438-1.6836 0.039062-3.3438 0.55078-4.7852 1.4688zm-16.57-51.492c-13.797 0-25 11.203-25 25s11.203 25 25 25 25-11.203 25-25-11.203-25-25-25z" fillRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>{userData.feesCli}</div>
                                </div>
                                <div className="allPricese-doctor-flexitem doctorClient report">
                                    {appointments && (
                                        <div>
                                            <Popup trigger=
                                                {<div><svg className='flag-report' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M6.5 1.75C6.5 1.33579 6.16421 1 5.75 1C5.33579 1 5 1.33579 5 1.75V21.75C5 22.1642 5.33579 22.5 5.75 22.5C6.16421 22.5 6.5 22.1642 6.5 21.75V13.6V3.6V1.75Z" fill="#d71414" />
                                                    <path d="M13.5582 3.87333L13.1449 3.70801C11.5821 3.08288 9.8712 2.9258 8.22067 3.25591L6.5 3.60004V13.6L8.22067 13.2559C9.8712 12.9258 11.5821 13.0829 13.1449 13.708C14.8385 14.3854 16.7024 14.5119 18.472 14.0695L18.5721 14.0445C19.1582 13.898 19.4361 13.2269 19.1253 12.7089L17.5647 10.1078C17.2232 9.53867 17.0524 9.25409 17.0119 8.94455C16.9951 8.81543 16.9951 8.68466 17.0119 8.55553C17.0524 8.24599 17.2232 7.96141 17.5647 7.39225L18.8432 5.26136C19.1778 4.70364 18.6711 4.01976 18.0401 4.17751C16.5513 4.54971 14.9831 4.44328 13.5582 3.87333Z" fill="#d71414" />
                                                </svg></div>}
                                                modal nested>
                                                {
                                                    close => (
                                                        <div className='Client-Header-popup'>
                                                            <div>
                                                                <button className='Client-Header-popup-closebutton' onClick=
                                                                    {() => close()}>&#10006;
                                                                </button>
                                                            </div>
                                                            <div className='Client-Header-popup-content'>
                                                                <div className='Client-Header-popup-content'>
                                                                    <input
                                                                        className='Client-Header-popup-content-input'
                                                                        type="text"
                                                                        name="newName"
                                                                        placeholder='Enter Report'
                                                                        value={reportReason}
                                                                        onChange={(e) => setReportReason(e.target.value)}
                                                                    />
                                                                    <button className='Client-Header-popup-content-button' type="submit" onClick={handleReportDoctor}>Report doctor</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </Popup>

                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='doctordescription-gridContaineritem-main2'>

                        <div className="doctorDescription-gridItem doctorDescription-gridContainer3">

                            <div className="doctorDescription-numberOfPatients doctorDescription-flexcontainer">
                                <img src={patient} alt="number of patient attended" />
                                Patients: {userData.appointment}
                            </div>

                            <div className="doctorDescription-yearOfExperience doctorDescription-flexcontainer">
                                <img src={experience} alt="" />
                                Years expert {userData.YearOfexperience}
                            </div>
                            <div className="doctorDescription-rating doctorDescription-flexcontainer">
                                <svg
                                    width="100"
                                    height="100"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15.9628 6.20682L11.4997 5.55819L9.5046 1.51346C9.45011 1.40272 9.36046 1.31307 9.24972 1.25858C8.97198 1.12147 8.63448 1.23572 8.49562 1.51346L6.5005 5.55819L2.03741 6.20682C1.91437 6.2244 1.80187 6.2824 1.71573 6.37029C1.6116 6.47732 1.55422 6.62131 1.5562 6.77062C1.55818 6.91993 1.61935 7.06235 1.72628 7.16658L4.95538 10.3148L4.19249 14.7603C4.1746 14.8637 4.18605 14.9701 4.22552 15.0673C4.265 15.1646 4.33094 15.2488 4.41585 15.3105C4.50077 15.3722 4.60127 15.4088 4.70595 15.4163C4.81063 15.4237 4.91531 15.4017 5.00812 15.3527L9.00011 13.2539L12.9921 15.3527C13.1011 15.4107 13.2276 15.4301 13.3489 15.409C13.6548 15.3562 13.8605 15.0662 13.8077 14.7603L13.0448 10.3148L16.2739 7.16658C16.3618 7.08045 16.4198 6.96795 16.4374 6.8449C16.4849 6.53729 16.2704 6.25252 15.9628 6.20682Z"
                                        fill="#FFD33C"
                                    />
                                </svg>
                                Rating: {userData.averageRating}
                            </div>
                            <div className="doctorDescription-Reviews doctorDescription-flexcontainer">
                                <img src={review} alt="number of reviews got" />
                                Reviews: {userData.reviewCount}
                            </div>

                        </div>

                        <div className="doctorDescription-gridItem doctorDescription-About-flex">
                            <h2>About</h2>
                            <p>{userData.description}  </p>
                        </div>

                        <div className="doctorDescription-gridItem doctorDescription-RatingsAndReviews">
                            <div className="button_review_add_flex">
                                <h2>Ratings & Reviews</h2>
                                {appointments && (
                                    <div >
                                        <Popup trigger=
                                            {<div>
                                                <button type="button">
                                                    &#10010;
                                                </button>
                                            </div>}
                                            modal nested>
                                            {
                                                close => (
                                                    <div className='Client-Header-popup' >
                                                        <div>
                                                            <button className='Client-Header-popup-closebutton' onClick=
                                                                {() => close()}>&#10006;
                                                            </button>
                                                        </div>
                                                        <div className='Client-Header-popup-content'>

                                                            <div className='Client-Header-popup-content'>
                                                                <input
                                                                    className='Client-Header-popup-content-input'
                                                                    type="text"
                                                                    name="review"
                                                                    placeholder='Enter review'
                                                                    value={Review}
                                                                    onChange={(e) => setReview(e.target.value)}
                                                                /> <Box
                                                                    sx={{
                                                                        '& > legend': { mt: 2 },
                                                                    }}
                                                                >
                                                                    <Typography component="legend">Number of stars</Typography>
                                                                    <Rating
                                                                        name="simple-controlled"
                                                                        value={value}
                                                                        onChange={(event, newValue) => {
                                                                            setValue(newValue);
                                                                        }}
                                                                    />
                                                                </Box>
                                                                <button className='Client-Header-popup-content-button' type="submit" onClick={handleRateDoctor}>Rate doctor</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </Popup>
                                    </div>
                                )}

                            </div>


                            <div className='doctorDescription-RatingsAndReviews-gridWrapper'>
                                {userData.reviews && userData.reviews.map((item, index) => (
                                    <div key={index} className="doctorDescription-RatingsAndReviews-gridContainer">
                                 
                                        <div className="RatingsAndReviews-griditem doctorDescription-RatingsAndReviews-star">
                                            <svg
                                                width="100"
                                                height="100"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M15.9628 6.20682L11.4997 5.55819L9.5046 1.51346C9.45011 1.40272 9.36046 1.31307 9.24972 1.25858C8.97198 1.12147 8.63448 1.23572 8.49562 1.51346L6.5005 5.55819L2.03741 6.20682C1.91437 6.2244 1.80187 6.2824 1.71573 6.37029C1.6116 6.47732 1.55422 6.62131 1.5562 6.77062C1.55818 6.91993 1.61935 7.06235 1.72628 7.16658L4.95538 10.3148L4.19249 14.7603C4.1746 14.8637 4.18605 14.9701 4.22552 15.0673C4.265 15.1646 4.33094 15.2488 4.41585 15.3105C4.50077 15.3722 4.60127 15.4088 4.70595 15.4163C4.81063 15.4237 4.91531 15.4017 5.00812 15.3527L9.00011 13.2539L12.9921 15.3527C13.1011 15.4107 13.2276 15.4301 13.3489 15.409C13.6548 15.3562 13.8605 15.0662 13.8077 14.7603L13.0448 10.3148L16.2739 7.16658C16.3618 7.08045 16.4198 6.96795 16.4374 6.8449C16.4849 6.53729 16.2704 6.25252 15.9628 6.20682Z"
                                                    fill="#FFD33C"
                                                />
                                            </svg>
                                            {item.stars}
                                        </div>
                                        <div className="RatingsAndReviews-griditem doctorDescription-RatingsAndReviews-title">
                                            {item.username}
                                        </div>

                                        <div className="RatingsAndReviews-griditem doctorDescription-RatingsAndReviews-description">
                                            {item.review}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default DoctorDescription;