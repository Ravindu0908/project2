import React, { useEffect, useRef, useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import { Html5Qrcode } from "html5-qrcode"; // Import the Html5Qrcode library
import axios from "axios"; // Import Axios
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import AttendenceTable from "./components/attendence/AttendenceTable";

const AttendenceManagement = () => {
  const [scanResult, setScanResult] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const html5QrcodeRef = useRef(null);

  const handleMarkAttendance = () => {
    setShowScanner(true);
    setIsScanning(true);
  };

  const handleCloseScanner = () => {
    setShowScanner(false);
    setScanResult("");
    stopScanning(); // Call stop scanning function
  };

  // Function to send attendance data to the backend
  const sendAttendanceData = async (email) => {
    try {
      // Send a POST request without body data
      const response = await axios.post(`/admin/attendance/${email}`);
      
      toast.success("Attendance marked successfully!");
      console.log("Attendance marked:", response.data);
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error("Error marking attendance. Please try again.");
    }
  };

  // Function to stop scanning
  const stopScanning = async () => {
    if (html5QrcodeRef.current) {
      try {
        await html5QrcodeRef.current.stop();
        console.log("QR code scanning stopped.");
      } catch (error) {
        console.error("Error stopping scanning: ", error);
      }
    }
    setIsScanning(false); // Ensure scanning state is updated
  };

  useEffect(() => {
    if (showScanner && isScanning) {
      const html5Qrcode = new Html5Qrcode("reader");
      html5QrcodeRef.current = html5Qrcode;

      const startScanning = async () => {
        try {
          await html5Qrcode.start(
            { facingMode: "environment" },
            {
              fps: 10,
              qrbox: 250,
            },
            (decodedText) => {
              // Parse the QR code result as JSON
              try {
                const result = JSON.parse(decodedText);
                const email = result.email; // Extract the email address
                setScanResult(email); // Update scan result to the email address
                stopScanning(); // Stop scanning after successful scan
                sendAttendanceData(email); // Send only the email to the backend
              } catch (parseError) {
                console.warn("Failed to parse QR code result: ", parseError);
                toast.error("Invalid QR code format.");
              }
            },
            (errorMessage) => {
              console.warn("QR Code scanning error: ", errorMessage);
            }
          );
        } catch (error) {
          console.error("Error starting QR code scanner: ", error);
        }
      };

      startScanning(); // Start scanning when showScanner is true

      return () => {
        stopScanning(); // Cleanup on component unmount
      };
    }
  }, [showScanner, isScanning]);

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
            <div className="sm:mx-auto sm:w-full sm:max-w-8xl max-h-screen bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg flex flex-col justify-center items-center p-4">
              <button
                onClick={handleMarkAttendance}
                className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
              >
                Mark Attendance
              </button>
              <AttendenceTable />

              {showScanner && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
                    <h2 className="text-lg font-bold mb-2">Scan QR Code</h2>
                    <div
                      id="reader"
                      style={{ width: "100%", height: "auto" }}
                    ></div>
                    <button
                      onClick={handleCloseScanner}
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Close Scanner
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AttendenceManagement;
