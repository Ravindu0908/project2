import React from "react";
import { Icon } from "@iconify/react";

const ServicesCard = ({ title, description, normalPrice, discountedPrice, branches, Services }) => {
  return (
    <div className="bg-white text-center drop-shadow-md rounded-xl transform hover:scale-105 duration-300 hover:shadow-lg h-full">
      <div className="p-4">
        <div className="flex justify-center">
          <Icon icon="material-symbols:health-and-beauty" className="text-8xl text-pink-500 py-4" />
        </div>
        <h2 className="mb-2 text-lg text-pink-500 font-bold">{title}</h2>
        <p className="mb-2 text-base text-gray-700">{description}</p>
        <p className="mb-2 text-base text-gray-900">Normal Price: {normalPrice} LKR</p>
        <p className="mb-2 text-base text-pink-700 font-bold">Discounted Price: {discountedPrice} LKR</p>

        {/* Services List */}
        <h3 className="text-lg font-semibold text-gray-800 mt-4">Included Services:</h3>
        {Services && Services.length > 0 ? (
          <ul className="text-base text-gray-700">
            {Services.map((serviceItem, index) => (
              <li key={index}>{serviceItem.service.name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-base text-gray-500">No services available.</p>
        )}

        {/* Branches List */}
        <h3 className="text-lg font-semibold text-gray-800 mt-4">Available at:</h3>
        {branches && branches.length > 0 ? (
          <ul className="text-base text-gray-700">
            {branches.map((branch, index) => (
              <li key={index}>{branch.branch}</li>
            ))}
          </ul>
        ) : (
          <p className="text-base text-gray-500">No branches available.</p>
        )}
      </div>
    </div>
  );
};

export default ServicesCard;
