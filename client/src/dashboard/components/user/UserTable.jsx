/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";

export default function UserTable({ users, disableUser }) {
  const [showPopup, setShowPopup] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(null);
  const { user: admin } = useSelector((state) => state.user);

  const handleDeleteClick = (index) => {
    setCurrentUserIndex(index);
    setShowPopup(true);
  };

  const handleDeletePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      {/*<!-- Component: Responsive Table --> */}
      <table
        className="w-full text-left border border-separate rounded border-slate-200"
        cellSpacing="0"
      >
        <tbody>
          <tr>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              First Name
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              Last Name
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              Telephone
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              User Role
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              Email
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              Actions
            </th>
          </tr>
          {users?.map((user, index) => (
            <tr
              key={index}
              className="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none"
            >
              <td
                data-th="first_name"
                className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "
              >
                {user.firstName}
              </td>
              <td
                data-th="last_name"
                className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "
              >
                {user.lastName}
              </td>
              <td
                data-th="telephone"
                className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "
              >
                {user.phoneNumber}
              </td>
              <td
                data-th="role"
                className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "
              >
                {user.role}
              </td>
              <td
                data-th="email"
                className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "
              >
                {user.email}
              </td>
              <td
                data-th="actions"
                className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-xl transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 justify-between"
              >
                {/* only show user not a current admin */}
                {admin.email !== user.email && (
                  <button
                    className={`
                    ${user.isDeleted ? "bg-green-500" : "bg-red-500"}
                    text-red-100 px-2 py-2 rounded-lg mx-1`}
                    onClick={() => handleDeleteClick(index)}
                  >
                    {user.isDeleted ? "Enable" : "Disable"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*<!-- End Responsive Table --> */}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
                onClick={handleDeletePopupClose}
              >
                Cancel
              </button>
              <button
                className={`${
                  users[currentUserIndex].isDeleted
                    ? "bg-green-500"
                    : "bg-red-500"
                } text-white px-4 py-2 rounded`}
                onClick={() =>
                  disableUser(users[currentUserIndex].id).then(() => {
                    setShowPopup(false);
                  })
                }
              >
                {users[currentUserIndex].isDeleted ? "Enable" : "Disable"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
