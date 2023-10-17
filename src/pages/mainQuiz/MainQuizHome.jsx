import StepperComponent from "../../components/StepperComponent.jsx";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Data from "../../assets/data.js";

const MainQuizHome = () => {
  const quizDeatils = Data;
  return (
    <div className="mx-auto max-w-2xl mt-24 px-4  sm:px-6  lg:max-w-7xl lg:px-8">
      <div>
        <div className="text-5xl text-center">
          Take the Quick
          <span className="text-[#004AAD]"> Online Suitability Quiz</span>
        </div>
      </div>
      <div className="mt-16">
        Welcome to the Vision Test, a comprehensive assessment designed to
        evaluate your visual acuity and detect common vision problems. This test
        aims to provide you with valuable insights into your eye health. It's a
        simple yet effective way to gauge your vision and identify potential
        issues that may require further attention.....
      </div>
      <div>
        <div className="mx-auto max-w-2xl px-4  sm:px-4 sm:py-15 lg:max-w-7xl lg:px-8">
          <StepperComponent data={quizDeatils} />
        </div>
      </div>
      <div className="mb-5 text-center font-bold">
        <h1>
          Thank you for choosing our Vision Test. Let's get started on the
          journey to better eye health!
        </h1>
      </div>
      <div className="flex justify-center mb-10">
        <Link to="/main-questions">
          <Button btnName="Start Quiz" />
        </Link>
      </div>
    </div>
  );
};

export default MainQuizHome;
