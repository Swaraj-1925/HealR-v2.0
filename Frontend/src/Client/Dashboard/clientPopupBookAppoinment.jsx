/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import './style/clientPopupBookAppoinment.css';
import { useEffect, useState } from 'react';

function BookAppointmentPopUp( { toggle }) {



  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([
    { time: '10:00 AM' },
    { time: '11:00 AM' },
    { time: '1:00 PM' },
    { time: '2:00 PM' }, 
    { time: '3:00 PM' },
    { time: '4:00 PM' },
    { time: '5:00 PM' },

  ]);

  // eslint-disable-next-line no-unused-vars
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const getCalendarDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const calendarDays = [];

    // Add calendar days for today and the next 29 days
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

    const isSelected = selectedDate.getDate() === dayObj.date.getDate() &&
      selectedDate.getMonth() === dayObj.date.getMonth() &&
      selectedDate.getFullYear() === dayObj.date.getFullYear();
    const selectedDateStyle = isSelected ? { backgroundColor: 'blue', color: 'white' } : {};
    return (
      <div key={dayObj.date} className={`Bookappoinment-calender-calendar-day${isSelected ? ' selected' : ''} `} style={selectedDateStyle} onClick={() => handleDateClick(dayObj.date)}>
        <div className="Bookappoinment-calender-day-name">{dayObj.dayName}</div>
        <div className="Bookappoinment-calender-date">{dayObj.date.getDate()}</div>
      </div>
    );
  };

  // section of time slots code



  const handleTimeSlotChange = (timeSlot) => {
    setSelectedTimeSlot(timeSlot); // Update selected time slot
  };

  const getAvailableTimeSlots = () => {
    // Replace this logic with your own to filter available time slots based on selected date
    return availableTimeSlots.filter(slot => {
      // For demonstration, let's assume all slots are available for the selected date
      return true;
    });
  };
  console.log(selectedTimeSlot);
  // 
  const handleClose = () => {
    toggle(); // Call the toggle function passed as prop to close the pop-up
  };

  return (
    <>
      <section className="client-bookAppoinment-popup-wrapper">

        <section className=" client-bookAppoinment-popup-wrapperItem bookAppoinment-calender-section">

          <div className="client-Bookappoinment-calender-gridcontainer">
            <div className="Bookappoinment-calender-gridcontainer-calendar-month">
              <h2>{selectedDate.toLocaleDateString('en-US', { month: 'long', })}</h2>
              {/* <h2>Selected Date: {selectedDate.getDate()}</h2> */}
            </div>
            <div className="Bookappoinment-calender-gridcontainer-calendar-datesWeek">
              {getCalendarDays(selectedDate).map(renderCalendarDay)}
            </div>
          </div>
        </section>

        <section className="client-bookAppoinment-popup-wrapperItem bookAppoinment-availabletime-section">

          <h3>Available Time Slots for {selectedDate.getDate()} {selectedDate.toLocaleDateString('en-US', { month: 'long', },)}</h3>
          <div className="client-Bookappoinment-availabledate-gridcontainer">
            {getAvailableTimeSlots().map((slot, index) => (
              <div key={index} className="availabledate-grid-button">
                <input type="radio" id={`timeSlot${index}`} name="timeSlot" value={slot.time} checked={selectedTimeSlot === slot.time} onChange={() => handleTimeSlotChange(slot.time)} />
                <label htmlFor={`timeSlot${index}`}>{slot.time}</label>
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
                  <input className="radio-input" type="radio" name="engine" />
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
                    <span className="radio-label">Message</span>
                    <span className="radio-label">200</span>
                  </span>
                </label>
                <label>
                  <input className="radio-input" type="radio" name="engine" />
                  <span className="radio-tile">
                    <span className="radio-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M21.384,17.752a2.108,2.108,0,0,1-.522,3.359,7.543,7.543,0,0,1-5.476.642C10.5,20.523,3.477,13.5,2.247,8.614a7.543,7.543,0,0,1,.642-5.476,2.108,2.108,0,0,1,3.359-.522L8.333,4.7a2.094,2.094,0,0,1,.445,2.328A3.877,3.877,0,0,1,8,8.2c-2.384,2.384,5.417,10.185,7.8,7.8a3.877,3.877,0,0,1,1.173-.781,2.092,2.092,0,0,1,2.328.445Z" />
                      </svg>
                    </span>
                    <span className="radio-label">Message</span>
                    <span className="radio-label">200</span>
                  </span>
                </label>



                <label>
                  <input className="radio-input" type="radio" name="engine" />
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
                    <span className="radio-label">Video call</span>
                    <span className="radio-label">200</span>
                  </span>
                </label>
                <label>
                  <input className="radio-input" type="radio" name="engine" />
                  <span className="radio-tile">
                    <span className="radio-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
                        <path d="m66.57 54.617c-4.8047 3.0117-10.488 4.7578-16.57 4.7578-6.0859 0-11.762-1.7422-16.555-4.7734-1.4922-0.96094-3.2539-1.4766-5.0508-1.4766h-0.27344c-8.6289 0-15.625 6.9961-15.625 15.625v12.5c0 4.1445 1.6484 8.1172 4.5742 11.051 2.9297 2.9297 6.9062 4.5742 11.051 4.5742h43.75c4.1445 0 8.1172-1.6484 11.051-4.5742 2.9297-2.9297 4.5742-6.9062 4.5742-11.051v-12.5c0-8.6289-6.9961-15.625-15.625-15.625-0.17578 0-0.34766 0.007812-0.51953 0.023438-1.6836 0.039062-3.3438 0.55078-4.7852 1.4688zm-16.57-51.492c-13.797 0-25 11.203-25 25s11.203 25 25 25 25-11.203 25-25-11.203-25-25-25z" fillRule="evenodd" />
                      </svg>
                    </span>
                    <span className="radio-label">In Clinic</span>
                    <span className="radio-label">200</span>
                  </span>
                </label>

              </div>
            </div>
          </div>

        </section>

        <button className='client-bookAppoinment-Payment '>Payment</button>
        <button className='client-bookAppoinment-popupClose 'onClick={handleClose}>&#10006;</button>
      </section>
    </>
  );
}

export default BookAppointmentPopUp;