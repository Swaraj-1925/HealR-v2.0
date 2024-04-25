import  { useState, useEffect } from 'react';
import './style/admin-dashboard.css';
import VerifactionReq from './componets/admin-docVerificationReq.jsx';
import axios from 'axios';

function Admin_dashboard() {
  const [dashboardData, setDashboardData] = useState({
    User:0,
    appointments:0,
    doctor:0,
    staff:0 
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/dashboard');
 
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <div className="adminDashboard-conatiner">
        <div className="adminDahsboard-gridContainer1">
          <div className="adminDahsboard-gridContainer1-item adminDashboard-statusContainer">
            <h1>Active Patient</h1>
            <div className="statusContainerNumber">{dashboardData.User}</div>
          </div>
          <div className="adminDahsboard-gridContainer1-item adminDashboard-statusContainer">
            <h1>Active Doctor</h1>
            <div className="statusContainerNumber">{dashboardData.doctor}</div>
          </div>
          <div className="adminDahsboard-gridContainer1-item adminDashboard-statusContainer">
            <h1>Staff</h1>
            <div className="statusContainerNumber">{dashboardData.staff}</div>
          </div>
          <div className="adminDahsboard-gridContainer1-item adminDashboard-statusContainer">
            <h1>Appointments</h1>
            <div className="statusContainerNumber">{dashboardData.appointments}</div>  
          </div>
        </div>
        <div className="adminDahsboard-gridContainer2">
          <VerifactionReq />
        </div>
      </div>
    </>
  );
}

export default Admin_dashboard;
