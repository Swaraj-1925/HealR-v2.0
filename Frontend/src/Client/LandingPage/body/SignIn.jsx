import { useState } from "react";

import axios from 'axios';

import SignInimg from './style/images/SignIn.jpg';

import './style/css/LandingPage-signIn.css';

function SignIn() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function postData() {
        axios.post('/sign-in', {
            email: name,
            password: password
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    } 

    return (
        <>
            <div className="landingPage-signIn-flexContainer">
            
                <div className="landingPage-signIn-centeredContent">
                    <img className="landingPage-signIn-flexItem imagSignIN" src={SignInimg} alt="" />
                    <div className="landingPage-signIn-flexItem flexContainerTwo">
                        <input
                            className='flexContainerTwo-input'
                            type="email"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            className='flexContainerTwo-input'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <button className='flexContainerTwo-button' type="button" onClick={postData}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;
