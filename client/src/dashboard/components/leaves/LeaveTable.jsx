import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Icon } from "@iconify/react"; // Adjust import if necessary

const LeaveTable = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [status, setStatus] = useState("approve"); // Default status
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/leaves");
      setLeaves(response.data.leaves); // Assuming your response contains an object with a leaves key
    } catch (error) {
      toast.error(
        "Error fetching leaves: " +
          (error.response?.data?.error || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves(); // Fetch leaves on component mount
  }, []);

  const handleLeaveAction = async (leaveId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/admin/leaves/${status.toLowerCase()}/${leaveId}`
      );

      if (response.status === 200) {
        toast.success(`Leave ${status.toLowerCase()} successfully.`);

        // Refresh leaves after action
        fetchLeaves();
      }
    } catch (error) {
      toast.error(
        "Error updating leave status: " +
          (error.response?.data?.error || error.message)
      );
    } finally {
      setIsModalOpen(false);
      setSelectedLeave(null);
      setStatus("approve"); // Reset status to default
    }
  };

  const openModal = (leave) => {
    setSelectedLeave(leave);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLeave(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!leaves.length) {
    return <p>No leave requests found.</p>;
  }
  const isButtonDisabled =
    selectedLeave &&
    (selectedLeave.status === "APPROVED" ||
      selectedLeave.status === "REJECTED");
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border border-separate rounded border-slate-200">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              Name
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              Start Date
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              End Date
            </th>
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              Reason
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
          {leaves.map((leave, index) => (
            <tr
              key={index}
              className="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none"
            >
              <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                {leave.beautician?.user?.firstName}{" "}
                {leave.beautician?.user?.lastName}
              </td>
              <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                {new Date(leave.startDate).toLocaleDateString()}
              </td>
              <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                {new Date(leave.endDate).toLocaleDateString()}
              </td>
              <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                {leave.reason}
              </td>
              <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                {leave.status}
              </td>
              <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                <button
                  onClick={() => openModal(leave)}
                  className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 border-n"
                  disabled={isButtonDisabled} // Disable if status is already approved or rejected
                >
                  <Icon icon="dashicons:update" />{" "}
                  {/* Use the Icon component here */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-bold">Update Leave Status</h2>
            <div className="mt-4">
              <label htmlFor="status" className="block mb-2">
                Select Status:
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border rounded p-2 w-full"
              >
                <option value="approve">Approve</option>
                <option value="reject">Reject</option>
              </select>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleLeaveAction(selectedLeave.id)}
                className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                disabled={isButtonDisabled} // Disable if status is already approved or rejected
              >
                Submit
              </button>
              <button
                onClick={closeModal}
                className="ml-2 px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default LeaveTable;
