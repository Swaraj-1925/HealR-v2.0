import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../style/DashboardHeader.css';
import Logo from './../style/images/logoBlack.png';
import Popup from 'reactjs-popup';

function DashHeader() {
    const [open, setOpen] = useState(false);

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

    const changeName = () => {
        console.log("change name")
    }
    const changeEmail = () => {
        console.log("change email")
    }
    const deleteAccount = () => {
        console.log("delete account")
    }
    const logOut = () => {
        console.log("log out")
    }

    return (
        <>
            <header className="dashboard-header-conatiner">
                <div className="dashboard-header-item">
                    <img className='dashboard-header-img' src={Logo} alt="" />
                </div>
                <div className="dashboard-header-item"><Link to="/dashboard">Home</Link></div>
                <div className="dashboard-header-item"><Link to="book-appoinmet">Book Appoinment</Link></div>
                <div className="dashboard-header-item"><Link to="chat">Chat</Link></div>
                <div className={`dashboard-header-item ${open ? 'open' : ''}`} onClick={handleOpen}>
                    Profile
                    <ul className="client-profile-dropdown-menu">
                        <li className="client-profile-dropdown-menuItem" onClick={changeName}>
                            <Popup trigger=
                                {<div>Chnage name</div>}
                                modal nested>
                                {
                                    close => (
                                        <div className='Client-Header-popup'>
                                            <div className='content'>
                                                <input type="text" name="newName" placeholder='Enter your new name' />
                                                <button type="submit">Change Name</button>
                                            </div>
                                            <div>
                                                <button className='' onClick=
                                                    {() => close()}>
                                                    Close modal
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            </Popup>
                        </li>
                        <li className="client-profile-dropdown-menuItem" onClick={changeEmail}>
                            <Popup trigger=
                                {<div>Change Email</div>}
                                modal nested>
                                {
                                    close => (
                                        <div className='Client-Header-popup'>
                                            <div className='content'>
                                                <input type="email" name="newName" placeholder='Enter your new email' />
                                                <button type="submit">Change Email</button>
                                            </div>
                                            <div>
                                                <button className='' onClick=
                                                    {() => close()}>
                                                    Close modal
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            </Popup>
                        </li>
                        <Link to="contactUs"> <li className="client-profile-dropdown-menuItem">Contact us</li></Link>
                        <Link to="faq"> <li className="client-profile-dropdown-menuItem">faq</li></Link>
                        <li className="client-profile-dropdown-menuItem" onClick={deleteAccount}>
                            <Popup trigger=
                                {<div>Delete Account</div>}
                                modal nested>
                                {
                                    close => (
                                        <div className='Client-Header-popup'>
                                            <div className='content'>
                                                <h3>Are you sure you want to <b>delete</b> your Account??</h3>
                                                <div className='client-header-popup-confimation'>
                                                    <button type="submit">Yes</button>
                                                    <button type="submit">no</button>

                                                </div>
                                            </div>
                                            <div>
                                                <button className='' onClick=
                                                    {() => close()}>
                                                    Close modal
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            </Popup>
                        </li>
                        <li className="client-profile-dropdown-menuItem" onClick={logOut}>
                            <Popup trigger=
                                {<div>Log out</div>}
                                modal nested>
                                {
                                    close => (
                                        <div className='Client-Header-popup'>
                                            <div className='content'>
                                                <div className='content'>
                                                    <h3>Are you sure you want to <b>Log Out</b></h3>
                                                    <div className='client-header-popup-confimation'>
                                                        <button type="submit">Yes</button>
                                                        <button type="submit">no</button>

                                                    </div>
                                                </div>
                                                <div>
                                                    <button className='' onClick=
                                                        {() => close()}>
                                                        Close modal
                                                    </button>
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
