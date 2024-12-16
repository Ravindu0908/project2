import React, { useState } from "react";
import { Icon } from "@iconify/react";
import AdminSidebar from "./components/AdminSidebar";
import SalaryTable from "./components/salary/SalaryTable";

const SalaryManagement = () => {
  return (
    <div>
      <AdminSidebar />
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
            <div className="sm:mx-auto sm:w-full sm:max-w-8xl max-h-screen bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg flex justify-center">
              <SalaryTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryManagement;
