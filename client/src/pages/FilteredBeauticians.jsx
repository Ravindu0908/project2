import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import AppointmentPopup from "../components/AppointmentPopup";
import axios from "axios";
import Footer from "../components/Footer";

const FilteredBeauticians = () => {
  const [branch, setBranch] = useState("");
  const [service, setServices] = useState("");
  const [filteredBeauticians, setFilteredBeauticians] = useState({});
  const [selectedBeautician, setSelectedBeautician] = useState(null);
  const [availableServices, setAvailableServices] = useState([]);

  const filterBeautician = useCallback(async () => {
    let url = `/public/branches/filter/`;
    if (branch !== null && branch !== "") {
      url += `${branch}/`;
    }
    url += "services/";
    if (service !== null && service !== "") {
      url += `${service}/`;
    }
    url += "beauticians";

    await axios
      .get(url)
      .then((res) => {
        setFilteredBeauticians(res.data.beauticians);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [branch, service]);

  const getAvailableServices = useCallback(async () => {
    await axios
      .get("/public/services")
      .then((res) => {
        setAvailableServices(res.data.services);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  }, []);

  useEffect(() => {
    getAvailableServices();
  }, [getAvailableServices]);

  useEffect(() => {
    filterBeautician();
  }, [filterBeautician]);

  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };

  const handleServiceChange = (event) => {
    setServices(event.target.value);
  };

  const handleAppointmentClick = (beautician) => {
    setSelectedBeautician(beautician);
  };

  const closePopup = () => {
    setSelectedBeautician(null);
  };
  const backgroundStyle = {
    backgroundImage: 'url(assets/images/bg/bg.png)',
    backgroundSize: 'cover', // This makes the image cover the entire width and height
    backgroundPosition: 'center', // This centers the image
    backgroundRepeat: 'no-repeat', // This prevents the image from repeating
    width: '100%', // Ensures the component takes up the full width of its container
  };

  return (
    <div className="min-h-screen"  style={backgroundStyle}>
      <Navbar />
      <PageHeader title="Filtered Beauticians" />
      <div className="container mx-auto py-4 px-24 min-h-screen">
        <div className="flex gap-4 w-full">
          <div className="w-full">
            <label htmlFor="branch-select" className="block mb-2 text-pink-700">
              Select Branch:
            </label>
            <select
              id="branch-select"
              value={branch}
              onChange={handleBranchChange}
              className="block w-full p-2 border border-pink-300 rounded mb-4"
            >
              <option value="">All</option>
              <option value="Colombo">Colombo</option>
              <option value="Kandy">Kandy</option>
              <option value="Jaffna">Jaffna</option>
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="branch-select" className="block mb-2 text-pink-700">
              Select Service:
            </label>
            <select
              id="service-select"
              value={service}
              onChange={handleServiceChange}
              className="block w-full p-2 border border-pink-300 rounded mb-4"
            >
              <option value="">All</option>
              {availableServices?.map((service, index) => (
                <option key={index} value={service?.id}>
                  {service?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-2 grid grid-cols-4 gap-4">
          {Object.values(filteredBeauticians)
            .flat()
            .map((b) => (
              <div
                key={b.id}
                className="bg-white drop-shadow-md rounded-xl transform hover:scale-105 duration-300 hover:shadow-lg flex flex-col p-8 justify-center items-center gap-4"
              >
                <div className="shrink-0">
                  <a
                    href="/"
                    className="relative flex h-12 w-12 items-center justify-center rounded-full text-white"
                  >
                    <img
                      src="/assets/images/logo/logo.png"
                      alt="Ruby Beauty Palor"
                      title="Ruby Beauty Palor"
                      width="48"
                      height="48"
                      className="max-w-full rounded-full"
                    />
                  </a>
                </div>
                <span className="font-bold text-2xl">
                  {capitalizeWords(`${b.user.firstName} ${b.user.lastName}`)}
                </span>
                <span>Branch - {b.branch}</span>
                <button
                  onClick={() => handleAppointmentClick(b)}
                  className="bg-pink-500 text-white px-4 py-2 rounded"
                >
                  Book Appointment
                </button>
              </div>
            ))}
        </div>
        {selectedBeautician && (
          <AppointmentPopup
            beautician={selectedBeautician}
            onClose={closePopup}
            className="z-50"
          />
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default FilteredBeauticians;
