import React from "react";
import Ishihara from "../../assets/eyetests/Ishihara_00.jpg";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const ColorBlind = () => {
  return (
    <div className="mx-auto max-w-2xl mt-24 px-4  sm:px-6  lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <p className="text-5xl lg:text-7xl">
            <span className="text-[#004AAD] ">Color Blind</span> Test
          </p>
          <p className="mt-16">
            Color blindness or color vision deficiency (CVD) is the decreased
            ability to see color or differences in color. It can impair tasks
            such as selecting ripe fruit, choosing clothing, and reading traffic
            lights. Color blindness may make some academic activities more
            difficult. To detect this we will use Ishihara Test. The Ishihara
            test is a color vision test for detection of red-green color
            deficiencies. It was named after its designer, Shinobu Ishihara, a
            professor at the University of Tokyo, who first published his tests
            in 1917. The test consists of a number of Ishihara plates, which are
            a type of pseudoisochromatic plate.
          </p>
          <div className="flex justify-center mt-10">
            <Link to={"/color-blind-test"}>
              <Button btnName="Start Test" />
            </Link>
          </div>
        </div>
        <div className="flex justify-center mb-16">
          <img src={Ishihara} alt="number from ishihara" />
        </div>
      </div>
    </div>
  );
};

export default ColorBlind;
