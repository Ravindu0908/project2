import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Icon } from "@iconify/react"; // Adjust import if necessary

const SalaryTable = () => {
  const [beauticians, setBeauticians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBeautician, setSelectedBeautician] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBeauticians = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/beauticians");
      setBeauticians(response.data.beauticians); 
    } catch (error) {
      toast.error(
        "Error fetching beauticians: " +
          (error.response?.data?.error || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeauticians();
  }, []);

  const handlePaySalary = async (beauticianId) => {
    try {
      const response = await axios.post(`/admin/salary/pay/${beauticianId}`, { beauticianId });

      if (response.status === 200) {
        toast.success(`Salary paid successfully.`);
        fetchBeauticians(); // Refresh beautician list after payment
      }
    } catch (error) {
      toast.error(
        "Error paying salary: " +
          (error.response?.data?.error || error.message)
      );
    } finally {
      setIsModalOpen(false);
      setSelectedBeautician(null);
    }
  };

  const openModal = (beautician) => {
    setSelectedBeautician(beautician);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBeautician(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!beauticians.length) {
    return <p>No beauticians found.</p>;
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border border-separate rounded border-slate-200">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="h-12 px-6 text-sm font-medium bg-pink-100">Name</th>
            <th className="h-12 px-6 text-sm font-medium bg-pink-100">Month</th>
            <th className="h-12 px-6 text-sm font-medium bg-pink-100">Salary</th>
            {/* <th className="h-12 px-6 text-sm font-medium bg-pink-100">Paid Status</th> */}
            <th className="h-12 px-6 text-sm font-medium bg-pink-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {beauticians.map((beautician, index) => (
            <tr key={index} className="border-b border-slate-200">
              <td className="h-12 px-6 text-sm">{beautician.user.firstName} {beautician.user.lastName}</td>
              <td className="h-12 px-6 text-sm">{new Date().toLocaleString('default', { month: 'long' })}</td>
              <td className="h-12 px-6 text-sm">{beautician.currentSalary}</td>
              {/* <td className="h-12 px-6 text-sm">
                {beautician.isPaid ? "Paid" : "Pending"}
              </td> */}
              <td className="h-12 px-6 text-sm">
                {!beautician.isPaid && (
                  <button
                    onClick={() => openModal(beautician)}
                    className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Pay
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pay Confirmation Modal */}
      {isModalOpen && selectedBeautician && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-bold">Confirm Salary Payment</h2>
            <p>Are you sure you want to pay salary to {selectedBeautician.user.firstName} {selectedBeautician.user.lastName}?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handlePaySalary(selectedBeautician.id)}
                className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
              >
                Confirm
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

export default SalaryTable;
