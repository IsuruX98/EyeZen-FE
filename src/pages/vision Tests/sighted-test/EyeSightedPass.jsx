import React from "react";
import { Link } from "react-router-dom";
import passImg from "../../../assets/sigthted-test/pass.png";

const EyeSightedPass = () => {
  return (
    <div className="h-screen flex flex-col lg:flex-row mt-8 lg:mt-0 items-center lg:justify-between lg:px-36 px-8">
      <div className="flex flex-col items-center">
        <h1 className="lg:text-5xl text-3xl lg:mb-4">
          You have read all texts...
        </h1>
        <h1 className="font-bold text-3xl lg:text-5xl text-[#004AAD] mb-4">
          Your Vision is Good!
        </h1>
        <div className="w-full">
          <Link to={`/test-view`}>
            <button className="bg-[#004AAD] text-white rounded-md font-medium py-2 w-full  items-center lg:mt-0">
              Test Again?
            </button>
          </Link>
        </div>
      </div>
      <div>
        <img src={passImg} alt="passImg" className="lg:w-[600px] " />
      </div>
    </div>
  );
};

export default EyeSightedPass;
