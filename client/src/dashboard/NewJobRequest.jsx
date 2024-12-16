import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import AdminSidebar from "./components/AdminSidebar";
import axios from "axios";
import RequestTable from "./components/request/RequestTable";
import { ToastContainer } from "react-toastify"; // Import ToastContainer

const NewJobRequest = () => {
  const [isaddUser, setAddUser] = useState(false);
  const [users, setUser] = useState([]);

  const getUsers = useCallback(async () => {
    try {
      const res = await axios.get("/admin/beautician-approvals");
      setUser(res.data.beauticians);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

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
          <div className="flex flex-col items-center min-h-screen pt-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-8xl max-h-screen bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg flex justify-center">
              <RequestTable users={users} getUsers={getUsers} />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer here as well */}
    </div>
  );
};

export default NewJobRequest;
