import { useState } from "react";
import { useSelector } from "react-redux";
import ProfileSidebar from "../../../components/sidebars/ProfileSidebar";
import { Icon } from "@iconify/react";
import LeaveRequestModal from "../../../components/leaves/LeaveRequestModal";
import ViewLeaves from "../../../components/leaves/ViewLeaves";
import { toast, ToastContainer } from "react-toastify"; // Import toast here
import "react-toastify/dist/ReactToastify.css";

const ApplyLeaves = () => {
  const { user } = useSelector((state) => state.user);
  const beautician = user?.beautician;
  const beauticianId = user?.beautician.id;
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Function to show toast notifications
  const showToast = (message, type = "info") => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    } else {
      toast.info(message);
    }
  };

  return (
    <div>
      <ProfileSidebar />
      <div
        className="ml-[287px]"
        style={{
          backgroundImage: "url(/assets/images/bg/bg-2.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {beautician.isApproved === "VERIFIED" ? (
          <div className="flex flex-col justify-center items-center min-h-screen">
            <button
              onClick={openModal}
              className="flex items-center gap-4 px-4 py-2 bg-white rounded shadow-md my-4 text-pink-900 font-bold"
            >
              <Icon icon="material-symbols:add" />
              Request Leave
            </button>

            {/* Modal Component */}
            <LeaveRequestModal 
              isOpen={showModal} 
              onClose={closeModal} 
              showToast={showToast} // Pass showToast as a prop
            />

            {/* Leaves Table */}
            <div className="px-8 min-h-screen w-full">
              <div className="flex flex-col justify-items-center min-h-screen">
                <div className="sm:mx-auto sm:w-full sm:max-w-8xl max-h-screen bg-white drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg flex justify-center">
                  <ViewLeaves beauticianId={beauticianId} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>You are not verified to view this page</p>
        )}
      </div>
      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default ApplyLeaves;
