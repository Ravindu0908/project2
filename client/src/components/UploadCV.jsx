import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserValue } from "../state/user-slice";

const UploadCV = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("Colombo");
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("resume", selectedFile);
      formData.append("branch", selectedBranch);

      try {
        const response = await axios.post("/beautician/resume", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setUploadStatus("File uploaded successfully");
        if (response.data?.user) {
          dispatch(setUserValue(response.data.user));
        }
      } catch (error) {
        setUploadStatus("File upload failed");
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-16 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-pink-500">Upload Your CV</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="peer block w-full appearance-none rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
      />
      <select
        value={selectedBranch}
        onChange={handleBranchChange}
        className="block w-full mt-4 rounded-lg border border-pink-400 bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0"
      >
        <option value="Colombo">Colombo</option>
        <option value="Kandy">Kandy</option>
        <option value="Jaffna">Jaffna</option>
      </select>
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-700 mt-4"
      >
        Upload
      </button>
      {uploadStatus && <p className="mt-4 text-lg">{uploadStatus}</p>}
    </div>
  );
};

export default UploadCV;
