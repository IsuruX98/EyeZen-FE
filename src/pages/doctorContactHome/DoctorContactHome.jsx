import React from "react";
import { Link } from "react-router-dom";
import hero from "../../assets/ayurvedic/doctorcontact.png";

const DoctorContactHome = () => {
  return (
    <div className="grid lg:grid-cols-2 px-12 pt-10 lg:pt-0 lg:px-32 gap-10">
      <div className="flex justify-center items-center h-full">
        <div>
          <h2 className="text-[46px] font-extrabold">Doctor</h2>
          <span className="text-4xl font-extrabold text-[#004AAD]">
            Contact
          </span>
          <h2 className="pt-8 text-lg font-semibold">In this section</h2>
          <p className="pt-4">
            Discover the perfect eye care specialist here! Explore our list of
            trusted doctors, view their profiles for expertise and patient
            reviews, and find their locations on our convenient map. Your
            journey to healthier vision begins now.
          </p>
          <div className="pt-8">
            <Link
              to="/doctorContact/doctorList"
              className="bg-[#004AAD] text-white font-bold px-6 py-3 rounded-md mr-4 hover:bg-blue-800"
            >
              Doctor List
            </Link>
            <Link
              to="/doctorContact/doctorMap"
              className="bg-[#004AAD] text-white font-bold px-6 py-3 rounded-md hover:bg-blue-800"
            >
              View Map
            </Link>
          </div>
        </div>
      </div>

      <div>
        <img
          className="rounded-3xl h-full w-full object-cover"
          src={hero}
          alt=""
        />
      </div>
    </div>
  );
};

export default DoctorContactHome;
