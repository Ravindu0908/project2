import { useCallback, useEffect, useState } from "react";
import ConfirmationPopupClient from "./ConfirmationPopupClient";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReviewPopupAppoinment from "./ReviewPopup ";

export default function AppointmentsTableClient() {
  const [appointments, setAppointments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Fetch appointments
  const getAppointments = useCallback(async () => {
    try {
      const res = await axios.get("/client/appointments");
      setAppointments(res.data.appointments);
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Handle Cancel Click
  const handleCancelClick = (id) => {
    setActiveId(id);
    setShowPopup(true);
  };

  // Handle Confirm Cancellation
  const handleConfirm = async () => {
    try {
      const res = await axios.delete(`/client/appointments/${activeId}`);
      toast.success(res.data?.message);
      await getAppointments();
    } catch (err) {
      toast.error("Failed to cancel appointment");
      console.log(err);
    } finally {
      setShowPopup(false);
      setActiveId(null);
    }
  };

  // Handle Cancel Popup
  const handleCancelPopup = () => {
    setShowPopup(false);
  };

  // Handle Review Click
  const handleReviewClick = (id) => {
    setActiveId(id);
    setShowReviewPopup(true);
  };

  // Handle Close Review Popup
  const handleCloseReviewPopup = () => {
    setShowReviewPopup(false);
  };

  useEffect(() => {
    getAppointments();
  }, [getAppointments]);

  return (
    <>
      <ToastContainer />
      {showPopup && (
        <ConfirmationPopupClient
          message="Are you sure you want to cancel this appointment?"
          onConfirm={handleConfirm}
          onCancel={handleCancelPopup}
        />
      )}
      {showReviewPopup && (
        <ReviewPopupAppoinment
          appointment={selectedAppointment}
          onClose={handleCloseReviewPopup}
          getAppointments={getAppointments}
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
              Beautician Name
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
              Status
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
            const beautician = appointment?.service?.beautician;
            const service = appointment?.service?.service;
            const status = appointment?.status;
            return (
              <tr
                key={index}
                className="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none"
              >
                <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                  {beautician?.user?.firstName} {beautician?.user?.lastName}
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
                <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                  {status}
                </td>
                <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-xl transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 justify-between">
                  {status === "FINISHED" ? (
                    <button
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        handleReviewClick(appointment?.id);
                      }}
                      className="bg-blue-500 text-white px-2 py-1 rounded-lg mx-1"
                    >
                      Review
                    </button>
                  ) : status === "CANCELLED" ? (
                    <button
                      disabled
                      className="bg-gray-500 text-gray-300 px-2 py-1 rounded-lg mx-1"
                    >
                      Canceled
                    </button>
                  ) : (
                    <button
                      onClick={() => handleCancelClick(appointment?.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-lg mx-1"
                    >
                      Cancel
                    </button>
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
