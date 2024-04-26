/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import './style/clientPopupBookAppoinment.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

function BookAppointmentPopUp({ toggle }) {

  const { doctorId } = useParams();
  const temrsandcondtion = "/";
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [acceptedFess, setAcceptedFess] = useState('');
  const [fess, setfess] = useState(0);


  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    const fetchAvailableTimeSlots = async () => {
      if (selectedDate) {
        try {
          const response = await axios.get(
            `http://localhost:3000/user/availableTimeSlots/${doctorId}`,
            {
              params: { selectedDate: selectedDate.toISOString() },
              withCredentials: true,
            }
          );
          setAvailableTimeSlots(response.data.time);
          setfess(response.data.fees);
        } catch (error) {
          console.error('Error fetching available time slots:', error);
        }
      }
    };

    fetchAvailableTimeSlots();
  }, [selectedDate, doctorId]);


  const handleSubmit = async () => {

    try {
      if (!selectedDate) {
        alert('Please select a date before submitting.');
        return
      } else if (!selectedTimeSlot) {
        alert('Please select a time before submitting.');
        return
      } else if (!selectedMethod) {
        alert('Please select a method before submitting.');
        return
      } else if (!isTermsAccepted) {
        alert('Please select a accept terms  before submitting.');
        return
      }

      const date = selectedDate.toISOString()
      const response = await axios.post(`http://localhost:3000/user/docAppoinmentdatapost/${doctorId}`, {
        date,
        selectedTimeSlot,
        selectedMethod
      }, {
        withCredentials: true
      });

      if (response.data.message == "successfull") {
        alert("appoinment booked")
        location.reload();
      }
    } catch (error) {
      alert("error occured tryin again later", error.message)
      location.reload();
    }
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };




  const handleDateClick = (date) => {
    setSelectedDate(date);

  };
  const handleMethodChange = (method) => {
    setSelectedMethod(method); // Update selected method
  };


  const getCalendarDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const calendarDays = [];


    for (let i = 0; i < 30; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      const dayName = days[date.getDay()];
      calendarDays.push({ dayName, date });
    }

    return calendarDays;
  };
  const renderCalendarDay = (dayObj) => {
    if (!dayObj) {
      return <div className="calendar-day-empty"></div>;
    }

    const isSelected =
      selectedDate.getDate() === dayObj.date.getDate() &&
      selectedDate.getMonth() === dayObj.date.getMonth() &&
      selectedDate.getFullYear() === dayObj.date.getFullYear();
    const selectedDateStyle = isSelected ? { backgroundColor: '#FFC94A', color: 'black' } : {};
    return (
      <div
        key={dayObj.date}
        className={`Bookappoinment-calender-calendar-day${isSelected ? ' selected' : ''} `}
        style={selectedDateStyle}
        onClick={() => handleDateClick(new Date(dayObj.date))}
      >
        <div className="Bookappoinment-calender-day-name">{dayObj.dayName}</div>
        <div className="Bookappoinment-calender-date">{dayObj.date.getDate()}</div>
      </div>
    );
  };

  const handleTimeSlotChange = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };



  const handleClose = () => {
    toggle();
  };

  return (
    <>
      <section className="client-bookAppoinment-popup-wrapper">
        <button className='client-bookAppoinment-popupClose ' onClick={handleClose}>&#10006;</button>

        <section className=" client-bookAppoinment-popup-wrapperItem bookAppoinment-calender-section">

          <div className="client-Bookappoinment-calender-gridcontainer">
            <div className="Bookappoinment-calender-gridcontainer-calendar-month">
              <h2>{selectedDate.toLocaleDateString('en-US', { month: 'long', })}</h2>
            </div>
            <div className="Bookappoinment-calender-gridcontainer-calendar-datesWeek">
              {getCalendarDays(selectedDate).map(renderCalendarDay)}
            </div>
          </div>
        </section>

        <section className="client-bookAppoinment-popup-wrapperItem bookAppoinment-availabletime-section">

          <h3>Available Time Slots for {selectedDate.getDate()} {selectedDate.toLocaleDateString('en-US', { month: 'long', },)}</h3>
          <div className="client-Bookappoinment-availabledate-gridcontainer">
            {availableTimeSlots.map((slot, index) => (
              <div key={index} className="availabledate-grid-button">
                <input
                  type="radio"
                  id={`timeSlot${index}`}
                  name="timeSlot"
                  value={slot} // Use `slot` directly as it represents the time slot value
                  checked={selectedTimeSlot === slot}
                  onChange={() => handleTimeSlotChange(slot)} // Pass `slot` as the argument
                />
                <label htmlFor={`timeSlot${index}`}>{slot}</label> {/* Display the time slot */}
              </div>
            ))}

          </div>

        </section>
        <section className="client-bookAppoinment-popup-wrapperItem bookAppoinment-typeOfTherapy-section">
          <h3>Choose a method</h3>
          <div className="client-Bookappoinment-typeOfTherapy-gridcontainer">
            <div className="typeOfTherapy-gridcontaine-radio-inputs">

              <div className="radio-inputs">
                <label>
                  <input
                    className="radio-input"
                    type="radio"
                    name="method"
                    value="message"
                    checked={selectedMethod === "message"}
                    onChange={() => handleMethodChange("message")}
                    onClick={()=> setAcceptedFess(fess.message)}
                  />
                  <span className="radio-tile">
                    <span className="radio-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2048px"
                        height="2048px"
                        stroke="currentColor"
                        viewBox="0 0 2048 2048"
                      >
                        <defs>
                          <style type="text/css">
                            {`
                              .fil1 {fill:none}
                              
                            `}
                          </style>
                        </defs>
                        <g id="Layer_x0020_1">
                          <metadata id="CorelCorpID_0Corel-Layer" />
                          <path
                            className="fil0"
                            d="M1571.22 1327.06c-132.418,110.082 -314.681,180.751 -517.719,187.107l-435.326 275.117 -47.0103 -42.6189 143.255 -285.249c-129.174,-46.6855 -240.474,-122.671 -320.941,-217.412 -86.4261,-101.76 -137.479,-225.095 -137.479,-357.271 0,-174.676 86.9776,-332.426 227.569,-446.24 138.726,-112.305 329.847,-181.782 540.433,-181.782 210.586,0 401.706,69.4772 540.432,181.782 140.591,113.813 227.569,271.564 227.569,446.24 0,170.922 -83.9753,326.596 -220.781,440.327z"
                          />
                          <g id="_244790544">
                            <rect id="_244790880" className="fil1" width="2048" height="2048" />
                            <rect id="_244788216" className="fil1" x="255.999" y="255.999" width="1536" height="1536" />
                          </g>
                        </g>
                      </svg>

                    </span>
                    <span className="radio-label"  >Message</span>
                    <span className="radio-label" >{fess.message}</span>
                  </span>
                </label>
                <label>
                  <input
                    className="radio-input"
                    type="radio"
                    name="method"
                    value="Call"
                    checked={selectedMethod === "Call"}
                    onChange={() => handleMethodChange("Call")}
                    onClick={()=> setAcceptedFess(fess.call)}
                  />

                  <span className="radio-tile">
                    <span className="radio-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M21.384,17.752a2.108,2.108,0,0,1-.522,3.359,7.543,7.543,0,0,1-5.476.642C10.5,20.523,3.477,13.5,2.247,8.614a7.543,7.543,0,0,1,.642-5.476,2.108,2.108,0,0,1,3.359-.522L8.333,4.7a2.094,2.094,0,0,1,.445,2.328A3.877,3.877,0,0,1,8,8.2c-2.384,2.384,5.417,10.185,7.8,7.8a3.877,3.877,0,0,1,1.173-.781,2.092,2.092,0,0,1,2.328.445Z" />
                      </svg>
                    </span>
                    <span className="radio-label" >Call</span>
                    <span className="radio-label">{fess.call}</span>
                  </span>
                </label>
                <label>
                  <input
                    className="radio-input"
                    type="radio"
                    name="method"
                    value="Video call"
                    checked={selectedMethod === "Video_call"}
                    onChange={() => handleMethodChange("Video_call")}
                    onClick={()=> setAcceptedFess(fess.videoCall)}
                  />
                  <span className="radio-tile">
                    <span className="radio-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                        <defs>
                          <style>

                          </style>
                        </defs>
                        <g id="Layer_2" data-name="Layer 2">
                          <path className="cls-1" d="M11.92,52H36.23a7.86,7.86,0,0,0,7.86-7.86V19.89A7.86,7.86,0,0,0,36.23,12H11.92A7.92,7.92,0,0,0,4,19.95V44.05A7.92,7.92,0,0,0,11.92,52ZM36,18a2,2,0,1,1-2,2A2,2,0,0,1,36,18Z" />
                          <path className="cls-1" d="M60,43.76V20.24a2.64,2.64,0,0,0-3.85-2.35l-6.32,3.24A3.27,3.27,0,0,0,48.06,24V40a3.27,3.27,0,0,0,1.77,2.9l6.32,3.25A2.64,2.64,0,0,0,60,43.76Z" />
                        </g>
                      </svg>
                    </span>
                    <span className="radio-label" onClick={()=> setAcceptedFess(fess.videoCall)}>Video call</span>
                    <span className="radio-label">{fess.videoCall}</span>
                  </span>
                </label>
                <label>
                  <input
                    className="radio-input"
                    type="radio"
                    name="method"
                    value="In Clinic"
                    checked={selectedMethod === "In_Clinic"}
                    onChange={() => handleMethodChange("In_Clinic")}
                    onClick={()=> setAcceptedFess(fess.inClinic)}
                  />
                  <span className="radio-tile">
                    <span className="radio-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
                        <path d="m66.57 54.617c-4.8047 3.0117-10.488 4.7578-16.57 4.7578-6.0859 0-11.762-1.7422-16.555-4.7734-1.4922-0.96094-3.2539-1.4766-5.0508-1.4766h-0.27344c-8.6289 0-15.625 6.9961-15.625 15.625v12.5c0 4.1445 1.6484 8.1172 4.5742 11.051 2.9297 2.9297 6.9062 4.5742 11.051 4.5742h43.75c4.1445 0 8.1172-1.6484 11.051-4.5742 2.9297-2.9297 4.5742-6.9062 4.5742-11.051v-12.5c0-8.6289-6.9961-15.625-15.625-15.625-0.17578 0-0.34766 0.007812-0.51953 0.023438-1.6836 0.039062-3.3438 0.55078-4.7852 1.4688zm-16.57-51.492c-13.797 0-25 11.203-25 25s11.203 25 25 25 25-11.203 25-25-11.203-25-25-25z" fillRule="evenodd" />
                      </svg>
                    </span>
                    <span className="radio-label"  >In Clinic</span>
                    <span className="radio-label">{fess.inClinic}</span>
                  </span>
                </label>

              </div>
            </div>
          </div>

        </section>
        <div className='client-bookAppoinment-popup-submit'>
          <div className="client-bookappoinment-terms" >
            <input type="checkbox" id="terms" name="terms" checked={isTermsAccepted} onChange={(e) => setIsTermsAccepted(e.target.checked)} />
            <label htmlFor="vehicle1"> accept terms and condition,click <Link style={{ color: 'blue' }} to={temrsandcondtion}>here</Link> to read them
            </label>
          </div>
          <React.Fragment>
            <button onClick={handleClickOpen} className='client-bookAppoinment-Payment '>Payment</button>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              maxWidth='40vw'
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Checkout"}</DialogTitle>
              <DialogContent>
                <div className="font-[sans-serif] bg-white p-4 min-h-screen">
                  <div className="lg:max-w-6xl max-w-xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 max-lg:order-1">
                        <h2 className="text-3xl font-extrabold text-[#333]">Make a payment</h2>
                        <p className="text-[#333] text-base mt-6">Complete your transaction swiftly and securely with our easy-to-use payment process.</p>
                        <form className="mt-12 max-w-lg">
                          <div className="grid gap-6">
                            <input type="text" placeholder="Cardholder's Name"
                              className="px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-purple-500 outline-none" />
                            <div className="flex bg-gray-100 border rounded-md focus-within:border-purple-500 overflow-hidden">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 ml-3" viewBox="0 0 32 20">
                                <circle cx="10" cy="10" r="10" fill="#f93232" data-original="#f93232" />
                                <path fill="#fed049"
                                  d="M22 0c-2.246 0-4.312.75-5.98 2H16v.014c-.396.298-.76.634-1.107.986h2.214c.308.313.592.648.855 1H14.03a9.932 9.932 0 0 0-.667 1h5.264c.188.324.365.654.518 1h-6.291a9.833 9.833 0 0 0-.377 1h7.044c.104.326.186.661.258 1h-7.563c-.067.328-.123.66-.157 1h7.881c.039.328.06.661.06 1h-8c0 .339.027.67.06 1h7.882c-.038.339-.093.672-.162 1h-7.563c.069.341.158.673.261 1h7.044a9.833 9.833 0 0 1-.377 1h-6.291c.151.344.321.678.509 1h5.264a9.783 9.783 0 0 1-.669 1H14.03c.266.352.553.687.862 1h2.215a10.05 10.05 0 0 1-1.107.986A9.937 9.937 0 0 0 22 20c5.523 0 10-4.478 10-10S27.523 0 22 0z"
                                  className="hovered-path" data-original="#fed049" />
                              </svg>
                              <input type="number" placeholder="Card Number"
                                className="px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                              <input type="number" placeholder="EXP."
                                className="px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-purple-500 outline-none" />
                              <input type="number" placeholder="CVV"
                                className="px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-purple-500 outline-none" />
                            </div>
                          </div>
                          <button type="button" className="mt-6 w-40 py-3.5 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600" onClick={handleSubmit}>Submit</button>
                        </form>
                      </div>
                      <div className="bg-gray-100 p-6 rounded-md">
                        <h2 className="text-4xl font-extrabold text-[#333]">{acceptedFess}</h2>
                        <ul className="text-[#333] mt-10 space-y-6">
                          <li className="flex flex-wrap gap-4 text-base">Date <span className="ml-auto font-bold">{selectedDate.getDate()} {selectedDate.toLocaleDateString('en-US', { month: 'long', },)}</span></li>
                          <li className="flex flex-wrap gap-4 text-base">Time <span className="ml-auto font-bold">{selectedTimeSlot}</span></li>
                          <li className="flex flex-wrap gap-4 text-base">Method <span className="ml-auto font-bold">{selectedMethod}</span></li>
                          <li className="flex flex-wrap gap-4 text-base">Amount <span className="ml-auto font-bold">{acceptedFess}</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </React.Fragment>
        </div>

      </section>
    </>
  );
}

export default BookAppointmentPopUp;