import React from "react";
import { Icon } from "@iconify/react";


const BackToHomeButton = () => {
  return (
    <button
      className="fixed flex items-center gap-4 top-2 left-2 px-4 py-2 bg-white rounded shadow-md z-50 m-4 text-pink-900 font-bold"
      onClick={() => (window.location.href = "/")}
    >
      <Icon icon="ion:arrow-back" />

      Back to Home
    </button>
  );
};

export default BackToHomeButton;
