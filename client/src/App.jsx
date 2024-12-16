import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import axios from "axios";
import OTP from "./pages/Otp";
import EmailInput from "./pages/EmailInput";
import RequireAuth from "./components/RequireAuth";
import ResetPasswordOutside from "./pages/ResetPasswordOutside";
import Product from "./pages/Products";
import ProductDes from "./pages/ProductDescription";
import Aboutus from "./pages/AboutUs";
import Beautician from "./pages/userProfiles/beautician/BeauticianDetails";
import Appoiments from "./pages/userProfiles/beautician/Appoiments";
import QRCode from "./pages/userProfiles/beautician/QRCode";
import Client from "./pages/userProfiles/client/Client";
import AppoimentsClient from "./pages/userProfiles/client/Appoiments";
import OrderClient from "./pages/userProfiles/client/Orders";
import Dashboard from "./dashboard/Dashboard";
import ProductManagement from "./dashboard/ProductManagement";
import UserManagement from "./dashboard/UserManagement";
import BeauticianDhashboard from "./pages/userProfiles/beautician/BeauticianDashboard";
import FilteredBeauticians from "./pages/FilteredBeauticians";
import ServicesManagement from "./dashboard/ServicesMnagement";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import NewJobRequest from "./dashboard/NewJobRequest";
import ProductCart from "./pages/Cart";
import AppointmentManagement from "./dashboard/AppointmentManagement";
import PackagesManagement from "./dashboard/PackagesMnagement";
import DeliveryInfo from "./pages/DeliveryInfo";
import OrderManagement from "./dashboard/OrderManagement";
import ResetPasswordClient from "./pages/userProfiles/client/ResetPassword";
import ResetPasswordBeauticient from "./pages/userProfiles/beautician/ResetPassword";
import ApplyLeaves from "./pages/userProfiles/beautician/ApplyLeaves";
import LeavesAdmin from "./dashboard/Leaves";
import SalaryManagement from "./dashboard/SalaryManagement";
import AttendenceManagement from "./dashboard/AttendenceManagement";
const ROLES = {
  Client: "CLIENT",
  Beautician: "BEAUTICIAN",
  Admin: "ADMIN",
};

function App() {
  // setup axios default base url
  axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
  axios.defaults.withCredentials = true;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<Aboutus />} />

          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verify-email" element={<OTP />} />
          <Route path="/forgot-password" element={<EmailInput />} />
          <Route path="/reset-password" element={<ResetPasswordOutside />} />

          <Route path="/products" element={<Product />} />
          <Route path="/products/:productId" element={<ProductDes />} />
          <Route path="/beauticians" element={<FilteredBeauticians />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/cart" element={<ProductCart />} />
          <Route path="/delivery-info" element={<DeliveryInfo />} />

          {/* user routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Client]} />}>
            <Route path="/client" element={<Outlet />}>
              <Route index element={<Client />} />
              <Route path="appointments" element={<AppoimentsClient />} />
              <Route path="orders" element={<OrderClient />} />
              <Route path="update-password" element={<ResetPasswordClient />} />
            </Route>
          </Route>

          {/* beautician routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Beautician]} />}>
            <Route path="/beautician" element={<Outlet />}>
              <Route index element={<BeauticianDhashboard />} />
              <Route path="details" element={<Beautician />} />
              <Route path="appointments" element={<Appoiments />} />
              <Route path="leaves" element={<ApplyLeaves />} />
              <Route path="qr" element={<QRCode />} />
              <Route path="update-password" element={<ResetPasswordBeauticient />} />
            </Route>
          </Route>

          {/* admin routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/admin" element={<Outlet />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="services" element={<ServicesManagement />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="packages" element={<PackagesManagement />} />
              <Route path="request" element={<NewJobRequest />} />
              <Route path="appointments" element={<AppointmentManagement />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="salary" element={<SalaryManagement />} />
              <Route path="attendence" element={<AttendenceManagement />} />

              <Route path="leaves" element={<LeavesAdmin />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
