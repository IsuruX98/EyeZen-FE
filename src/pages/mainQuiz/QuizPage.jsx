import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import Questions from "./Questions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import axios from "../../apis/axios";
import Loader from "../../components/Loader";

const QuizPage = () => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [finalPercentage, setFinalPercentage] = useState(0);
  const [allquestions, setAllQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllQuiz = async () => {
      try {
        const response = await axios.get("mainQuiz");
        setAllQuestions(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        setIsLoading(false);
      }
    };
    getAllQuiz();
  }, []);

  const getfinalPercentage = (finalPercentage) => {
    setFinalPercentage(finalPercentage);
  };
  // Event handler for next button
  const onNext = () => {
    if (currentIndex < allquestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate(`/main-quiz-results/${finalPercentage}`);
    }
  };

  //evnet handler for prev button
  const onPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This is the first Question!",
      });
    }
  };
  //exit button
  const onExitBtn = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be Exit from this quiz!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Quiz Cancelled!", "", "success");

        navigate("/");
      }
    });
  };

  return (
    <div className="mx-auto max-w-2xl mt-24 px-4  sm:px-6  lg:max-w-7xl lg:px-8">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <h1 className="text-5xl font-bold font-serif text-center">
              {`Question  ${currentIndex + 1} out of ${allquestions.length}`}
            </h1>
          </div>
          <Questions
            num={currentIndex}
            onFinalPercentatge={getfinalPercentage}
            data={allquestions}
            next={onNext}
          />
          <hr className="my-12 h-0.5 border-t-0 bg-gray-500 opacity-100 dark:opacity-60" />
          <div className="grid grid-cols-2 ">
            <div className="flex justify-start mb-10">
              <Button
                btnName="Prev"
                color="black"
                onClick={onPrev}
                className="rounded-lg"
              />
            </div>
            <div className="flex justify-end mb-10 ">
              <Button
                btnName="Exit"
                color="red"
                className="rounded-lg"
                onClick={onExitBtn}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizPage;
