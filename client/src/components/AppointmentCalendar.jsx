/* eslint-disable react/prop-types */
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles
import "./custom-calendar.css"; // Import custom styles

const AppointmentCalendar = ({ date, handleDateChange }) => {

  return (
    <div className="bg-white drop-shadow-md rounded-xl p-4 ">
      <h2 className="text-xl font-bold mb-4">Appointment Schedule</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        defaultValue={new Date()}
        minDate={new Date()}
      />
      <p className="mt-4">Selected Date: {date.toDateString()}</p>
    </div>
  );
};

export default AppointmentCalendar;
