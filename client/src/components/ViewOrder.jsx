/* eslint-disable react/prop-types */
export default function ViewOrder({ product, closeViewOrder }) {
  if (!product) return null;
  const address = product?.order?.address;

  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Order Details</h2>
      <p>
        <strong>Product:</strong> {product?.product?.name} x {product.quantity}
      </p>
      <p>
        <strong>Shipping Address:</strong> {address?.address}, {address?.street}
        , {address?.city}, {address?.state}, {address?.zipCode}
      </p>
      <p>
        <strong>Tracking Number:</strong>{" "}
        {product.order.tracking ?? "Shipping in progress"}
      </p>
      <p>
        <strong>Total Price:</strong> LKR:{" "}
        {product.quantity * product.product.price}
      </p>
      <p>
        <strong>Order Status:</strong> {product.order?.status}
      </p>
      <button
        onClick={closeViewOrder}
        className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  );
}
