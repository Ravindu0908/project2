import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import AdminSidebar from "./components/AdminSidebar";
import AddUser from "./components/user/AddUser";
import axios from "axios";
import AppointmentsTable from "./components/appointment/AppointmentTable";

const AppointmentManagement = () => {
  const [isaddUser, setAddUser] = useState(false);
  // Initial user data
  const [users, setUser] = useState([]);

  const closeAddUser = () => {
    setAddUser(false);
  };

  // get appointments
  const getAppointments = useCallback(async () => {
    axios
      .get("/admin/appointments")
      .then((res) => {
        setUser(res.data.appointments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getAppointments();
  }, [getAppointments]);

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
            {/* <div className="flex justify-end w-full">
              <button
                onClick={addUser}
                className="flex items-center gap-4 px-4 py-2 bg-white rounded shadow-md my-4 text-pink-900 font-bold"
              >
                <Icon icon="material-symbols:add" />
                Add User
              </button>
            </div> */}

            {isaddUser && (
              <AddUser closeAddUser={closeAddUser} getUsers={getUsers} />
            )}

            <div className="sm:mx-auto sm:w-full sm:max-w-8xl max-h-screen bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg flex justify-center">
              <AppointmentsTable
                appointments={users}
                getAppointments={getAppointments}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentManagement;
