import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { transferZodErrors } from "../utils/transfer-zod-errors";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const refs = useRef([]);
  const [searchParams] = useSearchParams();

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    if (index < refs.current.length - 1 && e.target.value !== "") {
      refs.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("/auth/verify-email", {
        email: searchParams.get("email"),
        code: otp.join(""),
      })
      .then(({ data }) => {
        if (data.success) navigate("/login");
      })
      .catch((err) => {
        if (err.response.data.error) setErrorMessage(err.response.data.error);
        if (err.response.data.errors)
          setValidationErrors(
            transferZodErrors(err.response.data.errors).error
          );
      });
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!searchParams.has("email") || searchParams.get("email").length === 0) {
    return (
      <div className="">
        <h1 className="text-2xl font-bold text-center text-red-400">
          Email not found
        </h1>
      </div>
    );
  }

  return (
    <div>
      <img
        src="assets/images/bg/bg.png"
        alt="webEase-hero-image"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="flex h-screen flex-1 flex-col justify-center items-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg p-8">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-pink-400">
            Email Verification
          </h2>
          <div className="text-sm font-medium text-gray-400 items-center">
            <p className="text-center">We have sent a code to your email</p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-16 pt-16">
                <div className="flex flex-row gap-2 items-center justify-between mx-auto w-full max-w-sm">
                  {[1, 2, 3, 4, 5, 6].map((index) => (
                    <div key={index} className="w-16 h-16">
                      <input
                        ref={(el) => (refs.current[index - 1] = el)}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-md border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name={`otp-${index}`}
                        id={`otp-${index}`}
                        value={otp[index - 1]}
                        onChange={(e) => handleOtpChange(e, index - 1)}
                        maxLength="1"
                        autoComplete="off"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      className="flex flex-row items-center justify-center text-center w-full border rounded-md outline-none py-4 bg-pink-700 border-none text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <p className="mt-10 text-center text-sm text-gray-500">
              Haven't got it?{" "}
              <a
                href="/sign-up"
                className="font-semibold leading-6 text-pink-400 hover:text-pink-600"
              >
                Resend OTP
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
