import React from "react";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Macular from "../../assets/eyetests/Macular degeneration.jpg";

const MacularDegeneration = () => {
  return (
    <div className="mx-auto max-w-2xl mt-24 px-4  sm:px-6  lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <p className="text-5xl lg:text-7xl">
            <span className="text-[#004AAD] ">Macular Degeneration</span> Test
          </p>
          <p className="mt-16">
            Macular degeneration is an eye disease that affects central vision.
            This means that people with macular degeneration can't see things
            directly in front of them. This common age-related eye condition
            mostly occurs in people over the age of 50. To detect this we will
            use Amsler grid. The basic Amsler grid is a 10-centimeter by
            10-centimeter square filled with evenly spaced straight lines in a
            grid pattern. The lines form very small squares that measure 5
            millimeters on each side. There's a dot to mark the center. The
            basic grid is typically black lines on a white background, but
            variations exist.
          </p>
          <div className="flex justify-center mt-10">
            <Link to={"/macular-degeneration-test"}>
              <Button btnName="Start Test" />
            </Link>
          </div>
        </div>
        <div className="flex justify-center mb-16">
          <img src={Macular} alt="number from ishihara" />
        </div>
      </div>
    </div>
  );
};

export default MacularDegeneration;
