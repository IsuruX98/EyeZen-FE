import React, { useState } from "react";
import Button from "../../components/Button";

const Questions = (props) => {
  const questions = props.data;

  // Initialize an array to store the checked state for each option
  const [checkedOptions, setCheckedOptions] = useState(
    Array(questions.length).fill(false)
  );

  //array to get input answers
  const [input, setInput] = useState([]);

  //array with predefine answers
  const answers = questions.map((item) => item.answer);
  let correctCount = 0;

  //generate final calculation
  answers.forEach((value, index) => {
    if (value === input[index]) {
      correctCount = correctCount + 1;
    }
  });

  const finalPercentage = (correctCount / answers.length) * 100;

  const selectBtn = (value, index) => {
    const updatedValues = [...input];
    updatedValues[props.num] = value;

    setInput(updatedValues);

    const updatedCheckedOptions = [...checkedOptions];
    updatedCheckedOptions[props.num] = index;

    // Update the state with the new array
    setCheckedOptions(updatedCheckedOptions);
    props.onFinalPercentatge(finalPercentage);
    props.next();
  };

  return (
    <div>
      <h1 className="text-3xl text-center mt-16">
        {questions[props.num].questions}
      </h1>
      <div className="mt-16 text-3xl ml-48 sm:ml-16 xs:ml-0  flex justify-center space-x-10">
        {questions[props.num].options.map((value, index) => (
          <div key={index}>
            <Button onClick={() => selectBtn(value, index)} btnName={value} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
