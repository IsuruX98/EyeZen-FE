import React from "react";
import Ishihara from "../../../assets/eyetests/color blind test.png";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";

const ColorBlindTest = () => {
  return (
    <div className="mx-auto max-w-2xl mt-24 px-4  sm:px-6  lg:max-w-7xl lg:px-8">
      <div className="text-5xl text-center uppercase text-blue-600">
        Ishihara test
      </div>
      <div className="ml-10 mt-10">
        <p className="text-5xl ">To perform this Test :</p>{" "}
        <div className="ml-10 mt-10 text-3xl">
          <ol className="list-decimal">
            <li>Sit about three feet away from your computer screen</li>
            <li>Look at each of the circles below, what do you see?</li>
            <li>Check Your Results with the below results</li>
          </ol>
        </div>
      </div>
      <div className="mt-16 ">
        <img
          src={Ishihara}
          alt="ishira test for color blindness"
          className="ml-auto mr-auto"
        />
      </div>
      <div className="mt-10 mb-10 text-3xl">
        <ul className="list-disc  ">
          <li>Upper Row : 7 , 13 , 16</li>
          <li>Below Row : 8, 12, 9</li>
        </ul>
        If you are unable to see these, you definitely have a vision problem.
      </div>
      <div className="mb-10 text-2xl font-bold">
        The tests that we propose do not have a medical value and we remind you
        that only your optometrist can give a proper diagnostic.
      </div>
      <div className="flex justify-between gap-4 md:flex-row flex-col">
        <div className="mb-10">
          <Link to={"/doctorContact/doctorList"}>
            <Button btnName="Book an Appoinment" />
          </Link>
        </div>
        <div className="mb-10">
          <Link to={"/test-home"}>
            <Button btnName="Try For another Test" color="black" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ColorBlindTest;
