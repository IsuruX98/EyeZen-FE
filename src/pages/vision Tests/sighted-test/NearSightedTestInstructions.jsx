import React from "react";
import { Link } from "react-router-dom";

const NearSightedTestInstructions = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-12 md:p-24 md:px-48 md:pt-48">
      <div className="items-center">
        <h1 className="text-1xl pb-9 text-center">
          Cover your one eye at a time and do the test by going{" "}
          <b>10 feet distance</b> from the Screen. <br />
          <br />
          Say <b>'Okay'</b> If you can See. Otherwise say <b>'Not clear'</b>{" "}
          when test started
        </h1>
        <Link to={`/near-test-view`}>
          <button className="bg-[#004AAD] text-white rounded-md font-medium py-2 w-full text-xl  items-center lg:mt-0">
            Start Test
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NearSightedTestInstructions;
