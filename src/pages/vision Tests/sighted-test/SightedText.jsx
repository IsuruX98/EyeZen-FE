import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import nearSightedImg from "../../../assets/sigthted-test/sighted1.png";

const NearSighted = () => {
  const location = useLocation();
  const [content, setContent] = useState([]);

  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  useEffect(() => {
    // Update content based on the route
    if (location.pathname === "/far-sighted") {
      setContent([
        "FAR",
        "Take our farsighted eye test to check your distance vision clarity. Quickly assess if you need corrective lenses for far-distance activities.",
        "/test-view",
      ]);
    } else {
      setContent(["NEAR", "Take our nearsighted eye test to check your close-up vision clarity. Quickly assess if you need corrective lenses for reading and other up-close activities.", "/test-inst"]);
    }
  }, [location.pathname]);

  const handleButtonClick = () => {
    // Determine the target route based on the current path and the third index of the array
    const targetRoute =
      location.pathname === "/far-sighted" ? "/test-view" : content[2];

    // Navigate to the determined target route
    navigate(targetRoute);
  };

  return (
    <div className="lg:flex lg:items-center px-4 pt-12 lg:pt-0 lg:p-0 lg:h-screen lg:justify-between w-full">
      <div className="flex flex-col lg:flex-row items-center lg:justify-center h-screen">
        <div className="lg:px-24">
          <div className="flex">
            <h1 className="lg:text-5xl text-2xl font-extrabold">
              {content[0]}
            </h1>
            <h1 className="lg:text-5xl text-2xl font-extrabold text-[#004AAD]">
              SIGHTED?
            </h1>
          </div>
          <p className="text-sm md:text-1xl mt-4 lg:max-w-[580px] md:max-w-[900px] text-justify pb-8">
            {content[1]}
          </p>

          <button
            onClick={handleButtonClick}
            className="bg-[#004AAD] text-white rounded-md font-medium py-2 w-full mt-8 items-center lg:mt-0"
          >
            Start Test
          </button>
        </div>
        <div className="lg:bottom-0 lg:right-0 pt-8 lg:pt-0">
          <img
            className="lg:w-[700px] "
            src={nearSightedImg}
            alt="sighted-home"
          />
        </div>
      </div>
    </div>
  );
};

export default NearSighted;
