import React from "react";
import EyeCheck from "../../assets/eyetests/doctor-testing-patient-eyesight.jpg";
import { Link } from "react-router-dom";

const diseases = [
  { path: "/near-sighted", name: "Myopia" },
  { path: "/far-sighted", name: "Far-sighted" }, //Hyperopia 
  { path: "/color-blind", name: "Color Blind" },
  { path: "/contrast-sensitvity1", name: "Contrast Sensitivity" },
  { path: "/depth-precision1", name: "Depth Precision" },
  { path: "/macular-degeneration", name: "Macular Degeneration" },
];

const AllTestHome = () => {
  const checkPhoto = EyeCheck;
  return (
    <div className="mx-auto max-w-2xl mt-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-16">
        {/* left side */}
        <div>
          <div className="text-3xl lg:text-7xl">
            Tests for <span className="text-[#004AAD]">Eye Diseases</span>
          </div>
          <div>
            <p className="font-bold text-xl mt-4 lg:mt-10 mb-4 lg:mb-10">
              In this section..
            </p>
            <p className="lg:w-[500px] ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius id
              inventore repudiandae, ad nam mollitia expedita a maxime! Mollitia
              rerum, officiis soluta labore, tempore quasi deleniti id rem,
              similique ratione quisquam. Rerum ab, repellat accusamus commodi
              totam voluptates iusto unde voluptatum iure, necessitatibus
              eveniet odit ipsum ullam tempora inventore. Sequi?
            </p>
          </div>
        </div>
        {/* right side */}
        <div>
          <img
            src={checkPhoto}
            alt="doctor testing patient eyesight"
            className="w-full lg:w-auto"
          />
        </div>
      </div>
      {/* second row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {diseases.map((value, index) => (
          <div key={index}>
            <Link to={value.path}>
              <div className="mb-8 rounded-xl bg-gray-400 hover:bg-[#004AAD] p-4 lg:p-24 shadow-lg hover:shadow-lg text-2xl lg:text-3xl text-center hover:text-white">
                <p> {value.name}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTestHome;
