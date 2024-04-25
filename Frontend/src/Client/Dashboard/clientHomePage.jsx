import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import './style/clientHomePage.css';




function ClientHomePage() {
    const [username, setUsername] = useState("");
    const [closestAppointment, setClosestAppointment] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
 
        const fetchUserName = async () => {

            try {
                const response = await axios.get('http://localhost:3000/user/dashboard', {
                    withCredentials: true
                },
            );
                const userData = response.data; 
                setUsername(userData.user);

                setClosestAppointment(userData.docObj);
                
                
            } catch (error) {
                alert("User not Found, signin in again")
                navigate('/sign-in'); 
            } 
        };
        fetchUserName();
        
        
    }, []);
    
    
    return (
        <>
            <div className='Dashboard-home-wrapper'>
                <div className='Dashboard-home-gridContainer'>
                    <div className='Dashboard-home-gridItem Dashboard-home-homePart'>
                        <h1>Welcome</h1>
                        <p>{username}</p>
                    </div>

                    <div className='Dashboard-home-gridItem Dashboard-home-upcomingAppoinment'>
                        <div className='Dashboard-home-upcomingAppoinment-item upcomingAppoinment-titleContainer'>
                            <h1 className='upcomingAppoinment-title'>Upcoming Appointment</h1>
                        </div>

                        {/* Check if closestAppointment exists */}
                        {closestAppointment ? (
                            <>
                                {/* Display appointment details if available */}
                                <div className='Dashboard-home-upcomingAppoinment-item'>
                                    <img
                                        className='upcomingAppoinment-doctorImg'
                                        src={closestAppointment.docImg}
                                        alt="Doctor image"
                                    />
                                </div>
                                <div className='Dashboard-home-upcomingAppoinment-item'>
                                    <h2 className='upcomingAppoinment-NameDoctor'>
                                        dr. {closestAppointment.docname}
                                    </h2>
                                    <h6 className='upcomingAppoinment-doctorprofession'>
                                        
                                    </h6>
                                </div>
                                <div className='Dashboard-home-upcomingAppoinment-item upcomingAppoinment-item-gridContainer'>
                                    <h2 className='upcomingAppoinment-date'>
                                        {closestAppointment.date}
                                    </h2>
                                    <h2 className='upcomingAppoinment-time'>
                                        { closestAppointment.time} 
                                    </h2>
                                </div>
                                <div className='Dashboard-home-upcomingAppoinment-item'>
                                    <button disabled="disabled" className='upcomingAppoinment-modeOfTherapy'>
                                        <h3>{closestAppointment.appointmentType}</h3>
                                    </button>
                                </div>
                            </>
                        ) : (
                            
                            <div className='Dashboard-home-upcomingAppoinment-item'>
                                <p className='noAppoinmenttxt'>No upcoming appointment booked.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>

    );
}

export default ClientHomePage;