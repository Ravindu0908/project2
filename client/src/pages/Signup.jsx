import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { transferZodErrors } from "../utils/transfer-zod-errors";
import BackToHomeButton from "../components/button/BackToHomeButton";

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "CLIENT", // Default to "client"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("/auth/register", formData)
      .then(({ data }) => {
        if (data.success) {
          navigate("/verify-email?email=" + formData.email);
        }
      })
      .catch((err) => {
        if (err?.response?.data.error) setErrorMessage(err.response.data.error);
        if (err?.response?.data.errors)
          setValidationErrors(
            transferZodErrors(err?.response?.data.errors).error
          );
      });
  };
  const backgroundStyle = {
    backgroundImage: 'url(assets/images/bg/bg.png)',
    backgroundSize: 'cover', // This makes the image cover the entire width and height
    backgroundPosition: 'center', // This centers the image
    backgroundRepeat: 'no-repeat', // This prevents the image from repeating
    width: '100%', // Ensures the component takes up the full width of its container
  };

  return (
    <div style={backgroundStyle}>
      <BackToHomeButton />
      {/* <img
        src="assets/images/bg/bg.png"
        alt="webEase-hero-image"
        className="absolute inset-0 w-full h-full object-cover"
      /> */}
      <div className="flex md:h-screen xl:h-full  justify-center items-center 2xl:h-screen pt-20 md:pt-4 py-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg p-8">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-pink-400">
            Sign up to your account
          </h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 md:gap-4">
                <div>
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="firstname"
                      name="firstName"
                      type="text"
                      autoComplete="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="peer block w-full appearance-none border rounded-lg border-pink-400 bg-transparent py-1.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="lastname"
                      name="lastName"
                      type="text"
                      autoComplete="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="peer block w-full appearance-none border rounded-lg border-pink-400 bg-transparent py-1.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="peer block w-full appearance-none border rounded-lg border-pink-400 bg-transparent py-1.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phonenumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    id="phonenumber"
                    name="phoneNumber"
                    type="tel"
                    autoComplete="number"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="peer block w-full appearance-none border rounded-lg border-pink-400 bg-transparent py-1.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
              <div>
                <span className="block text-sm font-medium leading-6 text-gray-900">
                  Account Type
                </span>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="BEAUTICIAN"
                      checked={formData.role === "BEAUTICIAN"}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-pink-400 border-pink-400 focus:ring-pink-400"
                    />
                    <span className="ml-2">Beautician</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="role"
                      value="CLIENT"
                      checked={formData.role === "CLIENT"}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-pink-400 border-pink-400 focus:ring-pink-400"
                    />
                    <span className="ml-2">Customer</span>
                  </label>
                </div>
              </div>
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
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="peer block w-full appearance-none border rounded-lg border-pink-400 bg-transparent py-1.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Retype Password
                </label>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="peer block w-full appearance-none border rounded-lg border-pink-400 bg-transparent py-1.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <button
                  type="submit"
                  className="flex w-1/2 justify-center rounded-lg bg-pink-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
              If you have an account?{" "}
              <a
                href="login"
                className="font-semibold leading-6 text-pink-400 hover:text-pink-600"
              >
                Sign in now!
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
