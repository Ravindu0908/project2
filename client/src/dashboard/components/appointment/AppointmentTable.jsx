/* eslint-disable react/prop-types */
import { useState } from "react";
import ConfirmationPopup from "./ConfirmationPopup";
import axios from "axios";

export default function AppointmentsTable({ appointments, getAppointments }) {
  const [showPopup, setShowPopup] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const handleCancelClick = (id) => {
    setActiveId(id);
    setShowPopup(true);
  };

  const handleConfirm = async () => {
    await axios
      .delete(`/admin/appointments/${activeId}`)
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

  const handleCancelPopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <ConfirmationPopup
          message="Are you sure you want to cancel this appointment?"
          onConfirm={handleConfirm}
          onCancel={handleCancelPopup}
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
            return (
              <tr
                key={index}
                className="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none"
              >
                <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                  {beautician?.user?.firstName} {beautician?.user?.lastName}
                </td>
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
                  {appointment?.status === "RESERVED" && (
                    <button
                      onClick={() => handleCancelClick(appointment?.id)}
                      className="bg-red-500 text-red-100 px-2 py-1 rounded-lg mx-1"
                    >
                      Cancel
                    </button>
                  )}
                  {appointment?.status !== "RESERVED" && (
                    <span className="text-gray-500 capitalize">
                      {appointment?.status?.toLowerCase()}
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
