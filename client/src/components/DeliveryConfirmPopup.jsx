/* eslint-disable react/prop-types */
const DeliveryConfirmPopup = ({ order, onClose, onConfirm }) => {
  // Check if order.product is an object and extract a suitable property if necessary
  const productName =
    typeof order.product === "string"
      ? order.product
      : order.product?.name || "Unknown Product";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Confirm Delivery</h2>
        <p className="mb-4">
          Are you sure you want to confirm the delivery for {productName}?
        </p>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={() => onConfirm(order.orderId)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryConfirmPopup;
