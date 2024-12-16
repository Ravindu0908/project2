import React from "react";
import ProfileSidebarClient from "../../../components/sidebars/ProfileSidebarClient";
import AppointmentsTableClient from "../../../components/appointment/AppointmentTableClient";

const AppoimentsClient = () => {
  return (
    <div>
      <ProfileSidebarClient />
      {/* <div className="ml-[287px]"> */}
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
              {" "}
              <AppointmentsTableClient />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppoimentsClient;
