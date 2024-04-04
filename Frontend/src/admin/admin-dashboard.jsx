function Admin_dashboard() {
  return (
    <>
      <div className="adminDashboard-conatiner">
        <div className="adminDahsboard-gridContainer1">
          <div className="adminDahsboard-gridContainer1-item adminDashboard-statusContainer">
            <h1>Active Patient</h1>
              <div className="statusContainerNumber">10</div>

          </div>
          <div className="adminDahsboard-gridContainer1-item adminDashboard-statusContainer">
          <h1>Active Doctor</h1>
              <div className="statusContainerNumber">10</div>
          </div>
          <div className="adminDahsboard-gridContainer1-item adminDashboard-statusContainer">
          <h1>Staff</h1>
              <div className="statusContainerNumber">10</div>
          </div>
          <div className="adminDahsboard-gridContainer1-item adminDashboard-statusContainer">
          <h1>Appoinments</h1>
              <div className="statusContainerNumber">10</div>
          </div>
        </div>
        <div className="adminDahsboard-gridContainer2">
          
        </div>
      </div>
    </>
  );
}

export default Admin_dashboard; 