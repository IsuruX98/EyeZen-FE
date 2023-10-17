import React from "react";
import { Link } from "react-router-dom";
import failImg from "../../../assets/sigthted-test/fail.png";

const EyeSightedPass = () => {
  return (
    <div className="h-screen flex flex-col lg:flex-row mt-8 lg:mt-0 items-center lg:justify-between lg:px-36 px-8">
      <div className="flex flex-col items-center">
        <h1 className="lg:text-5xl text-3xl lg:mb-4">You have Failed!</h1>
        <h1 className="font-bold text-3xl lg:text-5xl text-[#CA3747] mb-4">
          Your Vision is not Good!
        </h1>
        <h1 className="font-semibold text-3xl lg:text-3xl ] mb-4">
          Channel a Ophthalmologist
        </h1>
        <div className="w-full">
          <Link to={`/test-view`}>
            <button className="bg-[#CA3747] text-white rounded-md font-medium py-2 w-full  mb-5 items-center lg:mt-0">
              Test Again?
            </button>
          </Link>
        </div>
      </div>
      <div>
        <img src={failImg} alt="passImg" className="lg:w-[600px] " />
      </div>
    </div>
  );
};

export default EyeSightedPass;
