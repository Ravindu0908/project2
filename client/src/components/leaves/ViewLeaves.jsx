import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ViewLeaves = ({ beauticianId }) => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch leaves for a specific beautician
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/beautician/leaves`,
          {
            params: { beauticianId }, // Pass beauticianId as a query parameter
          }
        );
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

    if (beauticianId) {
      fetchLeaves();
    }
  }, [beauticianId]); // Fetch leaves when beauticianId changes

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!leaves.length) {
    return <p>No leave requests found.</p>;
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border border-separate rounded border-slate-200">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th
              scope="col"
              className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100"
            >
              #
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
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr
              key={leave.id}
              className="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none"
            >
              <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                {index + 1}
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
            </tr>
          ))}
        </tbody>
      </table>
      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default ViewLeaves;
