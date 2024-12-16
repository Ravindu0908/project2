/* eslint-disable react/prop-types */
import { useState } from "react";

const ReviewPopup = ({ order, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  const handleSubmit = () => {
    onSubmit(order.orderId, order.productId, rating, message);
    onClose();
  };

  // Ensure order.product is a string or adjust accordingly
  const productDisplayName =
    typeof order.product === "string" ? order.product : "Product";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">
          Add Review for {productDisplayName}
        </h2>
        <div className="mb-4">
          <p className="mb-2">Rating:</p>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`cursor-pointer text-2xl ${
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
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
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

export default ReviewPopup;
