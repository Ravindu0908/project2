import { useDispatch, useSelector } from "react-redux";
import ProfileSidebarClient from "../../../components/sidebars/ProfileSidebarClient";
import { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUserValue } from "../../../state/user-slice";

const Client = () => {
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    address: user.address,
  });
  const dispatch = useDispatch();
  const fileInputRef = useRef(null); // useRef for the file input

  // Function to handle profile update
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/user/update-user", formData);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const updateProfileImage = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profileImage", file);
    axios
      .post("/user/image", formData)
      .then(({ data }) => {
        toast.success("Profile image updated successfully");
        dispatch(setUserValue(data?.user));
      })
      .catch(() => {
        toast.error("Failed to update profile image");
      });
  };

  return (
    <div>
      <ProfileSidebarClient />
      <div
        className="xl:ml-[287px]"
        style={{
          backgroundImage: "url(/assets/images/bg/bg-2.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="px-8 min-h-screen">
          <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="sm:mx-auto sm:w-full sm:max-w-8xl bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg p-8">
              <div className="flex flex-col gap-8">
                {/* Profile Picture Upload Section */}
                <div className="flex flex-col items-center">
                  <div className="mb-4">
                    {user?.profileImage ? (
                      <img
                        src={
                          import.meta.env.VITE_APP_API_URL + user.profileImage
                        }
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-32 h-32 text-5xl font-bold rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                        {formData.firstName.charAt(0)}
                        {formData.lastName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef} // attach ref to the input
                    type="file"
                    accept="image/*"
                    onChange={updateProfileImage}
                    className="hidden" // hide the actual file input
                  />
                  <button
                    onClick={() => fileInputRef.current.click()} // use ref to trigger click
                    className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-700"
                  >
                    Change Profile Picture
                  </button>
                </div>

                {/* Update User Form */}
                <form className="space-y-6" onSubmit={updateUser}>
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
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        required
                        className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                      />
                    </div>
                  </div>
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
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            lastName: e.target.value,
                          })
                        }
                        required
                        className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                      />
                    </div>
                  </div>
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
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        required
                        className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        autoComplete="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phoneNumber: e.target.value,
                          })
                        }
                        required
                        className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-700 mt-4"
                  >
                    Save Details
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Client;
