import { useState } from "react";
import axios from "axios";

const LeaveRequestModal = ({ isOpen, onClose, showToast }) => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required.";
    }
    if (!formData.endDate) {
      newErrors.endDate = "End date is required.";
    } else if (new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = "End date cannot be before start date.";
    }
    if (!formData.reason.trim()) {
      newErrors.reason = "Reason is required.";
    }
    return newErrors;
  };

  const submitLeaveRequest = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast("Please fix the errors in the form.", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/beautician/leave", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        showToast("Leave request applied successfully.", "success");
        onClose();
      }
    } catch (error) {
      showToast(
        "Error applying leave: " +
          (error.response?.data?.error || "Something went wrong!"),
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-pink-700">Apply for Leave</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className={`peer block w-full appearance-none border rounded-lg border-pink-400 bg-transparent py-1.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0 ${errors.startDate ? 'border-red-600' : ''}`}
            />
            {errors.startDate && <p className="text-red-600 text-sm">{errors.startDate}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className={`peer block w-full appearance-none border rounded-lg border-pink-400 bg-transparent py-1.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0 ${errors.endDate ? 'border-red-600' : ''}`}
            />
            {errors.endDate && <p className="text-red-600 text-sm">{errors.endDate}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              className={`peer block w-full appearance-none border rounded-lg border-pink-400 bg-transparent py-1.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0 ${errors.reason ? 'border-red-600' : ''}`}
            />
            {errors.reason && <p className="text-red-600 text-sm">{errors.reason}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={submitLeaveRequest}
              className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequestModal;
