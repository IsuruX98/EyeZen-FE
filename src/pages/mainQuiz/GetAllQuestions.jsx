import React, { useEffect, useState } from "react";
import axios from "../../apis/axios";
import Table from "../../components/Table";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const GetAllQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [disease, setDisease] = useState("All Types");
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await axios.get("mainQuiz");
        setQuestions(response.data);
        setDeleted(false);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getAllData();
    console.log("mounted");
  }, [deleted]);

  console.log(deleted);

  const uniqueDisease = Array.from(
    new Set(questions.map((type) => type.disease))
  );

  const fillterdDisease = questions.filter((value) => {
    return value.disease === disease;
  });

  const handleDelete = (id) => {
    const ListafterDel = questions.filter((questio) => {
      return questions._id !== id;
    });
    setQuestions(ListafterDel);
    setDeleted(true);
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="lg:flex lg:justify-center  items-center space-x-4 xs:grid xs:grid-rows-2 sm:grid sm:grid-cols-2  mt-10">
            <p className="text-center text-5xl font-bold ">All Questions</p>
          </div>

          <div className="lg:w-full px-48 mb-10">
            <div className="flex justify-end mb-10">
              <Link to={"/create-main-quiz"} className="items-end">
                <Button
                  btnName="Add a quesion"
                  color="#004AAD"
                  className="rounded-xl"
                />
              </Link>
            </div>
            <select
              onChange={(e) => setDisease(e.target.value)}
              className="w-full bg-gray-200 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
            >
              <option value="All Types">All Types</option>
              {uniqueDisease.map((disease, index) => (
                <option key={index} value={disease}>
                  {disease}
                </option>
              ))}
            </select>
          </div>

          <Table
            data={disease === "All Types" ? questions : fillterdDisease}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default GetAllQuestions;
