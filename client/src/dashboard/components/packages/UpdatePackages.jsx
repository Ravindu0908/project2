/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { transferZodErrors } from "../../../utils/transfer-zod-errors";

const UpdatePackages = ({ closeUpdatePackage, getPackages, packag }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    normalPrice: "",
    discountedPrice: "",
    services: [],
    branches: [],
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [services, setServices] = useState([]);
  const [branches, setBranches] = useState({
    Colombo: false,
    Kandy: false,
    Jaffna: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBranchChange = (branchId) => {
    setBranches((prevBranches) => ({
      ...prevBranches,
      [branchId]: !prevBranches[branchId], // Toggle the boolean state
    }));
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    const selectedService = services.find(service => service.id === value); // Find the selected service object

    setFormData((prevData) => {
      const services = checked
        ? [...prevData.services, selectedService.name] // Add service name
        : prevData.services.filter((serviceName) => serviceName !== selectedService.name); // Remove service name
      return { ...prevData, services };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedBranches = Object.keys(branches).filter(
      (branch) => branches[branch]
    );

    const data = {
      name: formData.name,
      normalPrice: formData.normalPrice,
      discountedPrice: formData.discountedPrice,
      description: formData.description,
      branches: selectedBranches,
      services: formData.services, // This will be an array of service names
    };

    axios
      .post("/admin/packages", data)
      .then((res) => {
        console.log(res.data);
        getPackages();
        alert("Package updated successfully!"); // Success alert
        closeUpdatePackage();
      })
      .catch((err) => {
        if (err?.response?.data.error) alert(err?.response?.data.error);
        if (err?.response?.data.errors) {
          setValidationErrors(
            transferZodErrors(err?.response?.data.errors).error
          );
        }
      });
  };

  useEffect(() => {
    axios
      .get("/public/services")
      .then((res) => setServices(res.data.services || []))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (packag) {
      setFormData({
        name: packag.name || "",
        description: packag.description || "",
        normalPrice: packag.normalPrice || "",
        discountedPrice: packag.discountedPrice || "",
        services: packag.services.reduce((acc, service) => {
          acc.push(service.service.id);
          return acc;
        }, []),
        branches: packag.branches.reduce((acc, branch) => {
          acc.push(branch.branch);
          return acc;
        }, []),
      });
      const newBranches = {
        Colombo: packag.branches.includes("Colombo"),
        Kandy: packag.branches.includes("Kandy"),
        Jaffna: packag.branches.includes("Jaffna"),
      };
      setBranches(newBranches);
    }
  }, [packag]);

  return (
    <div className="absolute z-10 top-0 h-[90vh] overflow-auto bg-white p-16 sm:mx-auto sm:w-full sm:max-w-4xl shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg left-40">
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
            {validationErrors.name && (
              <p className="text-sm text-red-600">{validationErrors.name}</p>
            )}
          </div>

          {/* Services List */}
          <div>
            <label
              htmlFor="services"
              className="block text-sm font-medium leading-6 text-gray-900 pb-4"
            >
              Select Services
            </label>
            {services.map((service) => (
              <div key={service.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={service.id}
                  value={service.id}
                  checked={formData.services.includes(service.id)} // Check based on service name
                  onChange={handleServiceChange}
                />
                <label
                  htmlFor={service.id}
                  className="ml-2 text-sm text-gray-900"
                >
                  {service.name}
                </label>
              </div>
            ))}
            {validationErrors?.services && (
              <p className="text-sm text-red-600">
                {validationErrors.services.join(", ")}
              </p>
            )}
          </div>

          {/* Branch List */}
          <div>
            <label
              htmlFor="branches"
              className="block text-sm font-medium leading-6 text-gray-900 pb-4"
            >
              Select Branches
            </label>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="Colombo"
                checked={formData.branches.includes("Colombo")}
                onChange={() => handleBranchChange("Colombo")}
              />
              <label htmlFor="Colombo" className="ml-2 text-sm text-gray-900">
                Colombo
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="Kandy"
                checked={formData.branches.includes("Kandy")}
                onChange={() => handleBranchChange("Kandy")}
              />
              <label htmlFor="Kandy" className="ml-2 text-sm text-gray-900">
                Kandy
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="Jaffna"
                checked={formData.branches.includes("Jaffna")}
                onChange={() => handleBranchChange("Jaffna")}
              />
              <label htmlFor="Jaffna" className="ml-2 text-sm text-gray-900">
                Jaffna
              </label>
            </div>
            {validationErrors?.branches && (
              <p className="text-sm text-red-600">
                {validationErrors.branches.join(", ")}
              </p>
            )}
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
            {validationErrors.description && (
              <p className="text-sm text-red-600">
                {validationErrors.description}
              </p>
            )}
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
              <input
                id="normalPrice"
                name="normalPrice"
                type="number"
                autoComplete="normalPrice"
                disabled
                value={formData.normalPrice}
                className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          {/* Discounted Price */}
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
            {validationErrors.discountedPrice && (
              <p className="text-sm text-red-600">
                {validationErrors.discountedPrice}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md"
            type="submit"
          >
            Update Package
          </button>
          <button
            className="px-4 py-2 text-white bg-gray-500 rounded-md"
            type="button"
            onClick={closeUpdatePackage}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePackages;
