import React from "react";

const TreatmentCard = ({ image, title, description }) => {
  return (
    <div className="w-full lg:w-1/3 p-4 flex">
      <div className="flex-auto bg-white border rounded-lg overflow-hidden shadow-lg flex flex-col">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4 flex-grow">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="p-4 text-right">
          <button className="text-blue-500 hover:underline">Read More</button>
        </div>
      </div>
    </div>
  );
};

export default TreatmentCard;
