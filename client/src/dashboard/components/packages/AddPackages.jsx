/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { transferZodErrors } from "../../../utils/transfer-zod-errors";

const branches = [
  { id: "Colombo", name: "Colombo" },
  { id: "Kandy", name: "Kandy" },
  { id: "Jaffna", name: "Jaffna" },
];

const AddPackages = ({ closeAddPackages, getPackages }) => {
  const [formData, setFormData] = useState({
    name: "",
    services: [],
    branches: [],
    description: "",
    normalPrice: 0,
    discountedPrice: 0,
  });
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    services: [],
    branches: [],
    description: "",
    normalPrice: "",
    discountedPrice: "",
  });
  const [services, setServices] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/admin/packages", formData)
      .then(() => {
        getPackages();
        alert("Package added successfully!");
        closeAddPackages();
      })
      .catch((err) => {
        if (err.response.data.errors) {
          const errors = transferZodErrors(err.response.data.errors);
          setValidationErrors(errors);
        } else {
          alert(err.response.data.error);
        }
      });
  };

  // Fetch services function
  const getServices = useCallback(async () => {
    axios
      .get("/admin/services")
      .then((res) => {
        setServices(res.data.services);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // get beauticians by branch
  useEffect(() => {
    getServices();
  }, [getServices]);

  return (
    <div className="absolute z-10 top-5 bottom-5 overflow-auto bg-white p-16 sm:mx-auto sm:w-full sm:max-w-4xl shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          {/* Package Title */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Package Title
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

          {/* Services List */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900 pb-4"
            >
              Select Services
            </label>
            {services.map((service) => (
              <div key={service.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={service.id}
                  name="services"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        services: [...formData.services, service.id],
                        normalPrice: formData.normalPrice + service.price,
                      });
                    } else {
                      setFormData({
                        ...formData,
                        services: formData.services.filter(
                          (id) => id !== service.id
                        ),
                        normalPrice: formData.normalPrice - service.price,
                      });
                    }
                  }}
                />
                <label
                  htmlFor={service.id}
                  className="ml-2 text-sm text-gray-900"
                >
                  {service.name}
                </label>
              </div>
            ))}
            {validationErrors?.services.length > 0 && (
              <p className="text-sm text-red-600">
                {validationErrors.services.join(", ")}
              </p>
            )}
          </div>
          {/* Branch List */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900 pb-4"
            >
              Select Branches
            </label>
            {branches.map((branch) => (
              <div key={branch.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={branch.id}
                  name={branch.id}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        branches: [...formData.branches, branch.id],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        branches: formData.branches.filter(
                          (id) => id !== branch.id
                        ),
                      });
                    }
                  }}
                  // className="peer appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                />
                <label
                  htmlFor={branch.id}
                  className="ml-2 text-sm text-gray-900"
                >
                  {branch.name}
                </label>
              </div>
            ))}
          </div>
          {/* Package Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Package Description
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
          {/* Normal Price */}
          <div>
            <label
              htmlFor="normalPrice"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Normal Price
            </label>
            <div className="mt-2">
              <div className="mt-2">
                <input
                  id="normalPrice"
                  name="normalPrice"
                  type="number"
                  autoComplete="normalPrice"
                  disabled
                  value={formData.normalPrice}
                  onChange={handleChange}
                  className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
          </div>
          {/* Package Price */}
          <div>
            <label
              htmlFor="discountedPrice"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Discounted Price
            </label>
            <div className="mt-2">
              <input
                id="discountedPrice"
                name="discountedPrice"
                type="number"
                autoComplete="discountedPrice"
                required
                value={formData.discountedPrice}
                onChange={handleChange}
                className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 pt-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg left-2"
            type="submit"
          >
            Add Package
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg left-2"
            onClick={closeAddPackages}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackages;
