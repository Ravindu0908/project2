/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const slotMapping = {
  SLOT_1_8AM_9AM: "8AM - 9AM",
  SLOT_2_9AM_10AM: "9AM - 10AM",
  SLOT_3_10AM_11AM: "10AM - 11AM",
  SLOT_4_11AM_12PM: "11AM - 12PM",
  SLOT_5_1PM_2PM: "1PM - 2PM",
  SLOT_6_2PM_3PM: "2PM - 3PM",
  SLOT_7_3PM_4PM: "3PM - 4PM",
  SLOT_8_4PM_5PM: "4PM - 5PM",
  SLOT_9_5PM_6PM: "5PM - 6PM",
};

const AppointmentPopup = ({ beautician, onClose }) => {
  const [timeSlot, setTimeSlot] = useState("");
  const [date, setDate] = useState(new Date(new Date().getDate() + 1));
  const [availableSlots, setAvailableSlots] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [service, setService] = useState("");
  const { user } = useSelector((state) => state.user);
  const navigator = useNavigate();

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);
  const tomorrow = today.setDate(today.getDate() + 1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user || user.role !== "CLIENT") {
      return navigator("/login");
    }
    const formData = {
      date: new Date(date).toISOString(),
      timeSlot,
      service,
    };

    await axios
      .post("/client/appointments", formData)
      .then(async (res) => {
        console.log(res.data);
        await openPayhere(res.data?.payment);
      })
      .catch((err) => {
        console.log(err?.message);
        toast.error("Failed to book the appointment.");
      });
  };

  const getAvailableServices = useCallback(async () => {
    await axios
      .get(`/public/services/${beautician?.id}`)
      .then((res) => {
        setAvailableServices(res.data.services);
        setService(res.data.services[0]?.id);
      })
      .catch((err) => {
        console.log(err?.message);
        toast.error("Failed to load services.");
      });
  }, [beautician?.id]);

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
        .post(`/client/appointments/${res?.order_id}`)
        .then((res) => {
          console.log(res.data);
          toast.success("Payment completed successfully!");
          navigator("/client/appointments");
        })
        .catch((err) => {
          console.log(err);
          toast.error("An error occurred during payment completion.");
        });
    };

    window.payhere.onDismissed = function onDismissed() {
      toast.info("Payment was dismissed.");
    };

    window.payhere.onError = function onError() {
      toast.error("Payment error occurred.");
    };
  };

  const getAvailableTimeSlots = async (date) => {
    setDate(date);
    await axios
      .get(`/public/time-slots/${beautician?.id}/${new Date(date)}`)
      .then((res) => {
        setAvailableSlots(res?.data?.timeSlots);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Failed to load available time slots.");
      });
  };

  useEffect(() => {
    getAvailableServices();
  }, [getAvailableServices]);

  const isDisabled = (value) => {
    return !availableSlots.includes(value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded shadow-md md:w-[600px]">
        <h2 className="text-xl font-bold mb-4">
          Book Appointment with {beautician.name}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex gap-4">
            <div className="w-full">
              <label
                htmlFor="branch-select"
                className="block mb-2 text-pink-700"
              >
                Select Service:
              </label>
              <select
                id="service-select"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="block w-full p-2 border border-pink-300 rounded mb-4"
              >
                {availableServices?.map((service, index) => (
                  <option key={index} value={service?.id}>
                    {service?.service?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="date"
              >
                Select Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => getAvailableTimeSlots(e.target.value)}
                min={new Date(tomorrow).toISOString().split("T")[0]}
                max={maxDate.toISOString().split("T")[0]}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Time Slot
            </label>
            {Object.keys(slotMapping).map((slot) => (
              <div key={slot} className="mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="timeSlot"
                    value={slot}
                    disabled={isDisabled(slot)}
                    onChange={() => setTimeSlot(slot)}
                    className="form-radio text-pink-500 h-4 w-4"
                    required
                  />
                  <span className="ml-2">{slotMapping[slot]}</span>
                </label>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded mr-2"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentPopup;
