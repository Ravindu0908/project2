import axios from "axios";
import { useState } from "react";

const AddUser = ({ closeAddUser, getUsers }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/admin/users", formData)
      .then((res) => {
        if (res.status === 200) {
          getUsers();
          closeAddUser();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="absolute z-10 top-5 bottom-5 overflow-auto bg-white p-16 sm:mx-auto sm:w-full sm:max-w-4xl shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First Name
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
              />
            </div>
          </div>
          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Name
            </label>
            <div className="mt-2">
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
              />
            </div>
          </div>
          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email Address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
              />
            </div>
          </div>
          {/* User Role */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              User Role
            </label>
            <div className="mt-2">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleRoleChange}
                required
                className="block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
              >
                <option value="" disabled>
                  Select a role
                </option>
                <option value="ADMIN">Admin</option>
                <option value="CLIENT">Client</option>
                <option value="BEAUTICIAN">Beautician</option>
              </select>
            </div>
          </div>
          {/* phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone Number
            </label>
            <div className="mt-2">
              <input
                id="phone"
                name="phoneNumber"
                type="text"
                autoComplete="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
              />
            </div>
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
              />
            </div>
          </div>
          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="confirmPassword"
                required
                value={formData.confirmPassword}
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
            Add User
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg left-2"
            onClick={closeAddUser}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
