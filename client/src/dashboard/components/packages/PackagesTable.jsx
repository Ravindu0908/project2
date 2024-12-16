/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import axios from "axios";
import { useState } from "react";
import UpdatePackages from "./UpdatePackages";

export default function PackagesTable({ packages, getPackages }) {
  const [isUpdatePackage, setUpdatePackage] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const updatePackage = (packageItem) => {
    setSelectedPackage(packageItem);
    setUpdatePackage(true);
  };

  const closeUpdatePackage = () => {
    setSelectedPackage(null);
    setUpdatePackage(false);
  };

  const confirmDelete = (packageId) => {
    setSelectedPackageId(packageId);
    setShowDeleteConfirmation(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setSelectedPackageId(null);
  };

  const deletePackage = async () => {
    try {
      await axios.delete(`/admin/packages/${selectedPackageId}`);
      getPackages();
      alert("Package deleted successfully");
      setShowDeleteConfirmation(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <table className="w-full text-left border border-separate rounded border-slate-200" cellSpacing="0">
        <thead>
          <tr>
            <th className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 text-slate-700 bg-pink-100">Title</th>
            <th className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 text-slate-700 bg-pink-100">Description</th>
            <th className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 text-slate-700 bg-pink-100">Services</th>
            <th className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 text-slate-700 bg-pink-100">Branches</th>
            <th className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 text-slate-700 bg-pink-100">Normal Price (LKR)</th>
            <th className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 text-slate-700 bg-pink-100">Discounted Price (LKR)</th>
            <th className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 text-slate-700 bg-pink-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages?.map((packageItem) => (
            <tr key={packageItem.id} className="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none">
              <td className="flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 text-slate-500">
                {packageItem.name}
              </td>
              <td className="flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 text-slate-500">
                {packageItem.description}
              </td>
              <td className="flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 text-slate-500">
                {packageItem.services.map((s) => s.service.name).join(", ") || "No services"}
              </td>
              <td className="flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 text-slate-500">
                {packageItem.branches.map((b) => b.branch).join(", ") || "No branches"}
              </td>
              <td className="flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 text-slate-500">
                {packageItem.normalPrice}
              </td>
              <td className="flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 text-slate-500">
                {packageItem.discountedPrice}
              </td>
              <td className="flex items-center sm:table-cell h-12 px-6 text-xl transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 justify-between">
                <button className="bg-pink-600 text-red-100 px-2 py-2 rounded-lg mx-1" onClick={() => updatePackage(packageItem)}>
                  <Icon icon="dashicons:update" />
                </button>

                {isUpdatePackage && (
                  <UpdatePackages
                    closeUpdatePackage={closeUpdatePackage}
                    packag={selectedPackage}
                    getPackages={getPackages}
                  />
                )}

                <button className="bg-red-500 text-red-100 px-2 py-2 rounded-lg mx-1" onClick={() => confirmDelete(packageItem.id)}>
                  <Icon icon="material-symbols:delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Are you sure you want to delete this package?</p>
            <div className="mt-4 flex justify-end">
              <button onClick={cancelDelete} className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2">Cancel</button>
              <button onClick={deletePackage} className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
