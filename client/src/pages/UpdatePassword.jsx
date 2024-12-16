import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { transferZodErrors } from "../utils/transfer-zod-errors";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword") setOldPassword(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      alert("Passwords do not match");
      return;
    }
    axios
      .put("/user/update-password", {
        oldPassword,
        newPassword,
        confirmPassword,
      })
      .then(() => {
        navigate("/login", {
          replace: true,
        });
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          if (err.response.data.error) setErrorMessage(err.response.data.error);
          if (err.response.data.errors) {
            setValidationErrors(
              transferZodErrors(err.response.data.errors).error
            );
          }
          if (err.response.data.errors) {
            setErrorMessage("Old password is incorrect");
            alert("Old password is incorrect");
          }
        }
      });
  };

  return (
    <div>
      <img
        src="/assets/images/bg/bg.png"
        alt="webEase-hero-image"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="flex h-screen flex-1 flex-col justify-center items-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg p-8">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-pink-400">
            Update Password
          </h2>
          <div className="text-sm font-medium text-gray-400 items-center">
            {/* <p className="text-center">Enter Your Email</p> */}
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-8 pt-16">
                <div className="mt-2 w-full">
                  <label
                    htmlFor="oldPassword"
                    className="block text-sm font-medium leading-6 text-gray-900 pb-4"
                  >
                    Enter your old password
                  </label>
                  <input
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={oldPassword}
                    onChange={handleChange}
                    className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                    placeholder=""
                  />
                </div>
                <div className="mt-2 w-full">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium leading-6 text-gray-900 pb-4"
                  >
                    Enter your new password
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={newPassword}
                    onChange={handleChange}
                    className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                    placeholder=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium leading-6 text-gray-900 pb-4"
                  >
                    Confirm your new password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={handleChange}
                    className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      className="flex flex-row items-center justify-center text-center w-full border rounded-md outline-none py-4 bg-pink-700 border-none text-white text-sm shadow-sm"
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <p className="mt-10 text-center text-sm text-gray-500">
              Haven't got it?{" "}
              <a
                href="/sign-up"
                className="font-semibold leading-6 text-pink-400 hover:text-pink-600"
              >
                Resend OTP
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
