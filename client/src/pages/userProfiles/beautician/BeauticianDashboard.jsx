import { useState } from "react";
import ProfileSidebar from "../../../components/sidebars/ProfileSidebar";
import { useSelector } from "react-redux";
import UploadCV from "../../../components/UploadCV";
import AppointmentCalendar from "../../../components/AppointmentCalendar";
import NotificationList from "../../../components/Notifications";

const BeauticianDhashboard = () => {
  const [isReSubmit, setIsReSubmit] = useState(false);
  const [date, setDate] = useState(new Date());
  const { user } = useSelector((state) => state.user);
  const beautician = user?.beautician;

  const handleDateChange = (newDate) => {
    setDate(newDate);
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
        <div className="px-8 min-h-screen">
          <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="sm:mx-auto sm:w-full sm:max-w-8xl bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg p-8">
              <div className="flex flex-col gap-8">
                {/* if status is reject */}
                {beautician?.isApproved === "REJECTED" && !isReSubmit && (
                  <div className="flex flex-col items-center justify-center h-screen ">
                    <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-md lg:max-w-xl text-center bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg p-8">
                      <h2 className="text-2xl font-bold mb-4">
                        Profile Rejected
                      </h2>
                      <p>
                        Your profile is rejected. Please update your profile and
                        submit again.
                      </p>

                      {/* resubmit button */}
                      <button
                        className="mt-5 bg-green-400"
                        onClick={() => setIsReSubmit(true)}
                      >
                        Resubmit Details
                      </button>
                    </div>
                  </div>
                )}
                {(beautician?.isApproved === "NOT_SUBMITTED" || isReSubmit) && (
                  <UploadCV />
                )}
                {/* if status is pending */}
                {beautician?.isApproved === "PENDING" && (
                  <div className="flex flex-col items-center justify-center h-screen ">
                    <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-md lg:max-w-xl text-center bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg p-8">
                      <h2 className="text-2xl font-bold mb-4">
                        Profile Verification
                      </h2>
                      <p>
                        Your profile is under verification. We will notify you
                        once the verification process is complete.
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex gap-8 w-full">
                  {/* Appointment Calendar */}
                  <AppointmentCalendar
                    date={date}
                    handleDateChange={handleDateChange}
                  />

                  {/* Notification List */}
                  <NotificationList date={date} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeauticianDhashboard;
