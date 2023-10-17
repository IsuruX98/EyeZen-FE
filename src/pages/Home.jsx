import React from "react";
import hero from "../assets/main/home.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="grid lg:grid-cols-2 px-12 pt-10 lg:pt-0 lg:px-32 gap-10">
      <div className="flex justify-center items-center h-full">
        <div>
          <h2 className="text-[56px] font-extrabold">See Clearly,</h2>
          <span className="text-[46px] font-extrabold text-[#004AAD]">
            Live Vibrantly
          </span>
          <h2 className="pt-8 text-lg font-semibold">
            Unlock a World of Visual Wellness
          </h2>
          <div className="pt-10">
            <Link
              to="/"
              className="bg-[#004AAD] text-white font-bold px-6 py-3 rounded-md mr-4 hover:bg-blue-800"
            >
              Get Started
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
  );
};

export default Home;
