import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

import star from './style/images/star.png';
import './style/clientBookAppointment.css';


function BookAppointment() {

    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();
    // const [doctorsinfo, setDoctorsinfo] = useState([]);

    useEffect(() => {

        const fetchUserName = async () => {

            try {
                const response = await axios.get('http://localhost:3000/user/bookappoinmet', {
                    withCredentials: true
                });
                setDoctors(response.data);
                console.log(response.data)


            } catch (error) {
                console.error('Error fetching user data:', error);

            }
        };
        fetchUserName();


    }, []);

    async function Doc_description(docid) {
        const url = `/dashboard/book-appoinmet/doctor/${docid}`;
        navigate(url);
    }
    
    

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
                {doctors.map((doctor) => (

                        <div key={doctor._id} onClick={() =>Doc_description(doctor._id)}>

                        <div className="bookAppoinment-cardContainer-grid">
                            <div className="bookAppoinment-cardItem bookAppoinment-cardItem-doctorImgdiv">
                                <img className="bookAppoinment-cardItem-doctorImg" src={doctor.image.small} alt="" />
                            </div>
                            <div className="bookAppoinment-cardItem bookAppoinment-doctordescriptiondiv">
                                <div className="bookAppoinment-cardItem-doctordescription-gridContainer">
                                    <div className="doctordescription-gridItem name">
                                        <h1>Dr {doctor.name}</h1>
                                    </div>
                                    <div className="doctordescription-gridItem proffesion">
                                        <h3> {doctor.experience.profession}</h3>
                                        <hr />
                                    </div>
                                    <div className="doctordescription-gridItem Doctor-reviwsAndStar">
                                        <img src={star} alt="star" />
                                        <h2>4.8| 20 Reviews</h2>
                                    </div>
                                    <div className="doctordescription-gridItem keyPoints">
                                        <ul className='user-keyPoints'>
                                            {doctor.shortdescription && JSON.parse(doctor.shortdescription[0]).map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="bookAppoinment-cardItem  doctordescription-gridItem-price">
                                {doctor.fees.message} /hr
                            </div>
                        </div>
                        </div>  
                ))}
            </div>
        </>
    );
}

export default BookAppointment;
