/* eslint-disable react/prop-types */
import { useState } from "react";

const OrderItem = ({ order, onAddReview, onConfirmDelivery, onViewOrder }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(order?.order?.trackingNumber || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  const trackingUrl = order?.order?.tracking
    ? `https://trackingwebsite.com/track/${order.order.tracking}`
    : "#";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4 w-full sm:max-w-4xl flex gap-8">
      <div>
        <img
          src={
            import.meta.env.VITE_APP_API_URL +
            (order.product?.images[0]?.image ?? "uploads/products/default.png")
          }
          alt={order.product?.name || "Product Image"}
          className="mb-4 w-48 h-48 object-cover rounded-lg"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">
          {order.product?.name || "Product Name"}
        </h2>
        <p className="mb-2">Status: {order?.order?.status || "Unknown"}</p>

        {order?.order?.tracking && (
          <div className="mb-4">
            <p className="mb-2">
              Tracking Number:{" "}
              <span className="font-semibold">
                {order?.order?.trackingNumber}
              </span>
            </p>
            <button
              onClick={handleCopy}
              className="bg-gray-300 text-gray-800 px-2 py-1 rounded-lg mr-2 hover:bg-gray-400"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <a
              href={trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Track Package
            </a>
          </div>
        )}

        <div className="mb-2">
          Rating:{" "}
          {[...Array(order?.review?.rating || 0)].map((_, i) => (
            <span key={i} className="text-yellow-500">
              ★
            </span>
          ))}
          {[...Array(5 - (order?.review?.rating || 0))].map((_, i) => (
            <span key={i} className="text-gray-300">
              ★
            </span>
          ))}
        </div>

        <div className="flex justify-between gap-8">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => onViewOrder(order)}
          >
            View Order
          </button>
          {order?.order?.status === "SHIPPED" && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              onClick={() => onConfirmDelivery(order)}
            >
              Confirm Delivery
            </button>
          )}

          {order?.order?.status === "DELIVERED" && !order?.review && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => onAddReview(order)}
            >
              Add Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
