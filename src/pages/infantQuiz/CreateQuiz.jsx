import React, { useState } from "react";
import axios from "../../apis/axios";
import Swal from "sweetalert2";

const CreateQuizQuestion = () => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([
    { answer: "", isCorrect: false },
    { answer: "", isCorrect: false },
  ]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAnswerChange = (index, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].answer = answer;
    setAnswers(updatedAnswers);
  };

  const handleIsCorrectChange = (index, isCorrect) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].isCorrect = isCorrect;
    setAnswers(updatedAnswers);
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, { answer: "", isCorrect: false }]);
  };

  const handleRemoveAnswer = (index) => {
    if (answers.length > 2) {
      const updatedAnswers = [...answers];
      updatedAnswers.splice(index, 1);
      setAnswers(updatedAnswers);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Minimum two answers required",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !validateQuestion() ||
      !validateAnswers() ||
      !validateCorrectAnswers()
    ) {
      return;
    }

    try {
      const response = await axios.post("infantQuiz", {
        question: question,
        answers: answers,
      });

      if (response.data.status === "ok") {
        // Quiz question successfully created
        setQuestion("");
        setAnswers([
          { answer: "", isCorrect: false },
          { answer: "", isCorrect: false },
        ]);
        setErrorMessage("");
        Swal.fire({
          title: "Success!",
          text: "Quiz question added successfully!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/infant_view_quiz";
          }
        });
      } else {
        setErrorMessage("Failed to create quiz question.");
        Swal.fire({
          title: "Error",
          text: "Failed to create quiz",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error creating quiz question:", error);
      setErrorMessage("An error occurred while creating the quiz question.");
    }
  };

  const validateQuestion = () => {
    if (!question) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Question is required",
      });
      return false;
    }

    if (question.length < 5) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Question must be atleast 5 characters",
      });
      return false;
    }
    return true;
  };

  const validateAnswers = () => {
    if (answers.length < 2) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Minimum two answers required",
      });
      return false;
    }
    for (const answer of answers) {
      if (!answer.answer) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Answer is required for all options",
        });
        return false;
      }
    }
    return true;
  };

  const validateCorrectAnswers = () => {
    if (!answers.some((answer) => answer.isCorrect)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "At least one answer must be correct",
      });
      return false;
    }
    return true;
  };

  const saveData = (e) => {
    e.preventDefault();
    if (
      !validateQuestion() ||
      !validateAnswers() ||
      !validateCorrectAnswers()
    ) {
      return;
    }
    handleSubmit(e);
  };

  return (
    <div className="lg:px-96 lg:py-32 px-20 py-32">
      <h2 className="text-4xl font-bold mb-6 text-[#004AAD]">
        Create Quiz Question
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-4 py-3 border rounded focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Answers:</label>
          {answers.map((answer, index) => (
            <div key={index} className="mb-4 flex items-center space-x-2">
              <input
                type="text"
                value={answer.answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="w-full px-4 py-3 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={answer.isCorrect}
                  onChange={(e) =>
                    handleIsCorrectChange(index, e.target.checked)
                  }
                  className="form-checkbox h-6 w-6 text-blue-500"
                />
                <span className="text-lg font-semibold">Correct</span>
              </label>
              {answers.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleRemoveAnswer(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAnswer}
            className="text-blue-600 hover:text-blue-800"
          >
            Add Answer
          </button>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-lg mb-4">{errorMessage}</p>
        )}
        <div className="flex items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded mr-4 hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Create Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuizQuestion;

// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// const CreateQuizQuestion = () => {
//   const [question, setQuestion] = useState("");
//   const [answers, setAnswers] = useState([
//     { answer: "", isCorrect: false },
//     { answer: "", isCorrect: false },
//   ]);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleAnswerChange = (index, answer) => {
//     const updatedAnswers = [...answers];
//     updatedAnswers[index].answer = answer;
//     setAnswers(updatedAnswers);
//   };

//   const handleIsCorrectChange = (index, isCorrect) => {
//     const updatedAnswers = [...answers];
//     updatedAnswers[index].isCorrect = isCorrect;
//     setAnswers(updatedAnswers);
//   };

//   const handleAddAnswer = () => {
//     setAnswers([...answers, { answer: "", isCorrect: false }]);
//   };

//   const handleRemoveAnswer = (index) => {
//     const updatedAnswers = [...answers];
//     updatedAnswers.splice(index, 1);
//     setAnswers(updatedAnswers);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:5000/api/infantQuiz", {
//         question: question,
//         answers: answers,
//       });

//       if (response.data.status === "ok") {
//         // Quiz question successfully created
//         setQuestion("");
//         setAnswers([{ answer: "", isCorrect: false }, { answer: "", isCorrect: false }]);
//         setErrorMessage("");
//         Swal.fire({
//           title: "Success!",
//           text: "Quiz question added successfully!",
//           icon: "success",
//         });
//       } else {
//         setErrorMessage("Failed to create quiz question.");
//         Swal.fire({
//           title: "Error",
//           text: "Failed to create quiz",
//           icon: "error",
//         });
//       }
//     } catch (error) {
//       console.error("Error creating quiz question:", error);
//       setErrorMessage("An error occurred while creating the quiz question.");
//     }
//   };

//   const saveData = (e) => {
//     // Accept an event object as a parameter
//     e.preventDefault(); // Prevent the default behavior of the event
//     // Validation
//     if (!question) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Question Required",
//       });
//       return;
//     }

//     handleSubmit(e); // Pass the event object to handleSubmit
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8 mb-8 p-4 border rounded-lg shadow-lg">
//       <h2 className="text-2xl font-semibold mb-4">Create Quiz Question</h2>
//       <form onSubmit={saveData}>
//         <div className="mb-4">
//           <label className="block text-sm font-semibold">Question:</label>
//           <input
//             type="text"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}

//             className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-semibold">Answers:</label>
//           {answers.map((answer, index) => (
//             <div key={index} className="mb-2 flex items-center space-x-2">
//               <input
//                 type="text"
//                 value={answer.answer}
//                 onChange={(e) => handleAnswerChange(index, e.target.value)}

//                 className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
//               />
//               <label className="flex items-center space-x-1">
//                 <input
//                   type="checkbox"
//                   checked={answer.isCorrect}
//                   onChange={(e) => handleIsCorrectChange(index, e.target.checked)}
//                   className="form-checkbox h-5 w-5 text-blue-500"
//                 />
//                 <span className="text-sm">Correct</span>
//               </label>
//               {answers.length > 2 && (
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveAnswer(index)}
//                   className="text-red-600 hover:text-red-800"
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={handleAddAnswer}
//             className="text-blue-600 hover:text-blue-800"
//           >
//             Add Answer
//           </button>
//         </div>
//         {errorMessage && (
//           <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
//         )}
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-500"
//         >
//           Create Question
//         </button>
//         <button
//           onClick={() => {
//             window.location.href = '/infant_view_quiz';
//           }}
//           className="bg-blue-600 text-white ml-5 px-4 py-2 rounded hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-500"
//         >
//           Back
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateQuizQuestion;
