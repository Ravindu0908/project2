import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AttendenceTable = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [beauticians, setBeauticians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBeauticianEmail, setSelectedBeauticianEmail] = useState("");

  // Fetch attendance records based on selected beautician email
  const fetchAttendance = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/admin/attendance/${email}`
      );
      setAttendanceRecords(response.data.attendance || []); // Adjust if necessary
      console.log("Attendance records:", response.data.attendance); // Log the attendance data
    } catch (error) {
      toast.error(
        "Error fetching attendance: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  // Fetch beauticians from the server
  const fetchBeauticians = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/admin/beauticians"
      );
      console.log("Beauticians response:", response.data); // Log the beauticians data
      setBeauticians(response.data.beauticians || []); // Assuming beauticians is under this key
    } catch (error) {
      toast.error(
        "Error fetching beauticians: " +
          (error.response?.data?.error || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch beauticians on component mount
  useEffect(() => {
    fetchBeauticians();
  }, []);

  // Effect to fetch attendance records whenever a beautician is selected
  useEffect(() => {
    if (selectedBeauticianEmail) {
      fetchAttendance(selectedBeauticianEmail);
    }
  }, [selectedBeauticianEmail]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="overflow-x-auto w-full">
      <div className="mb-4">
        <label
          htmlFor="beauticianSelect"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Select Beautician
        </label>
        <select
          id="beauticianSelect"
          value={selectedBeauticianEmail}
          onChange={(e) => setSelectedBeauticianEmail(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        >
          <option value="">Select a beautician</option>
          {Array.isArray(beauticians) &&
            beauticians.map((beautician) => (
              <option key={beautician.id} value={beautician.user.email}>
                {beautician.user.firstName} {beautician.user.lastName}
              </option>
            ))}
        </select>
      </div>

      {attendanceRecords.length > 0 ? (
        <table className="w-full text-left border border-separate rounded border-slate-200">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="h-12 px-6 text-sm font-medium border-l stroke-slate-700 text-slate-700 bg-pink-100">
                Date
              </th>
              <th className="h-12 px-6 text-sm font-medium border-l stroke-slate-700 text-slate-700 bg-pink-100">
                Enter Time
              </th>
              <th className="h-12 px-6 text-sm font-medium border-l stroke-slate-700 text-slate-700 bg-pink-100">
                Leave Time
              </th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record, index) => (
              <tr
                key={index}
                className="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none"
              >
                <td className="flex items-center sm:table-cell h-12 px-6 text-sm text-slate-500">
                  {record.date}
                </td>
                <td className="flex items-center sm:table-cell h-12 px-6 text-sm text-slate-500">
                  {new Date(record.enterTime).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="flex items-center sm:table-cell h-12 px-6 text-sm text-slate-500">
                  {new Date(record.leaveTime).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No attendance records found.</p>
      )}

      <ToastContainer />
    </div>
  );
};

export default AttendenceTable;
