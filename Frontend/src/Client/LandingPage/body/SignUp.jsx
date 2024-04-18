import { useState } from "react";
import { useNavigate } from "react-router-dom";


import axios from 'axios';

import signUpimg from './style/images/SignUp.jpg';

import './style/css/LandingPage-signUp.css';

function SignUP() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState('');
    const [discord, setDiscord] = useState('');
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    const navigate = useNavigate(); // Utilize useNavigate hook

    
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };
    const handleDiscordChange = (event) => {
        setDiscord(event.target.value); 
    };
    function postData() {
        if (password != cpassword) { 
            alert("password dont match!")

        } else {
            
            axios.post('http://localhost:3000/user/signup', {
                name: name,
                username: email,
                password: password,
                age: age,
                gender: gender,
                discord: discord,

            })
                .then(function (response) {
                    console.log(response);
                    if (response.data.message === 'Successfully') { 
                        navigate('/sign-in'); 
                  } else {
                    console.error('Login failed:', response.data.message);
                    // Handle login failure (e.g., display error message)
                  }

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    return (
        <>
            <div className="landingPage-signUp-flexContainer">

                <div className="landingPage-signUp-centeredContent">
                    <img className="landingPage-signUp-flexItem imagsignUp" src={signUpimg} alt="" />
                    <div className="landingPage-signUnp-flexItem signUp-flexContainerTwo">
                        <input
                            className='signUp-flexContainerTwo-input'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />
                        <input
                            className='signUp-flexContainerTwo-input'
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            className='signUp-flexContainerTwo-input'
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="age"
                        />
                        <div>Gender</div>
                        <div className=''>
                            <label>

                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={gender === 'male'}
                                    onChange={handleGenderChange}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={gender === 'female'}
                                    onChange={handleGenderChange}
                                />
                                Female
                            </label>
                        </div>
                        <input
                            className='signUp-flexContainerTwo-input'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <input
                            className='signUp-flexContainerTwo-input'
                            type="password"
                            value={cpassword}
                            onChange={(e) => setCpassword(e.target.value)}
                            placeholder="Confirm Password"
                        />
                        <div>have account on discord</div>
                        <div>
                            <label>

                                <input
                                    type="radio"
                                    name="discord"
                                    value="yes"
                                    checked={discord === 'yes'}
                                    onChange={handleDiscordChange}
                                />
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="discord"
                                    value="no"
                                    checked={discord === 'no'}
                                    onChange={handleDiscordChange}
                                />
                                No
                            </label>
                        </div>


                        <button className='signUp-flexContainerTwo-button' type="button" onClick={postData}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUP;
