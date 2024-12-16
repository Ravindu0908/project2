import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmailInput = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/auth/forgot-password", { email })
      .then((res) => {
        console.log(res);
        navigate("/reset-password?email=" + email);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            Enter Your Email
          </h2>
          <div class="text-sm font-medium text-gray-400 items-center">
            {/* <p className="text-center">Enter Your Email</p> */}
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-16 pt-16">
                <div className="flex flex-row gap-2 items-center justify-between mx-auto w-full max-w-sm">
                  <div className="mt-2 w-full">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={handleChange}
                      className="peer px-4 block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                      placeholder="example@mail.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="flex flex-row items-center justify-center text-center w-1/2 border rounded-md outline-none py-2.5 bg-pink-700 border-none text-white text-sm shadow-sm"
                    >
                      Continue
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

export default EmailInput;
