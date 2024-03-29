import './style/clientPopupBookAppoinment.css';
import { useState } from 'react';
function BookAppointmentPopUp() {

  const [selectedDate, setSelectedDate] = useState(new Date());

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

    let fewSeatsLeft = false; // Replace with your logic to check seat availability
    const fewSeatsLeftClass = fewSeatsLeft ? ' few-seats-left' : '';

    return (
      <div key={dayObj.date} className={`Bookappoinment-calender-calendar-day${isSelected ? ' selected' : ''}${fewSeatsLeftClass}`} onClick={() => handleDateClick(dayObj.date)}>
      <div className="Bookappoinment-calender-day-name">{dayObj.dayName}</div>
      <div className="Bookappoinment-calender-date">{dayObj.date.getDate()}</div>
  </div>
    );
  };



  return (
    <>
      <section className="client-bookAppoinment-popup-wrapper">

        <section className=" client-bookAppoinment-popup-wrapperItem bookAppoinment-calender-section">

          <div className="client-Bookappoinment-calender-gridcontainer">

            <div className="Bookappoinment-calender-gridcontainer-calendar-month">

              <h2>{selectedDate.toLocaleDateString('en-US', { month: 'long', })}</h2>

              <h2>Selected Date: {selectedDate.getDate()}</h2>
            </div>
            <div className="Bookappoinment-calender-gridcontainer-calendar-datesWeek">
              
              {getCalendarDays(selectedDate).map(renderCalendarDay)}
            </div>


          </div>

        </section>
        <section className="client-bookAppoinment-popup-wrapperItem bookAppoinment-availabledate-section">
          a
          <div className="client-Bookappoinment-availabledate-gridcontainer">

          </div>

        </section>

        <section className="client-bookAppoinment-popup-wrapperItem bookAppoinment-typeOfTherapy-section">
          z
          <div className="client-Bookappoinment-typeOfTherapy-gridcontainer">

          </div>

        </section>

      </section>
    </>
  );
}

export default BookAppointmentPopUp;