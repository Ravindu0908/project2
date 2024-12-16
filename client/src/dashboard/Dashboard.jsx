import { useEffect, useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import Card from "./components/cards/Card";
import ChartOne from "./components/charts/ChartOne";
import OrdersOverview from "./components/charts/OrdersOverview";
import axios from "axios";

const Dashboard = () => {
  const [data, getData] = useState([]);
  const [months, setMonths] = useState([]);
  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    //clear the arrays
    setMonths([]);
    setOrders([]);
    setAppointments([]);
    axios
      .get("/admin/statistics")
      .then(({ data }) => {
        getData(data);
        let tempMonths = [];
        let tempOrders = [];
        let tempAppointments = [];
        data.statByMonth.map((item) => {
          tempMonths.push(item.monthName);
          tempOrders.push(item.orders);
          tempAppointments.push(item.appointments);
        });
        setMonths(tempMonths);
        setOrders(tempOrders);
        setAppointments(tempAppointments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <AdminSidebar />
      <div
        className="xl:ml-[287px]"
        style={{
          backgroundImage: "url(./assets/images/bg/bg-2.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="px-8 min-h-screen">
          <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="sm:mx-auto sm:w-full sm:max-w-8xl bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg p-8 my-8">
              <div className="grid grid-cols-3 gap-8">
                <Card
                  title="Total Beauticients"
                  subtitle="Approved"
                  count={data?.beauticians || 0}
                />
                <Card
                  title="Total Users"
                  subtitle="Registerd"
                  count={data?.users || 0}
                />
                <Card
                  title="Total Appoiments"
                  subtitle="Pending"
                  count={data?.appointments || 0}
                />
              </div>
              <div className="flex flex-col gap-16 pt-8">
                <ChartOne months={months} appointments={appointments} />
                <OrdersOverview orders={orders} months={months} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
