import React, { useState, useEffect } from "react";
import axios from "axios";
import result from "../../assets/infantVisionImg/result.jpg";
import jsPDF from "jspdf";

const Questionnaire = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [percentage, setPercentage] = useState("");

  useEffect(() => {
    // Fetch quiz questions from the backend when the component mounts
    axios.get("http://localhost:5000/api/infantQuiz").then((response) => {
      if (response.data && response.data.length > 0) {
        // Combine all questions into a single array
        const combinedQuestions = response.data.reduce(
          (accumulator, currentArray) => accumulator.concat(currentArray),
          []
        );

        setQuestions(combinedQuestions);
      }
    });
  }, []);

  const handleAnswerSelect = (questionId, selectedAnswerId) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: selectedAnswerId,
    });
    // Move to the next question
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("No more questions to display.");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      console.log("This is the first question.");
    }
  };

  const handleSubmitAnswers = () => {
    console.log(userAnswers);
    // Send userAnswers to the backend for scoring
    axios
      .post("http://localhost:5000/api/infantQuiz/check", { userAnswers })
      .then((response) => {
        setScore(response.data.score);
        // Calculate the percentage here
        const calculatedPercentage =
          (response.data.score / questions.length) * 100;
        setPercentage(calculatedPercentage);
      });
  };

  const handleButtonClick = () => {
    window.location.href = "/infant_quiz"; // Change the URL to navigate to the '/quiz' route
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Define styles
    const titleStyle = { fontSize: 24, textColor: [0, 0, 255] }; // Blue color
    const subtitleStyle = { fontSize: 18 };
    const scoreStyle = { fontSize: 18, textColor: [255, 0, 0] }; // Red color
    const suggestionStyle = { fontSize: 12 };
    const footerStyle = { fontSize: 10, textColor: [128, 128, 128] }; // Gray color
    const rangeStyle = { fontSize: 10, textColor: [50, 100, 255] }; // Gray color

    // Measure the width of the subtitle text
    const subtitleText = "Infant Vision Test Results";
    const subtitleWidth =
      (doc.getStringUnitWidth(subtitleText) * subtitleStyle.fontSize) /
      doc.internal.scaleFactor;

    // Calculate the X position to center the subtitle
    const pageWidth = doc.internal.pageSize.width;
    const subtitleX = (pageWidth - subtitleWidth) / 2;

    // Add title
    doc.setTextColor.apply(doc, titleStyle.textColor);
    doc.setFontSize(titleStyle.fontSize);
    doc.text("EyeZen", subtitleX, 10);

    // Add subtitle centered horizontally
    doc.setTextColor(0); // Reset text color to black
    doc.setFontSize(subtitleStyle.fontSize);
    doc.text(subtitleText, subtitleX, 20);

    // Add score
    doc.setTextColor.apply(doc, scoreStyle.textColor);
    doc.setFontSize(scoreStyle.fontSize);
    doc.text(`Score Obtained: ${percentage.toFixed(2)}%`, 10, 40);

    // Add suggestions
    doc.setFontSize(suggestionStyle.fontSize);
    doc.text("Vision Condition:", 10, 60);
    if (percentage < 50) {
      doc.text("Vision seems to be poor", 20, 70);
      doc.text("Highly recommended to meet an ophthalmologist", 20, 80);
    }else if (percentage < 75) {
      doc.text("Vision seems to be a bit weak", 20, 70);
      doc.text("Recommendation: Meet an ophthalmologist", 20, 80);
    } else {
      doc.text("Vision seems to be good", 20, 70);
    }

    doc.setTextColor.apply(doc, rangeStyle.textColor);
    doc.text("Vision Range Summary", 10, 100);
    doc.text("< 50%", 20, 110);
    doc.text("Poor", 60, 110);
    doc.text("50% - 75%", 20, 120);
    doc.text("Average", 60, 120);
    doc.text("75% - 100%", 20, 130);
    doc.text("Good", 60, 130);

    // Add footer
    doc.setTextColor.apply(doc, footerStyle.textColor);
    doc.setFontSize(footerStyle.fontSize);
    doc.text("EyeZen Infant Vision Test", 10, 280);

    // Save the PDF or open it in a new tab
    doc.save("infant_vision_test_results.pdf");
  };

  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];

    // Check if question is defined
    if (!question) return null;

    return (
      <div className="w-3/4 mx-auto text-center">
        <div className="mb-20">
          <span className="text-3xl font-sans font-bold text-black">
            Question {currentQuestionIndex + 1}
          </span>
          <span className="text-3xl font-sans text-blue-600 font-bold">
            &nbsp;of {questions.length}
          </span>
        </div>
        <h3 className="text-xl mt-4 mb-20">{question.question}</h3>
        <div className="grid gap-4 grid-cols-1">
          {question.answers &&
            question.answers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => handleAnswerSelect(question.id, answer.id)}
                className={`p-2 border border-gray-400 rounded-3xl mx-auto text-white text-xl w-1/4 ${
                  answer.id === userAnswers[question.id]
                    ? "bg-slate-500"
                    : answer.id === 1
                    ? "bg-blue-500"
                    : "bg-blue-400"
                }`}
              >
                {answer.answer}
              </button>
            ))}
        </div>
      </div>
    );
  };

  const displayScore = () => {
    return (
      <div className="py-20">
        {score !== null && (
          <div className="w-3/4 mx-auto mt-20 flex gap-8 mb-20">
            <div className="w-full">
              <h1 className="text-bold text-4xl mb-5">Test Results</h1>
              <h2 className="text-2xl mt-4 text-blue-600 text-bold mb-10">
                Score Obtained: {percentage.toFixed(2)}%
              </h2>
              <h3 className="text-xl text-bold mb-3">Vision Condition</h3>
              <ul className="list-disc">
              {percentage < 50 && (
                <>
                  <li>Vision seems to be poor</li>
                  <li>Highly recommended to meet an ophthalmologist</li>
                </>
              )}
              {percentage >= 50 && percentage < 75 && (
                <>
                  <li>Vision seems to be a bit weak</li>
                  <li>Recommendation: Meet an ophthalmologist</li>
                </>
              )}
              {percentage >= 75 && (
                <li>Vision seems to be good</li>
              )}
            </ul>
            </div>
            <div>
              <img src={result} alt="Result" className="w-full rounded-3xl" />
            </div>
            {/* Additional feedback or results can be displayed here */}
          </div>
        )}
        <button
          onClick={handleButtonClick}
          className="px-10 ml-40 py-3 bg-blue-600 text-white rounded-3xl hover:bg-slate-800 mb-20 mr-10"
        >
          Back To Home Page
        </button>
        <button
          onClick={generatePDF}
          className="px-10 py-3 bg-blue-600 text-white rounded-3xl hover-bg-slate-800 mb-20"
        >
          Generate PDF
        </button>
      </div>
    );
  };

  return (
    <div>
      {score === null && (
        <div className="text-center mt-20">
          {renderQuestion()}
          <div className="mt-10 mb-20">
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePreviousQuestion}
                className="px-20 py-3 bg-gray-500 text-white rounded-3xl hover:bg-gray-600 mr-2"
              >
                Previous
              </button>
            )}
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="px-20 py-3 bg-black text-white rounded-3xl hover:bg-slate-800"
              >
                Skip
              </button>
            ) : (
              <button
                onClick={handleSubmitAnswers}
                className="px-20 py-3 bg-green-500 text-white rounded-3xl hover:bg-green-600"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      )}
      {score !== null && <div>{displayScore()}</div>}
    </div>
  );
};

export default Questionnaire;
