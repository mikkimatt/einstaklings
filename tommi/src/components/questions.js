import React from "react";
import { motion, Variants } from "framer-motion";

const QuestionComponent = ({ question, options, onNextQuestion }) => {
  const handleOptionSelect = (option) => {


    onNextQuestion();
  };

  return (
    <div>
      <h3>{question}</h3>
      {options.map((option, index) => (
        <button key={index} onClick={() => handleOptionSelect(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default QuestionComponent;