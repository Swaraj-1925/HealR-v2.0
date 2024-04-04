import './style/clientHomePage.css';
import temp from './style/images/image.png';


function clientHomePage() {
    const name ="name"
    
    return (
        <>
            <div className='Dashboard-home-wrapper'  >
                <div className='Dashboard-home-gridContainer' >
                    <div className='Dashboard-home-gridItem Dashboard-home-homePart '>
                        <h1>Welcome</h1>
                        <p>{name}</p> 
                    </div>

                    <div className='Dashboard-home-gridItem Dashboard-home-upcomingAppoinment' >
                        <div className='Dashboard-home-upcomingAppoinment-item upcomingAppoinment-titleContainer'>
                            <h1 className='upcomingAppoinment-title'>Upcoming Appoinment</h1>
                        </div>
                        <div className='Dashboard-home-upcomingAppoinment-item'>
                            <img className='upcomingAppoinment-doctorImg' src={temp} alt="Doctor image" />
                        </div>
                        <div className='Dashboard-home-upcomingAppoinment-item'>
                            <h2 className='upcomingAppoinment-NameDoctor'>dr.Name Doctor</h2>
                            <h6 className='upcomingAppoinment-doctorprofession'>docotr proffection</h6>
                        </div>
                        <div className='Dashboard-home-upcomingAppoinment-item upcomingAppoinment-item-gridContainer'>
                            <h2 className='upcomingAppoinment-date'>14-3-2202 </h2>
                            <h2 className='upcomingAppoinment-time'>09:11pm</h2>
                        </div>
                        <div className='Dashboard-home-upcomingAppoinment-item'>
                            <button disabled="disabled" className='upcomingAppoinment-modeOfTherapy'><h3>Call</h3></button>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
}

export default clientHomePage;