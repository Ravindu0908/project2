/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
// import { transferZodErrors } from "../../utils/transfer-zod-errors";
// import { useSelector } from "react-redux";

const PaymentDetails = ({ handleNext }) => {
//   const { role } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
//   const [userData, setUserData] = useState({
//     accountHolderName: role?.paymentAccount?.accountHolderName || "",
//     nameOfBank: role?.paymentAccount?.nameOfBank || "",
//     accountNumber: role?.paymentAccount?.accountNumber || "",
//     branch: role?.paymentAccount?.branch || "",
//   });

//   const submitPaymentDetails = async (e) => {
//     e.preventDefault();
//     axios
//       .post("/coach/payment", userData)
//       .then(() => {
//         if (handleNext !== undefined && handleNext !== null) {
//           handleNext();
//         } else {
//           setSuccessMessage("General details saved successfully");
//         }
//       })
//       .catch((err) => {
//         if (err.response.data.error) setErrorMessage(err.response.data.error);
//         if (err.response.data.errors)
//           setValidationErrors(
//             transferZodErrors(err.response.data.errors).error
//           );
//       });
//   };
  return (
    <div className="">
      <div className="flex justify-start w-[100%]">
        <form className="w-[70vw] mt-16">
          {/* Name of the bank account holder */}
          <div className="sm:col-span-4">
            <label
              htmlFor="account-holder-name"
              className="block text-sm font-medium leading-6 text-pink-600"
            >
              Name of the Bank Account Holder
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="account-holder-name"
                id="account-holder-name"
                autoComplete="account-holder-name"
                className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                placeholder="John Doe"
                // value={userData.accountHolderName}
                // onChange={(e) =>
                //   setUserData({
                //     ...userData,
                //     accountHolderName: e.target.value,
                //   })
                // }
              />
            </div>
          </div>

          {/* Name of the bank */}
          <div className="sm:col-span-4 mt-6">
            <label
              htmlFor="bank-name"
              className="block text-sm font-medium leading-6 text-pink-600"
            >
              Name of the Bank
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="bank-name"
                id="bank-name"
                autoComplete="bank-name"
                className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                placeholder="Bank of Example"
                // value={userData.nameOfBank}
                // onChange={(e) =>
                //   setUserData({ ...userData, nameOfBank: e.target.value })
                // }
              />
            </div>
          </div>

          {/* Account number */}
          <div className="sm:col-span-4 mt-6">
            <label
              htmlFor="account-number"
              className="block text-sm font-medium leading-6 text-pink-600"
            >
              Account Number
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="account-number"
                id="account-number"
                autoComplete="account-number"
                className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                placeholder="123456789"
                // value={userData.accountNumber}
                // onChange={(e) =>
                //   setUserData({ ...userData, accountNumber: e.target.value })
                // }
              />
            </div>
          </div>

          {/* Bank branch */}
          <div className="sm:col-span-4 mt-6">
            <label
              htmlFor="bank-branch"
              className="block text-sm font-medium leading-6 text-pink-600"
            >
              Bank Branch
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="bank-branch"
                id="bank-branch"
                autoComplete="bank-branch"
                className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                placeholder="Main Branch"
                // value={userData.branch}
                // onChange={(e) =>
                //   setUserData({ ...userData, branch: e.target.value })
                // }
              />
            </div>
          </div>
          <div className="flex justify-start mt-6">
            <button
              type="button"
            //   onClick={submitPaymentDetails}
              className="inline-flex items-center justify-center py-2 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 px-4"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentDetails;
