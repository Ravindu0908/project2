import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUserValue } from "../../../state/user-slice";
import UpdatePassword from "../../UpdatePassword";
import ProfileSidebar from "../../../components/sidebars/ProfileSidebar";

const ResetPasswordBeauticient = () => {
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
      <ProfileSidebar />
      <div
        className="xl:ml-[287px]"
        style={{
          backgroundImage: "url(/assets/images/bg/bg-2.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <UpdatePassword />
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

export default ResetPasswordBeauticient;
