/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const UpdateOrder = ({ order, closeUpdateOrder, getOrders }) => {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to update the order status and tracking number
      await axios.post(`/admin/orders/shipped/${order.id}`, {
        tracking: trackingNumber,
      });
      getOrders(); // Refresh the product list after updating
      closeUpdateOrder(); // Close the update order modal
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleTrackingNumberChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  return (
    <div className="absolute z-10 top-5 mt-[-50px] bottom-5  overflow-auto bg-white p-8 sm:mx-auto sm:w-full sm:max-w-4xl shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="trackingNumber"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Tracking Number
        </label>
        <div className="mt-2">
          <input
            id="trackingNumber"
            name="trackingNumber"
            type="text"
            autoComplete="trackingNumber"
            required
            value={trackingNumber}
            onChange={handleTrackingNumberChange}
            className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg left-2"
            type="submit"
          >
            Mark as Shipped
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg left-2"
            onClick={closeUpdateOrder}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOrder;
