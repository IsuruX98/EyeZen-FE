import React, { useContext } from "react";
import { Link } from "react-router-dom";
import hero from "../../assets/main/home.png";
import { AuthContext } from "../../context/authContext";

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="grid lg:grid-cols-2 px-12 pt-10 lg:pt-0 lg:px-32 gap-10">
        <div className="flex justify-center items-center h-full">
          <div>
            <h2 className="text-[56px] font-extrabold">Welcome</h2>
            <span className="text-[46px] font-extrabold text-[#004AAD]">
              Admin
            </span>
            <h2 className="pt-8 text-2xl font-semibold">{user.name}</h2>
            <div className="pt-10">
              <Link
                to="/admin"
                className="bg-[#004AAD] text-white font-bold px-6 py-3 rounded-md mr-4 hover:bg-blue-800"
              >
                View Statistics
              </Link>
            </div>
          </div>
        </div>

        <div>
          <img
            className="rounded-3xl lg:h-[635px] h-full w-full object-cover"
            src={hero}
            alt=""
          />
        </div>
      </div>
      <div className="lg:px-28 px-12 py-3">
        <span className="text-xl font-bold ">Sections</span>
      </div>
      <div className="grid lg:grid-cols-3 lg:gap-4 gap-3 mt-5 lg:px-24 px-12 lg:pb-5">
        {/* Button Cards */}
        <Link
          to="/adminTreatmentList"
          className="bg-gray-200 hover:bg-[#004AAD] hover:text-white text-[#004AAD] font-bold py-10 rounded-lg text-center cursor-pointer"
        >
          Ayurvedic Treatments
        </Link>
        <Link
          to="/adminTVideoTutorialList"
          className="bg-gray-200 text-[#004AAD] hover:bg-[#004AAD] hover:text-white font-bold py-10 rounded-lg text-center cursor-pointer"
        >
          Video Tutorials
        </Link>
        <Link
          to="/adminDoctorList"
          className="bg-gray-200 text-[#004AAD] hover:bg-[#004AAD] hover:text-white font-bold py-10 rounded-lg text-center cursor-pointer"
        >
          Doctor Contacts
        </Link>
      </div>
      <div className="grid lg:grid-cols-3 lg:gap-4 gap-3 lg:mt-5 mt-4 lg:px-24 px-12 pb-28">
        {/* Button Cards */}
        <Link
          to="/view-all-questions"
          className="bg-gray-200 hover:bg-[#004AAD] hover:text-white text-[#004AAD] font-bold py-10 rounded-lg text-center cursor-pointer"
        >
          Main Quizes
        </Link>
        <Link
          to="/infant_view_quiz"
          className="bg-gray-200 text-[#004AAD] hover:bg-[#004AAD] hover:text-white font-bold py-10 rounded-lg text-center cursor-pointer"
        >
          Infant Quizes
        </Link>
        <Link
          to="/addText-form"
          className="bg-gray-200 text-[#004AAD] hover:bg-[#004AAD] hover:text-white font-bold py-10 rounded-lg text-center cursor-pointer"
        >
          Add Text for sighted Test
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
