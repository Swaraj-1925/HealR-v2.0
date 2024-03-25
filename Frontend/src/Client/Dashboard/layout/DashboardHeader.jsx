import Logo from './../style/images/logoBlack.png';
import './../style/DashboardHeader.css';
import { Link } from 'react-router-dom';

function DashHeader() {

    return (
        <>
            <header className="dashboard-header-conatiner">
                <div className="dashboard-header-item" >
                    <img className='dashboard-header-img' src={Logo} alt="" />
                </div>
                <div className="dashboard-header-item" ><Link to="/dashboard" > Home</Link></div>
                <div className="dashboard-header-item" ><Link to="book-appoinmet" > Book Appoinment</Link></div>
                <div className="dashboard-header-item" ><Link to="chat" > Chat </Link></div>
               <div className="dashboard-header-item" >Profile</div>
            </header>
        </>
    );
}

export default DashHeader;