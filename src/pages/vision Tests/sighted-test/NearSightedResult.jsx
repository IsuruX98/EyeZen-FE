import React from "react";
import { Link, useLocation } from "react-router-dom";
import sightedResultImg from "../../../assets/sigthted-test/sightedResultImg.png";

const NearSightedResult = () => {
  const location = useLocation();
  const result =
    location.state && location.state.visionLevel
      ? location.state.visionLevel
      : null;

  return (
    <div className="h-screen flex flex-col lg:flex-row gap-20 lg:mt-0 items-center justify-center lg:justify-between lg:px-36 px-8">
      <div className="flex flex-col items-center">
        <h1 className="lg:text-5xl text-3xl lg:mb-4">Your Vision Level is </h1>
        <h1 className="font-bold text-3xl lg:text-5xl text-[#004AAD] mb-4">
          {result}
        </h1>
        <div className="w-full">
          <Link to={`/near-test-view`}>
            <button className="bg-[#004AAD] text-white rounded-md font-medium py-2 w-full  items-center lg:mt-0">
              Test Again?
            </button>
          </Link>
        </div>
      </div>
      <div>
        <img src={sightedResultImg} alt="passImg" className="lg:w-[700px] " />
      </div>
    </div>
  );
};

export default NearSightedResult;
