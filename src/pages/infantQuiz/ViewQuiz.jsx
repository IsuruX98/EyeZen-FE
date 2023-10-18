import React, { useState, useEffect, useRef } from "react";
import axios from "../../apis/axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const ViewQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");
  const [editError, setEditError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const selectedQuestionRef = useRef(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("infantQuiz");
        if (response.data && response.data.length > 0) {
          const flattenedQuestions = response.data.flat();
          setQuestions(flattenedQuestions);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (selectedQuestion && selectedQuestionRef.current) {
      selectedQuestionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedQuestion]);

  const handleQuestionUpdate = (question) => {
    setSelectedQuestion(question);
    setNewAnswer(""); // Reset new answer input when updating
  };

  const handleQuestionDelete = (questionId) => {
    Swal.fire({
      title: "Delete Question",
      text: "Are you sure you want to delete this question?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(`infantQuiz/${questionId}`).then(() => {
            setQuestions((prevQuestions) =>
              prevQuestions.filter((question) => question._id !== questionId)
            );
            setSelectedQuestion(null);
            Swal.fire("Deleted!", "The question has been deleted.", "success");
          });
        } catch (error) {
          console.error("Error deleting question:", error);
          Swal.fire(
            "Error",
            "An error occurred while deleting the question.",
            "error"
          );
        }
      }
    });
  };

  const handleSaveChanges = () => {
    if (!selectedQuestion.question) {
      setEditError("Question is required.");
      return;
    }

    if (!selectedQuestion.answers || selectedQuestion.answers.length === 0) {
      setEditError("At least one answer is required.");
      return;
    }

    if (!selectedQuestion.answers.some((answer) => answer.isCorrect)) {
      setEditError("At least one answer must be correct.");
      return;
    }

    Swal.fire({
      title: "Save Changes",
      text: "Are you sure you want to save changes to this question?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .put(`infantQuiz/${selectedQuestion._id}`, selectedQuestion)
            .then(() => {
              setQuestions((prevQuestions) =>
                prevQuestions.map((question) =>
                  question._id === selectedQuestion._id
                    ? selectedQuestion
                    : question
                )
              );
              setSelectedQuestion(null);
              setEditError("");
              Swal.fire("Saved!", "Changes have been saved.", "success");
            });
        } catch (error) {
          console.error("Error updating question:", error);
          Swal.fire(
            "Error",
            "An error occurred while updating the question.",
            "error"
          );
        }
      }
    });
  };

  const handleAddNewAnswer = () => {
    if (!newAnswer) {
      setEditError("New Answer is required.");
      return;
    }
    const updatedQuestion = { ...selectedQuestion };
    updatedQuestion.answers = updatedQuestion.answers || [];
    updatedQuestion.answers.push({ answer: newAnswer, isCorrect: false });
    setNewAnswer("");
    setSelectedQuestion(updatedQuestion);
  };

  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-20">
      <div className="flex flex-row gap-4">
        <button
          onClick={() => {
            window.location.href = "/infant_create_quiz";
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-3xl mt-10 flex items-center justify-center hover-bg-blue-700 focus-outline-none focus-ring focus-border-green-500"
        >
          <span className="mr-2">
            <FaPlus />
          </span>
          Add Question
        </button>
        <button
          onClick={() => {
            window.location.href = "/infant_facts";
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-3xl mt-10 flex items-center justify-center hover-bg-blue-700 focus-outline-none focus-ring focus-border-green-500"
        >
          Infant Facts
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4 mt-10 text-center text-black">
        Quiz Questions List
      </h2>

      <div className="flex">
        <input
          type="text"
          placeholder="Search questions"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 py-2 border rounded shadow-sm mb-4 focus-outline-none focus-ring focus-border-blue-500 mx-auto"
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : filteredQuestions.length > 0 ? (
        <div className="w-3/4 mx-auto">
          {filteredQuestions.map((question) => (
            <div
              key={question._id}
              className={`mb-4 border p-4 rounded-lg shadow-lg ${
                question._id === selectedQuestion?._id ? "bg-blue-100" : ""
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">
                {question.question}
              </h3>
              <ul>
                {question.answers?.map((answer, index) => (
                  <li key={index}>
                    {answer.answer} {answer.isCorrect && "(Correct)"}
                  </li>
                ))}
              </ul>
              <div className="mt-2">
                <button
                  onClick={() => handleQuestionUpdate(question)}
                  className="text-blue-600 hover-text-blue-800 mr-2"
                >
                  <FaEdit /> Update
                </button>
                <button
                  onClick={() => {
                    handleQuestionDelete(question._id);
                  }}
                  className="text-red-600 hover-text-red-800"
                >
                  <FaTrash /> Delete
                </button>
              </div>

              {question._id === selectedQuestion?._id && (
                <div className="border p-4 rounded-lg shadow-lg bg-white">
                  <h3 className="text-lg font-semibold mb-2">Edit Question</h3>
                  <textarea
                    type="text"
                    value={selectedQuestion.question}
                    onChange={(e) => {
                      const updatedQuestion = { ...selectedQuestion };
                      updatedQuestion.question = e.target.value;
                      setSelectedQuestion(updatedQuestion);
                    }}
                    className="w-full px-3 py-2 border rounded shadow-sm mb-2 focus-outline-none focus-ring focus-border-blue-500"
                  />
                  <h4 className="text-md font-semibold mb-2">Edit Answers</h4>
                  <ul>
                    {selectedQuestion.answers?.map((answer, index) => (
                      <li key={index} className="mb-2">
                        <input
                          type="text"
                          value={answer.answer}
                          onChange={(e) => {
                            const updatedQuestion = { ...selectedQuestion };
                            updatedQuestion.answers[index].answer =
                              e.target.value;
                            setSelectedQuestion(updatedQuestion);
                          }}
                          className="w-full px-3 py-2 border rounded shadow-sm mb-1 focus-outline-none focus-ring focus-border-blue-500"
                        />
                        <label>
                          <input
                            type="checkbox"
                            checked={answer.isCorrect}
                            onChange={() => {
                              const updatedQuestion = { ...selectedQuestion };
                              updatedQuestion.answers[index].isCorrect =
                                !answer.isCorrect;
                              setSelectedQuestion(updatedQuestion);
                            }}
                          />
                          Correct Answer
                        </label>
                        <br />
                        <button
                          onClick={() => {
                            const updatedQuestion = { ...selectedQuestion };
                            updatedQuestion.answers.splice(index, 1);
                            setSelectedQuestion(updatedQuestion);
                          }}
                          className="text-red-600 hover-text-red-800"
                        >
                          Remove Answer
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="New Answer"
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      className="w-full px-3 py-2 border rounded shadow-sm focus-outline-none focus-ring focus-border-blue-500"
                    />
                    <button
                      onClick={handleAddNewAnswer}
                      className="bg-blue-600 text-white px-2 py-2 rounded hover-bg-blue-800 focus-outline-none focus-ring focus-border-blue-500"
                    >
                      Add Answer
                    </button>
                  </div>
                  {editError && (
                    <p className="text-red-500 text-sm mt-2">{editError}</p>
                  )}
                  <button
                    onClick={handleSaveChanges}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover-bg-blue-800 focus-outline-none focus-ring focus-border-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

export default ViewQuiz;
