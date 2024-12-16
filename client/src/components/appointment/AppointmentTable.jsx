import { useCallback, useEffect, useState } from "react";
import ConfirmationPopup from "./ConfirmationPopup";
import axios from "axios";

export default function AppointmentsTable() {
  const [appointments, setAppointments] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [showFinishPopup, setShowFinishPopup] = useState(false);

  const timeSlotMap = {
    SLOT_1_8AM_9AM: 9,
    SLOT_2_9AM_10AM: 10,
    SLOT_3_10AM_11AM: 11,
    SLOT_4_11AM_12PM: 12,
    SLOT_5_1PM_2PM: 14,
    SLOT_6_2PM_3PM: 15,
    SLOT_7_3PM_4PM: 16,
    SLOT_8_4PM_5PM: 17,
    SLOT_9_5PM_6PM: 18,
  };

  const getAppointments = useCallback(async () => {
    axios
      .get("/beautician/appointments")
      .then((res) => {
        setAppointments(res.data.appointments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [activeId, setActiveId] = useState(null);

  const handleCancelClick = (id) => {
    setActiveId(id);
    setShowPopup(true);
  };

  const handleFinishClick = (id) => {
    setActiveId(id);
    setShowFinishPopup(true);
  };

  const handleConfirm = async () => {
    await axios
      .delete(`/beautician/appointments/${activeId}`)
      .then(async (res) => {
        alert(res.data?.message);
        await getAppointments();
        setActiveId(null);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowPopup(false);
      });
  };

  const handleFinishConfirm = async (id) => {
    await axios
      .post(`/beautician/appointments/${id}`)
      .then(async (res) => {
        alert(res.data?.message);
        await getAppointments();
        setActiveId(null);
        setShowFinishPopup(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancelPopup = () => {
    setShowPopup(false);
  };

  const checkTimeSlotIsPassed = (date, timeSlot) => {
    const currentTime = new Date();
    const selectedTime = new Date(date);
    selectedTime.setHours(timeSlotMap[timeSlot]);
    return currentTime > selectedTime;
  };

  useEffect(() => {
    getAppointments();
  }, [getAppointments]);

  return (
    <>
      {showPopup && (
        <ConfirmationPopup
          message="Are you sure you want to cancel this appointment?"
          onConfirm={handleConfirm}
          onCancel={handleCancelPopup}
        />
      )}

      {showFinishPopup && (
        <ConfirmationPopup
          message="Are you sure you want to mark this appointment as completed?"
          onConfirm={() => handleFinishConfirm(activeId)}
          onCancel={() => setShowFinishPopup(false)}
        />
      )}

      <table
        className="w-full text-left border border-separate rounded border-slate-200"
        cellSpacing="0"
      >
        <thead>
          <tr>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              Client Name
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              Date
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              Time Slot
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              Branch
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              Service
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((appointment, index) => {
            const client = appointment?.user;
            const beautician = appointment?.service?.beautician;
            const service = appointment?.service?.service;
            const status = appointment?.status;
            return (
              <tr
                key={index}
                className="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none"
              >
                <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                  {client?.firstName} {client?.lastName}
                </td>
                <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                  {new Date(appointment?.date).toDateString()}
                </td>
                <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                  {appointment?.timeSlot.replaceAll("_", " ").toLowerCase()}
                </td>
                <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                  {beautician?.branch}
                </td>
                <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                  {service?.name}
                </td>
                <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-xl transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 justify-between">
                  {status === "RESERVED" &&
                    !checkTimeSlotIsPassed(
                      appointment?.date,
                      appointment?.timeSlot
                    ) && (
                      <button
                        onClick={() => handleCancelClick(appointment?.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-lg mx-1"
                      >
                        Cancel
                      </button>
                    )}

                  {status === "RESERVED" &&
                    checkTimeSlotIsPassed(
                      appointment?.date,
                      appointment?.timeSlot
                    ) && (
                      <button
                        onClick={() => handleFinishClick(appointment?.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded-lg mx-1"
                      >
                        Mark as Completed
                      </button>
                    )}

                  {status !== "RESERVED" && (
                    <span className="text-gray-500 capitalize">
                      {status.toLowerCase()}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
