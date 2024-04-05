import './../style/doc-signin.css';
import Logo from './../style/images/logoBlack.png';



function Doc_signIn() {
    return ( 
        <>
               <div className="doctor-signIN">
                <div className="docsignin-container">
                    <img src={Logo} alt="" />
                    <input  type="email" placeholder='Enter Email' name="email" id="" />
                    <input type="password" placeholder='Enter Password' name="password" id="" />
                    
                    <button type="button">Submit</button>
                </div>

               </div>
        </>
     );
}

export default Doc_signIn;