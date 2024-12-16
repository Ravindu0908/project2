import AdminSidebar from "./components/AdminSidebar";
import OrderTable from "./components/orders/OrderTable";

const OrderManagement = () => {
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
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="sm:mx-auto sm:w-full sm:max-w-8xl max-h-screen bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg flex justify-center">
              <OrderTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
