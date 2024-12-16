import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPasswordOutside = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
    if (name === "otp") setOtp(value);
  };

  const handleSubmit = async (e) => {
    const email = params.get("email");
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    axios
      .post("/auth/reset-password", {
        email,
        password,
        confirmPassword,
        code: otp,
      })
      .then((res) => {
        if (res.data.success) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const email = params.get("email");
    if (!email) {
      navigate("/forgot-password");
    }
  }, [navigate, params]);

  return (
    <div>
      <img
        src="assets/images/bg/bg.png"
        alt="webEase-hero-image"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="flex h-screen flex-1 flex-col justify-center items-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg p-8">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-pink-400">
            Reset Password
          </h2>
          <div className="text-sm font-medium text-gray-400 items-center"></div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-8 pt-16">
                <div className="mt-2 w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900 pb-4"
                  >
                    Enter six digit OTP
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    autoComplete="otp"
                    required
                    value={otp}
                    onChange={handleChange}
                    className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                    placeholder=""
                  />
                </div>
                <div className="mt-2 w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900 pb-4"
                  >
                    Enter your new password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={handleChange}
                    className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                    placeholder=""
                  />
                </div>
                <div className="mt-2 w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900 pb-4"
                  >
                    confirm your new password
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
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="flex flex-row items-center justify-center text-center w-1/2 border rounded-md outline-none py-2.5 bg-pink-700 border-none text-white text-sm shadow-sm"
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordOutside;
