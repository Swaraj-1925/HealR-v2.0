import { useEffect } from 'react';
import './style/clientHomePage.css';
import temp from './style/images/image.png';

import {   useState } from 'react';
import axios from 'axios';


function ClientHomePage() {
    const[username,setUsername]=useState("");
    const [closestAppointment, setClosestAppointment] = useState(null);
    
    useEffect(() => {
         
        const fetchUserName = async () => {
            
            try {
                const response = await axios.get('http://localhost:3000/user/dashboard',{
                    withCredentials:true
                });
                const userData = response.data;
                setUsername (userData.user);
                setClosestAppointment(userData.closestAppointment);
                console.log(userData);
                
            } catch (error) {
                console.error('Error fetching user data:', error);
                // setError(error);
            } finally {
                // setIsLoading(false);
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

                    {closestAppointment ? (
                        <>
                            <div className='Dashboard-home-upcomingAppoinment-item'>
                                <img className='upcomingAppoinment-doctorImg' src={temp} alt="Doctor image" />
                            </div>
                            <div className='Dashboard-home-upcomingAppoinment-item'>
                                <h2 className='upcomingAppoinment-NameDoctor'>dr.Name Doctor</h2>
                                <h6 className='upcomingAppoinment-doctorprofession'>doctor profession</h6>
                            </div>
                            <div className='Dashboard-home-upcomingAppoinment-item upcomingAppoinment-item-gridContainer'>
                                <h2 className='upcomingAppoinment-date'>{closestAppointment.date}</h2>
                                <h2 className='upcomingAppoinment-time'>{closestAppointment.time}</h2>
                            </div>
                            <div className='Dashboard-home-upcomingAppoinment-item'>
                                <button disabled="disabled" className='upcomingAppoinment-modeOfTherapy'><h3>Call</h3></button>
                            </div>
                        </>
                    ) : (
                        <h1 className='noAppoinmenttxt'>No appointment booked</h1>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}

export default ClientHomePage;