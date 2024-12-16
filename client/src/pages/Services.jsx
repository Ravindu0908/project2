import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import ServicesCard from "../components/cards/ServicesCard";
import Footer from "../components/Footer";

const Services = () => {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch services data from the API
    const fetchServicesData = async () => {
      try {
        const response = await axios.get("/public/packages");
        setServicesData(response.data.packages);
      } catch (error) {
        console.error("Error fetching services data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <PageHeader title="We have collected for you the most popular and effective beauty services." />
      <div>
        <ul className="max-w-[1835px] grid md:grid-cols-2 xl:grid-cols-4 gap-4 px-[5%] md:px-[10%] pb-[4%] pt-8">
          {servicesData.map((service) => (
            <li key={service.id}>
              <ServicesCard
                title={service.name} // Service name
                description={service.description} // Description of the service
                normalPrice={service.normalPrice} // Normal price
                discountedPrice={service.discountedPrice} // Discounted price
                branches={service.branches || []} // Pass branches (or empty array if undefined)
                Services={service.services || []} // Pass branches (or empty array if undefined)
              />
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
