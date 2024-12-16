/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { transferZodErrors } from "../../../utils/transfer-zod-errors";
import { toast } from "react-toastify";

const UpdateService = ({
  closeUpdateService,
  service,
  serviceId,
  getServices,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    beauticians: [],
    description: "",
    price: "",
  });
  const [beauticians, setBeauticians] = useState({});
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    beauticians: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || "",
        description: service.description || "",
        price: service.price || "",
        beauticians: service.beauticians || [], // Initialize beauticians
      });
    }
  }, [service]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox changes for beauticians
  const handleCheckBoxes = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      beauticians: prevState.beauticians.includes(value)
        ? prevState.beauticians.filter((id) => id !== value)
        : [...prevState.beauticians, value],
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      price: formData.price,
      description: formData.description,
      beauticians: formData.beauticians,
    };

    axios
      .put(`/admin/services/${serviceId}`, data)
      .then(() => {
        alert("Service updated successfully.");
      })
      .then(async () => {
        await getServices(); // Make sure this function is defined
        closeUpdateService();
      })
      .catch((err) => {
        if (err?.response?.data.error) toast.error(err?.response?.data.error);
        if (err?.response?.data.errors)
          setValidationErrors(
            transferZodErrors(err?.response?.data.errors).error
          );
      });
  };

  useEffect(() => {
    // Fetch beauticians data
    axios
      .get(`/public/branches/beauticians`)
      .then((res) => {
        setBeauticians(res.data.beauticians || {}); // Initialize beauticians if empty
      })
      .catch((err) => {
        console.error("Error fetching beauticians:", err);
      });
  }, [serviceId]);

  return (
    <div className="absolute z-10 top-0 min-h-[80vh] overflow-auto bg-white p-16 sm:mx-auto sm:w-full sm:max-w-4xl shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg left-40">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Service Title
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
              />
            </div>
            {/* error */}
            {validationErrors.name && (
              <p className="text-red-500 text-xs mt-1">
                {validationErrors.name}
              </p>
            )}
          </div>
          {Object.keys(beauticians).map((branch) => (
            <div key={branch}>
              <label
                htmlFor="beautician"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {branch}
              </label>
              <div className="mt-2">
                {beauticians[branch].map((beautician) => (
                  <div
                    key={beautician.id}
                    className="flex gap-x-2 items-center"
                  >
                    <input
                      type="checkbox"
                      id={beautician.id}
                      name="beauticians"
                      value={beautician.id}
                      onChange={handleCheckBoxes}
                      checked={formData.beauticians.includes(beautician.id)}
                      className="peer h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                    />
                    <label
                      htmlFor={beautician.id}
                      className="ml-2 block text-sm font-medium leading-6 text-gray-900"
                    >
                      {beautician.user.firstName} {beautician.user.lastName}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* error */}
          {validationErrors.beauticians && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.beauticians}
            </p>
          )}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Service Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                rows={4}
                autoComplete="description"
                required
                value={formData.description}
                onChange={handleChange}
                className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
              />
            </div>
            {/* error */}
            {validationErrors.description && (
              <p className="text-red-500 text-xs mt-1">
                {validationErrors.description}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Service Price
            </label>
            <div className="mt-2">
              <input
                id="price"
                name="price"
                type="number"
                autoComplete="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
              />
            </div>
            {/* error */}
            {validationErrors.price && (
              <p className="text-red-500 text-xs mt-1">
                {validationErrors.price}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-4 pt-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg left-2"
            type="submit"
          >
            Update Service
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg left-2"
            onClick={closeUpdateService}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateService;
