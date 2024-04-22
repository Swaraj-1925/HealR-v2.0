import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';

import './../style/DashboardHeader.css';
import Logo from './../style/images/logoBlack.png';
import Cookies from 'js-cookie';

function DashHeader() {
    const [open, setOpen] = useState(false);
    const [data, setdata] = useState("")
    const [toChange, setToChange] = useState("")


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (open && !event.target.closest('.dashboard-header-item')) {
                setOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [open]);

    const handleOpen = () => {
        setOpen(!open);
    };

    const deleteAccount = () => {
        axios.post('http://localhost:3000/user/Delete_account', null, { withCredentials: true })
            .then(function (response) {
                console.log(response);
                if (response.data.message === 'successfully') {
                    alert("Account deleted successfully");
                    window.location.href = '/';
                } else {
                    console.error('Delete account failed:', response.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    function logOut() {
        const jwtCookieName = 'token';
        Cookies.remove(jwtCookieName);
        window.location.href = '/sign-in';
    }

    function postData() {
        axios.post('http://localhost:3000/user/updateData', {
            toChange: toChange,
            data: data
        }, {
            withCredentials: true
        })
            .then(function (response) {
                console.log(response);
                if (response.data.message === 'successfully') {
                    alert("data updated successfully")
                    window.location.reload();
                } else {
                    console.error('Login failed:', response.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <header className="dashboard-header-conatiner">
                <div className="dashboard-header-item">
                    <Link to="/dashboard">   <img className='dashboard-header-img' src={Logo} alt="" /></Link>
                </div>
                <div className="dashboard-header-item"><Link to="/dashboard">Home</Link></div>
                <div className="dashboard-header-item"><Link to="book-appoinmet">Book Appoinment</Link></div>
                <div className="dashboard-header-item"><Link to="chat">Chat</Link></div>
                <div className={`dashboard-header-item ${open ? 'open' : ''}`} onClick={handleOpen}>
                    Profile
                    <ul className="client-profile-dropdown-menu">
                        <li className="client-profile-dropdown-menuItem" >
                            <Popup trigger=
                                {<div>Chnage name</div>}
                                modal nested>
                                {
                                    close => (
                                        <div className='Client-Header-popup'>
                                            <div>
                                                <button className='Client-Header-popup-closebutton' onClick=
                                                    {() => close()}>
                                                    &#10006;
                                                </button>
                                            </div>
                                            <div className='Client-Header-popup-content'>
                                                <input className='Client-Header-popup-content-input'
                                                    type="text"
                                                    name="newName"
                                                    value={data}
                                                    onChange={(e) => {
                                                        setdata(e.target.value);
                                                        setToChange("name");

                                                    }}
                                                    placeholder='Enter your new name' />
                                                <button className='Client-Header-popup-content-button' onClick={() => postData()}>Change Name</button>
                                            </div>
                                        </div>
                                    )
                                }
                            </Popup>
                        </li>
                        <li className="client-profile-dropdown-menuItem">
                            <Popup trigger=
                                {<div>Change Email</div>}
                                modal nested>
                                {
                                    close => (
                                        <div className='Client-Header-popup'>
                                            <div>
                                                <button className='Client-Header-popup-closebutton' onClick=
                                                    {() => close()}>
                                                    &#10006;
                                                </button>
                                            </div>
                                            <div className='Client-Header-popup-content' >
                                                <input
                                                    className='Client-Header-popup-content-input'
                                                    type="email"
                                                    name="newName"
                                                    value={data}
                                                    onChange={(e) => {
                                                        setdata(e.target.value);
                                                        setToChange("patientUsername");

                                                    }}
                                                    placeholder='Enter your new email' />
                                                <button className='Client-Header-popup-content-button' onClick={() => postData()}>Change Email</button>
                                            </div>
                                        </div>
                                    )
                                }
                            </Popup>
                        </li>
                        <Link to="contactUs"> <li className="client-profile-dropdown-menuItem">Contact us</li></Link>
                        <Link to="faq"> <li className="client-profile-dropdown-menuItem">faq</li></Link>
                        <li className="client-profile-dropdown-menuItem" >
                            <Popup trigger=
                                {<div>Delete Account</div>}
                                modal nested>
                                {
                                    close => (
                                        <div className='Client-Header-popup'>
                                            <div>
                                                <button className='Client-Header-popup-closebutton' onClick=
                                                    {() => close()}>&#10006;
                                                </button>
                                            </div>
                                            <div className='Client-Header-popup-content'>
                                                <h3>Are you sure you want to <b>delete</b> your account??</h3>
                                                <div className='client-header-popup-confimation'>
                                                    <button type="submit" onClick={() => deleteAccount()}>Yes</button>
                                                    <button type="submit" onClick={() => close()}>no</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </Popup>
                        </li>
                        <li className="client-profile-dropdown-menuItem" >
                            <Popup trigger=
                                {<div>Log out</div>}
                                modal nested>
                                {
                                    close => (
                                        <div className='Client-Header-popup'>
                                            <div>
                                                <button className='Client-Header-popup-closebutton' onClick=
                                                    {() => close()}>&#10006;
                                                </button>
                                            </div>
                                            <div className='Client-Header-popup-content'>
                                                <h3>Are you sure you want to <b>Log Out</b></h3>
                                                <div className='client-header-popup-confimation'>
                                                    <button onClick={logOut}>Yes</button>
                                                    <button onClick={() => close()}>no</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </Popup>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    );
}

export default DashHeader;
