/* eslint-disable react/prop-types */
export default function ViewOrder({ order, closeViewOrder }) {
  if (!order) return null;
  const products = order.products;
  const client = order.user;
  const address = order.address;

  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Order Details</h2>
      <p>
        <strong>Client Name:</strong> {client?.firstName} {client?.lastName}
      </p>
      <p>
        <strong>Product List:</strong>
      </p>
      <ul>
        {products?.map((item, index) => (
          <li key={index}>
            {item.product?.name} x {item.quantity}
          </li>
        ))}
      </ul>
      <p>
        <strong>Shipping Address:</strong> {address?.address}, {address?.street}
        , {address?.city}, {address?.state}, {address?.zipCode}
      </p>
      <p>
        <strong>Phone Number:</strong> {client?.phoneNumber}
      </p>
      <p>
        <strong>Total Price:</strong> {order.total}
      </p>
      <p>
        <strong>Order Status:</strong> {order.status?.toLowerCase()}
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
