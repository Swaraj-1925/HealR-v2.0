import './style/admin-signIn.css';

function Admin_signIN() {
    return ( 
        <>
       <div className="admin_signIn_conatiner">
        
                <div className="adminignin-container">
                    <input  type="email" placeholder='Enter Email' name="email"  />
                    <input type="password" placeholder='Enter Password' name="password"   />
                    <button type="button">Submit</button>
                </div>
 
       </div>
        </>
     );
}

export default Admin_signIN;