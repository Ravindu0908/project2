import { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import AdminSidebar from "./components/AdminSidebar";

import axios from "axios";
import AddPackage from "./components/packages/AddPackages";
import PackagesTable from "./components/packages/PackagesTable";

const PackegesManagement = () => {
  const [isAddPackage, setAddPackage] = useState(false);
  const [packages, setPackages] = useState([]);

  // Function to toggle Add Package modal
  const addPackage = () => {
    setAddPackage(!isAddPackage);
  };

  // Function to close Add Package modal
  const closeAddPackage = () => {
    setAddPackage(false);
  };

  // Fetch packages function
  const getPackages = useCallback(async () => {
    axios
      .get("/public/packages")
      .then((res) => {
        setPackages(res.data.packages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Fetch packages on component mount
  useEffect(() => {
    getPackages();
  }, [getPackages]);

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
                onClick={addPackage}
                className="flex items-center gap-4 px-4 py-2 bg-white rounded shadow-md my-4 text-pink-900 font-bold"
              >
                <Icon icon="material-symbols:add" />
                Add Package
              </button>
            </div>

            {/* Render AddPackage component if isAddPackage is true */}
            {isAddPackage && (
              <AddPackage
                closeAddPackages={closeAddPackage}
                getPackages={getPackages}
              />
            )}

            <div className="sm:mx-auto sm:w-full sm:max-w-8xl max-h-screen bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg flex justify-center">
              {/* Render PackagesTable component with packages data */}
              <PackagesTable packages={packages} getPackages={getPackages} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackegesManagement;
