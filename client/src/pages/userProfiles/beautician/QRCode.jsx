import { useSelector } from "react-redux";
import ProfileSidebar from "../../../components/sidebars/ProfileSidebar";

const QRCode = () => {
  const { user } = useSelector((state) => state.user);
  const beautician = user?.beautician;
  return (
    <div>
      <ProfileSidebar />

      {beautician.isApproved === "VERIFIED" && (
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
              <div className="sm:mx-auto sm:w-full sm:max-w-8xl max-h-screen bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg flex justify-center">
                <img
                  src={import.meta.env.VITE_APP_API_URL + beautician.qr}
                  alt={beautician.qr}
                  className="inset-0 w-[400px] h-full object-cover z-[-1] "
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {beautician.isApproved !== "VERIFIED" && (
        <div className="xl:ml-[287px]">
          <p className="">You are not verified to view this page</p>
        </div>
      )}
    </div>
  );
};

export default QRCode;
