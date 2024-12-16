import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { transferZodErrors } from "../utils/transfer-zod-errors";
import BackToHomeButton from "../components/button/BackToHomeButton";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("/auth/login", formData)
      .then(({ data }) => {
        if (data.success) {
          setSuccessMessage(data.success);
          navigate(data?.navigate, { replace: true });
        }
      })
      .catch((err) => {
        if (err.response.data.error) setErrorMessage(err.response.data.error);
        if (err.response.data.errors)
          setValidationErrors(
            transferZodErrors(err.response.data.errors).error
          );
      });
  };

  return (
    <div>
      <img
        src="assets/images/bg/bg.png"
        alt="webEase-hero-image"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <BackToHomeButton />
      <div className="flex h-screen flex-1 flex-col justify-center items-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg p-8">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-pink-400">
            Sign in to your account
          </h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                    className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="forgot-password"
                      className="font-semibold text-pink-400 hover:text-pink-600"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <button
                  type="submit"
                  className="flex w-1/2 justify-center rounded-lg bg-pink-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
                {errorMessage && (
                  <p style={{ color: "red" }}>
                    Email or password incorrect
                  </p>
                )}
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <a
                href="/sign-up"
                className="font-semibold leading-6 text-pink-400 hover:text-pink-600"
              >
                Sign up now!
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
