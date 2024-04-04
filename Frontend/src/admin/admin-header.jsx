import { Link } from 'react-router-dom';
import './style/admin-header.css';
function Adminheader() {
    return ( 
        <>
        <div className="admin-headerContainer">
        <Link to="admin_dashboard"> <div className="admin-header-item">Home</div></Link> 
        <Link to="admin_doctor"> <div className="admin-header-item">Doctor</div></Link> 
        <Link to="admin_patient">   <div className="admin-header-item">Patient</div></Link> 
        <Link to="admin_staff">   <div className="admin-header-item">Staff</div></Link> 
                 <div className="admin-header-item">Setting</div> 
        </div>
        </>
     );
}

export default Adminheader;