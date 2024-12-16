/* eslint-disable react/prop-types */

import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const timeSlotMap = {
  SLOT_1_8AM_9AM: "8:00 AM - 9:00 AM",
  SLOT_2_9AM_10AM: "9:00 AM - 10:00 AM",
  SLOT_3_10AM_11AM: "10:00 AM - 11:00 AM",
  SLOT_4_11AM_12PM: "11:00 AM - 12:00 PM",
  SLOT_5_1PM_2PM: "1:00 PM - 2:00 PM",
  SLOT_6_2PM_3PM: "2:00 PM - 3:00 PM",
  SLOT_7_3PM_4PM: "3:00 PM - 4:00 PM",
  SLOT_8_4PM_5PM: "4:00 PM - 5:00 PM",
  SLOT_9_5PM_6PM: "5:00 PM - 6:00 PM",
};
const NotificationList = ({ date }) => {
  const [notifications, setNotifications] = useState([]);

  // load notifications
  const loadNotifications = useCallback(async () => {
    await axios
      .get(`/beautician/appointments/${date}`)
      .then((response) => {
        setNotifications(response.data.appointments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [date]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications, date]);

  return (
    <div className="bg-white drop-shadow-md rounded-xl p-4 w-full">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      <ul className="list-disc pl-5">
        {notifications?.map((notification, id) => {
          const client =
            notification.user.firstName + " " + notification.user.lastName;
          const service = notification.service.name;
          const timeSlot = timeSlotMap[notification.timeSlot];
          return (
            <li key={id} className="mb-2">
              You have an appointment with {client} for {service} at {timeSlot}.
            </li>
          );
        })}
        {/* if no notifications found */}
        {(!notifications || notifications?.length === 0) && (
          <li className="text-gray-500 list-none">No notifications found.</li>
        )}
      </ul>
    </div>
  );
};

export default NotificationList;
