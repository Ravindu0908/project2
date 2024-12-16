import { useEffect, useState } from "react";
import axios from "axios";
import { transferZodErrors } from "../../../utils/transfer-zod-errors";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddService = ({ closeAddService, getServices }) => {
  const [formData, setFormData] = useState({
    name: "",
    beauticians: [],
    description: "",
    price: "",
  });

  const [beauticians, setBeauticians] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    branch: "",
    beauticians: "",
    subtitle: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckBoxes = (e) => {
    const { value } = e.target;
    let currentIds = formData.beauticians;

    if (currentIds.includes(value)) {
      // Remove if already selected
      currentIds = currentIds.filter((id) => id !== value);
    } else {
      // Add if not selected
      currentIds.push(value);
    }

    setFormData({ ...formData, beauticians: currentIds });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      price: formData.price,
      description: formData.description,
      beauticians: formData.beauticians,
    };

    axios
      .post("/admin/services", data)
      .then((res) => {
        console.log(res.data);
        getServices();
        closeAddService();
        toast.success("Service added successfully!");
        alert("Service added successfully!");
      })
      .catch((err) => {
        if (err?.response?.data.error) setErrorMessage(err.response.data.error);
        toast.error("Failed to add service.");
        if (err?.response?.data.errors) {
          setValidationErrors(
            transferZodErrors(err?.response?.data.errors).error
          );
        }
      });
  };

  useEffect(() => {
    axios
      .get(`/public/branches/beauticians`)
      .then((res) => {
        setBeauticians(res.data.beauticians);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="absolute z-10 top-5 bottom-5 overflow-auto bg-white p-16 sm:mx-auto sm:w-full sm:max-w-4xl shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          {/* Service Title */}
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
          </div>

          {/* Beautician group by branches */}
          {Object.keys(beauticians).map((branch) => (
            <div key={branch}>
              <label
                htmlFor="beautician"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {branch}
              </label>
              <div className="mt-2">
                {/* Checkboxes */}
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
                      checked={formData.beauticians.includes(beautician.id)}
                      onChange={handleCheckBoxes}
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

          {/* Service Description */}
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
          </div>

          {/* Service Price */}
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
          </div>
        </div>
        
        <div className="flex gap-4 pt-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
            type="submit"
          >
            Add Service
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={closeAddService}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddService;
