import AppointmentsTable from "../../../components/appointment/AppointmentTable";
import ProfileSidebar from "../../../components/sidebars/ProfileSidebar";
import { useSelector } from "react-redux";

const Appoiments = () => {
  const { user } = useSelector((state) => state.user);
  const beautician = user?.beautician;
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
        {beautician.isApproved === "VERIFIED" && (
          <div>
            <div className="px-8 min-h-screen">
              <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="sm:mx-auto sm:w-full sm:max-w-8xl bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg p-8">
                  <div className="flex flex-col gap-8"></div>
                  <AppointmentsTable />
                </div>
              </div>
            </div>
          </div>
        )}

        {beautician.isApproved !== "VERIFIED" && (
          <p className="">You are not verified to view this page</p>
        )}
      </div>
    </div>
  );
};

export default Appoiments;
