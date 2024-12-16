import { useCallback, useEffect, useState } from "react";
import ProfileSidebarClient from "../../../components/sidebars/ProfileSidebarClient";
import OrderItem from "../../../components/OrderItem";
import DeliveryConfirmPopup from "../../../components/DeliveryConfirmPopup";
import ViewOrder from "../../../components/ViewOrder"; // Adjust the path as necessary
import axios from "axios";
import ReviewPopup from "../../../components/ReviewPopup ";

const OrderClient = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewOrder, setViewOrder] = useState(null);
  const [confirmOrder, setConfirmOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  const handleAddReview = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseReviewPopup = () => {
    setSelectedOrder(null);
  };

  const handleViewOrder = (order) => {
    setViewOrder(order);
  };

  const handleCloseViewOrder = () => {
    setViewOrder(null);
  };

  const loadOrders = useCallback(async () => {
    await axios
      .get("/client/orders")
      .then((response) => {
        setOrders(response.data.orders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleReviewSubmit = (orderId, productId, rating, comment) => {
    axios
      .post(`/client/products/review/${productId}/${orderId}`, {
        rating,
        comment,
      })
      .then(() => {
        alert("Review added successfully.");
        setSelectedOrder(null);
        loadOrders();
      })
      .catch(() => {
        alert("Failed to add review.");
      });
  };

  const handleConfirmDelivery = (order) => {
    setConfirmOrder(order);
  };

  const handleCloseConfirmPopup = () => {
    setConfirmOrder(null);
  };

  const handleDeliveryConfirm = (orderId) => {
    axios
      .post(`/client/products/check-out/finish/${orderId}`)
      .then(() => {
        alert("Delivery confirmed.");
        setConfirmOrder(null);
        loadOrders();
      })
      .catch(() => {
        alert("Failed to confirm delivery.");
      });
  };

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <div>
      <ProfileSidebarClient />
      <div
        className="xl:ml-[287px]"
        style={{
          backgroundImage: "url(/assets/images/bg/bg-2.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="px-8 min-h-screen">
          <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="sm:mx-auto sm:w-full sm:max-w-8xl p-8 flex flex-col items-center">
              {orders.map((order) => (
                <OrderItem
                  key={order.id}
                  order={order}
                  onAddReview={handleAddReview}
                  onConfirmDelivery={handleConfirmDelivery}
                  onViewOrder={handleViewOrder}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedOrder && (
        <ReviewPopup
          order={selectedOrder}
          onClose={handleCloseReviewPopup}
          onSubmit={handleReviewSubmit}
        />
      )}
      {confirmOrder && (
        <DeliveryConfirmPopup
          order={confirmOrder}
          onClose={handleCloseConfirmPopup}
          onConfirm={handleDeliveryConfirm}
        />
      )}
      {viewOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/50 drop-shadow-md rounded-xl p-4 z-50">
          <ViewOrder
            product={viewOrder}
            closeViewOrder={handleCloseViewOrder}
          />
        </div>
      )}
    </div>
  );
};

export default OrderClient;
