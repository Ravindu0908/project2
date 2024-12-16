import { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import AdminSidebar from "./components/AdminSidebar";
import UserTable from "./components/user/UserTable";
import AddUser from "./components/user/AddUser";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Ensure this is imported

const UserManagement = () => {
  const [isaddUser, setAddUser] = useState(false);
  const [users, setUser] = useState([]);

  const addUser = () => {
    setAddUser(!isaddUser);
  };

  const closeAddUser = () => {
    setAddUser(false);
  };

  const getUsers = useCallback(async () => {
    try {
      const res = await axios.get("/admin/users");
      setUser(res.data.users);
    } catch (err) {
      toast.error("Failed to load users.");
      console.error("Error fetching users:", err); // Log the error
    }
  }, []);

  const disableUser = async (userId) => {
    try {
      const res = await axios.delete(`/admin/users/${userId}`);
      await getUsers();
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.error || "Error disabling user");
      console.error("Error disabling user:", err); // Log the error
    }
  };

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
        <ToastContainer />
        <div className="px-8 min-h-screen">
          <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="flex justify-end w-full">
              <button
                onClick={addUser}
                className="flex items-center gap-4 px-4 py-2 bg-white rounded shadow-md my-4 text-pink-900 font-bold"
              >
                <Icon icon="material-symbols:add" />
                Add User
              </button>
            </div>

            {isaddUser && (
              <AddUser closeAddUser={closeAddUser} getUsers={getUsers} />
            )}

            <div className="sm:mx-auto sm:w-full sm:max-w-8xl max-h-screen bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg flex justify-center">
              <UserTable users={users} disableUser={disableUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
