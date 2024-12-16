/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import axios from "axios";
import UpdateService from "./UpdateServices";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ServiceTable({ services, getServices }) {
  const [isUpdateService, setUpdateService] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const updateService = (service) => {
    setSelectedService(service);
    setUpdateService(true);
  };

  const closeUpdateService = () => {
    setSelectedService(null);
    setUpdateService(false);
  };

  const confirmDeleteService = (serviceId) => {
    setServiceToDelete(serviceId);
    setShowDeleteConfirmation(true);
  };

  const deleteService = async () => {
    try {
      await axios.delete(`/admin/services/${serviceToDelete}`);
      getServices();
      toast.success("Service deleted successfully!");
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the service!");
    }
  };

  return (
    <>
      <table
        className="w-full text-left border border-separate rounded border-slate-200"
        cellSpacing="0"
      >
        <thead>
          <tr>
            <th className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100">
              Title
            </th>
            <th className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100">
              Beautician
            </th>
            <th className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100">
              Description
            </th>
            <th className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100">
              Price (LKR)
            </th>
            <th className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {services?.map((service) => (
            <tr
              key={service.id}
              className="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none"
            >
              <td
                data-th="title"
                className="flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500"
              >
                {service.name}
              </td>
              <td
                data-th="subtitle"
                className="flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500"
              >
                {service.service.map((s, index) => (
                  <span key={index}>
                    {s.beautician.user.firstName} {s.beautician.user.lastName}
                    {index < service.service.length - 1 && ", "}
                  </span>
                ))}
              </td>
              <td
                data-th="description"
                className="flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500"
              >
                {service.description}
              </td>
              <td
                data-th="price"
                className="flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500"
              >
                {service.price}
              </td>
              <td
                data-th="actions"
                className="flex items-center sm:table-cell h-12 px-6 text-xl transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 justify-between"
              >
                <button
                  className="bg-pink-600 text-red-100 px-2 py-2 rounded-lg mx-1"
                  onClick={() => updateService(service)}
                >
                  <Icon icon="dashicons:update" />
                </button>
                {isUpdateService && (
                  <UpdateService
                    closeUpdateService={closeUpdateService}
                    service={selectedService}
                    serviceId={selectedService?.id}
                    getServices={getServices}
                  />
                )}
                <button
                  onClick={() => confirmDeleteService(service.id)}
                  className="bg-red-500 text-red-100 px-2 py-2 rounded-lg mx-1"
                >
                  <Icon icon="material-symbols:delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this service?
            </h2>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={deleteService}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
