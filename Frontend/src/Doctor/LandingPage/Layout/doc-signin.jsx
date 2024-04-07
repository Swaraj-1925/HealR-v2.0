import './../style/doc-signin.css';
import Logo from './../style/images/logoBlack.png';
import { useState } from "react";

import axios from 'axios';


function Doc_signIn() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function postData() {
        axios.post('http://localhost:3000/doctor/signin', {
            username: name,
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
            <div className="doctor-signIN">
                <div className="docsignin-container">
                    <img src={Logo} alt="" />
                    <input
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Email" type="email"
                        name="email" id="" />
                    <input value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" placeholder='Enter Password' name="password" id="" />

                    <button type="button" onClick={postData}>Submit</button>
                </div>

            </div>
        </>
    );
}

export default Doc_signIn;