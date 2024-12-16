import { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import AdminSidebar from "./components/AdminSidebar";
import axios from "axios";
import AddService from "./components/services/AddServices";
import ServiceTable from "./components/services/ServicesTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ServicesManagement = () => {
  const [isAddService, setAddService] = useState(false);
  const [services, setServices] = useState([]);

  // Function to toggle Add Service modal
  const addService = () => {
    setAddService(!isAddService);
  };

  // Function to close Add Service modal
  const closeAddService = () => {
    setAddService(false);
  };

  // Fetch services function
  const getServices = useCallback(async () => {
    axios
      .get("/admin/services")
      .then((res) => {
        setServices(res.data.services);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch services.");
      });
  }, []);

  // Fetch services on component mount
  useEffect(() => {
    getServices();
  }, [getServices]);

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
          <div className="flex flex-col items-center min-h-screen">
            <div className="flex justify-end w-full">
              <button
                onClick={addService}
                className="flex items-center gap-4 px-4 py-2 bg-white rounded shadow-md my-4 text-pink-900 font-bold"
              >
                <Icon icon="material-symbols:add" />
                Add Service
              </button>
            </div>

            {/* Render AddService component if isAddService is true */}
            {isAddService && (
              <AddService
                closeAddService={closeAddService}
                getServices={getServices}
              />
            )}

            <div className="sm:mx-auto sm:w-full sm:max-w-8xl max-h-screen bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg flex justify-center">
              {/* Render ServiceTable component with services data */}
              <ServiceTable services={services} getServices={getServices} />
            </div>
          </div>
        </div>
      </div>

      {/* Toastify container */}
      <ToastContainer />
    </div>
  );
};

export default ServicesManagement;
