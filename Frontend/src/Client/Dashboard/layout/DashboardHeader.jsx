import Logo from './../style/images/logoBlack.png';
import './../style/DashboardHeader.css';

function DashHeader() {

    return (  
        <>
            <header className="dashboard-header-conatiner">
                <div className="dashboard-header-item" >
                <img className='dashboard-header-img' src={Logo} alt="" />
                </div>
                <div className="dashboard-header-item" >Home</div>
                <div className="dashboard-header-item" >Book Appoinment</div>
                <div className="dashboard-header-item" >Chat</div>
                <div className="dashboard-header-item" >Profile</div>
            </header>
        </>
    );
}

export default DashHeader;