import axios from "axios";
import { useState } from "react";

const ReviewPopupAppointment = ({ appointment, onClose, getAppointments }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  // Check if appointment and its service are defined
  const serviceName = appointment?.service?.name || "Service";

  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async () => {
    if (appointment?.id) {
      await axios
        .post(`/client/appointments/review/${appointment.id}`, {
          rating,
          comment: message,
        })
        .then(() => {
          getAppointments();
          alert("Review submitted successfully");
        })
        .catch(() => {
          alert("Failed to submit review");
        })
        .finally(() => {
          onClose();
        });
    } else {
      alert(appointment);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">
          Add Review for {serviceName}
        </h2>
        <div className="mb-4">
          <p className="mb-2">Rating:</p>
          <div>
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`cursor-pointer ${
                  i < rating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => handleRatingClick(i + 1)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            placeholder="Write your review..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopupAppointment;
