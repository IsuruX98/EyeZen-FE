import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "../apis/axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { initTE, Ripple } from "tw-elements";

const Table = (props) => {
  useEffect(() => {
    initTE({ Ripple });
  }, []);

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure you want to delete this Question?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });
    //check the button confirmation
    if (confirmResult.isConfirmed) {
      try {
        await axios.delete(`mainQuiz/${id}`);
        Swal.fire("Question Deleted!", "", "success");
        props.onDelete(id);
      } catch (err) {
        console.log(err);
        Swal.fire(err.message, "", "error");
      }
    }
  };

  return (
    <div className="mx-auto max-w- px-4 lg:w-full sm:px-6   lg:px-8 mb-24">
      <div className="lg:w-full px-48 mb-10">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center text-sm font-light">
                  <thead className="border-b bg-[#004AAD] font-medium dark:border-neutral-800 text-white">
                    <tr>
                      <th scope="col" className=" px-6 py-4">
                        No
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Disease
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Question
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Option1
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        option2
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Answer
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {props.data.map((value, index) => (
                    <tbody key={value._id} className="hover:bg-gray-200">
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-wrap  px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-wrap  px-6 py-4">
                          {value.disease}
                        </td>
                        <td className="whitespace-wrap  px-6 py-4">
                          {value.questions}
                        </td>
                        <td className="whitespace-wrap  px-6 py-4">
                          {value.options[0]}
                        </td>
                        <td className="whitespace-wrap  px-6 py-4">
                          {value.options[1]}
                        </td>
                        <td className="whitespace-wrap  px-6 py-4">
                          {value.answer}
                        </td>
                        <td className="whitespace-wrap  px-6 py-4">
                          <div className="flex justify-center space-x-2">
                            <Link to={`/update-main-quiz/${value._id}`}>
                              <div>
                                <button className="text-blue-500 hover:text-blue-700 transition duration-300 inline-block px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200">
                                  update
                                </button>
                              </div>
                            </Link>
                            <div>
                              <button
                                onClick={() => handleDelete(value._id)}
                                className="text-red-500 hover:text-red-700 transition duration-300 inline-block lg:ml-3 px-3 py-1 rounded-lg lg:mt-0 mt-2 bg-red-100 hover:bg-red-200"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
