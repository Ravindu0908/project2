import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import axios from "axios";

const DeliveryInfo = () => {
  const [formData, setFormData] = useState({
    address: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { products } = location.state || { products: [] };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Delivery Info:", formData);
    console.log("Selected Products:", products);

    // Combine form data and selected products
    const orderData = {
      address: formData.address,
      products: products.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
      })),
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
    };

    // Send order data to the server
    await axios
      .post("/client/products/check-out", orderData)
      .then(async ({ data }) => {
        await openPayhere(data?.payment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Open Payhere payment
  const openPayhere = async (res) => {
    const payment_object = {
      sandbox: true,
      preapprove: true,
      merchant_id: res?.merchant_id,
      return_url: res?.return_url,
      cancel_url: res?.cancel_url,
      notify_url: res?.notify_url,
      order_id: res?.order_id,
      items: res?.items,
      amount: res?.amount,
      currency: res?.currency,
      hash: res?.hash,
      first_name: res?.first_name,
      last_name: res?.last_name,
      email: res?.email,
      phone: res?.phone,
      address: res?.address,
      city: res?.city,
      country: res?.country,
    };

    window.payhere.startPayment(payment_object);

    window.payhere.onCompleted = async function onCompleted() {
      await axios
        .post(`/client/products/check-out/${res?.order_id}`)
        .then((res) => {
          console.log(res.data);
          alert("Payment completed");
        })
        .then(() => {
          navigate("/products");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    window.payhere.onDismissed = function onDismissed() {
      alert("Payment dismissed");
    };

    window.payhere.onError = function onError() {
      alert("Payment error");
    };
  };

  const backgroundStyle = {
    backgroundImage: "url(assets/images/bg/bg.png)",
    backgroundSize: "cover", // This makes the image cover the entire width and height
    backgroundPosition: "center", // This centers the image
    backgroundRepeat: "no-repeat", // This prevents the image from repeating
    width: "100%", // Ensures the component takes up the full width of its container
  };

  return (
    <div style={backgroundStyle}>
      <Navbar />
      <PageHeader title="Delivery Information" />
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-8xl md:max-w-[80vw] bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg p-8">
          <div className="max-w-3xl mx-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Street
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DeliveryInfo;
