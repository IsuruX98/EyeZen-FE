import React from "react";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import Amsler from "../../../assets/eyetests/Amsler grid JPG.webp";

const MacularDegenerationTest = () => {
  return (
    <div className="mx-auto max-w-2xl mt-24 px-4  sm:px-6  lg:max-w-7xl lg:px-8">
      <div className="text-5xl text-center uppercase text-blue-600">
        Amsler Grid Test
      </div>
      <div className="ml-10 mt-10">
        <p className="text-5xl ">To perform this Test :</p>{" "}
        <div className="ml-10 mt-10 text-3xl">
          <ol className="list-decimal">
            <li>
              Make sure you are in a well-lit room. In the case that you wear
              glasses, have them on for the assessment.
            </li>
            <li>Position your eyes 12-14 inches away from the Amsler Grid.</li>
            <li>
              Cover one eye, and with the open eye, focus on the black dot in
              the center of the grid.
            </li>
            <li>
              While looking directly at the center dot, notice in your side
              vision if all grid lines look straight or if any lines or areas
              look blurry, wavy, dark or blank.
            </li>
            <li>Follow the same steps with the other eye.</li>
          </ol>
        </div>
      </div>
      <div className="mt-16 ">
        <img
          src={Amsler}
          alt="Amsler grid for macular degeneration"
          className="ml-auto mr-auto"
        />
      </div>
      <div className="mt-10 mb-10 text-3xl">
        If you notice any areas of the grid that appear darker, wavy, blank or
        blurry, contact your ophthalmologist right away. They will check to see
        what's going on.
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

export default MacularDegenerationTest;
