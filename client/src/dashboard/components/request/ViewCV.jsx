/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";

const ViewCV = ({ user, closeViewCV, getUsers }) => {
  const [cvData, setCvData] = useState(null);

  useEffect(() => {
    // Fetch the CV details for the selected user
    axios
      .get(`${user?.resume}`, {
        responseType: "blob",
      })
      .then((res) => {
        const pdfUrl = URL.createObjectURL(res.data);
        setCvData(pdfUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  const handleApprove = () => {
    axios
      .post(`/admin/beautician-approvals/${user.id}`)
      .then(() => {
        getUsers();
        closeViewCV();
        alert("Beautician approved successfully!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Beautician approved Faild! To Many Requests");
        window.location.reload(); 
      });
  };

  const handleReject = () => {
    axios
      .delete(`/admin/beautician-approvals/${user.id}`)
      .then(() => {
        getUsers();
        closeViewCV();
        alert("Beautician rejected successfully!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Beautician rejected successfully!");
        window.location.reload(); 
      });
  };

  return (
    <div className="absolute z-10 top-5 bottom-5 min-h-[80vh] overflow-auto bg-white p-16 sm:mx-auto sm:w-full sm:max-w-4xl shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg">
      <button
        onClick={closeViewCV}
        className="absolute top-4 right-4 bg-red-500 text-white rounded-lg px-4 py-2"
      >
        Close
      </button>
      {cvData ? (
        <iframe
          src={cvData}
          width="100%"
          height="600px"
          className="border rounded"
        />
      ) : (
        <p>Loading CV...</p>
      )}
      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={handleApprove}
          className="bg-green-500 text-white rounded-lg px-4 py-2"
        >
          Approve
        </button>
        <button
          onClick={handleReject}
          className="bg-red-500 text-white rounded-lg px-4 py-2"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ViewCV;
