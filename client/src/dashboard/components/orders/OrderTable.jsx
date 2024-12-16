import { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import UpdateOrder from "./UpdateOrder"; // Ensure this import matches the actual component name
import ViewOrder from "./ViewOrder"; // Ensure this import matches the actual component name
import axios from "axios";

export default function OrderTable() {
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  const openUpdatePopup = (order) => {
    setSelectedOrder(order);
    setShowUpdatePopup(true);
  };

  const closeUpdatePopup = () => {
    setShowUpdatePopup(false);
    setSelectedOrder(null);
  };

  const openViewPopup = (order) => {
    setSelectedOrder(order);
    setShowViewPopup(true);
  };

  const closeViewPopup = () => {
    setShowViewPopup(false);
    setSelectedOrder(null);
  };

  const getOrders = useCallback(async () => {
    try {
      // get order data
      const response = await axios.get("/admin/orders");
      setOrders(response.data.orders);
    } catch (error) {
      alert("Error getting orders");
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <>
      <table
        className="w-full text-left border border-separate rounded border-slate-200"
        cellSpacing="0"
      >
        <tbody>
          <tr>
            <th className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100">
              Client Name
            </th>
            <th className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100">
              Products
            </th>
            <th className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100">
              Shipping Address
            </th>
            <th className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100">
              Phone Number
            </th>
            <th className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100">
              Total Price
            </th>
            <th className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100">
              Order Status
            </th>
            <th className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-pink-100">
              Actions
            </th>
          </tr>
          {orders?.map((order, index) => {
            const address = order.address;
            return (
              <tr
                key={index}
                className="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none"
              >
                <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                  {order.user?.firstName} {order.user?.lastName}
                </td>
                <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                  <ul>
                    {order?.products?.map((item, index) => (
                      <li key={index}>
                        {item.product?.name}
                        <p className="text-xs">(Qty: {item.quantity})</p>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                  {address?.address}, {address?.street}, {address?.city},{" "}
                  {address?.state}, {address?.zipCode}
                </td>
                <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                  {order.user?.phoneNumber}
                </td>
                <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                  {order.total}
                </td>
                <td className="before:w-24 capitalize before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                  {order.status?.toLowerCase()}
                </td>
                <td className="before w-[201px] before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-xl transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 justify-between">
                  <button
                    onClick={() => openViewPopup(order)}
                    className="bg-blue-600 text-white px-2 py-1 rounded-lg mx-1"
                  >
                    View
                  </button>
                  <button
                    onClick={() => openUpdatePopup(order)}
                    className="bg-red-500 text-white px-2 py-2 rounded-lg mx-1"
                  >
                    <Icon icon="dashicons:update" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Update Order Popup */}
      {showUpdatePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-white drop-shadow-md rounded-xl p-4 z-50">
          <UpdateOrder
            closeUpdateOrder={closeUpdatePopup}
            order={selectedOrder}
            getOrders={getOrders}
          />
        </div>
      )}

      {/* View Order Popup */}
      {showViewPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-white drop-shadow-md rounded-xl p-4 z-50">
          <ViewOrder order={selectedOrder} closeViewOrder={closeViewPopup} />
        </div>
      )}
    </>
  );
}
