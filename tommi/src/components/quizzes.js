import './quizzes.css';
import React from 'react';
import { render } from 'react-dom';
import { motion } from "framer-motion";


const QuizSelection = ({ selectedCategory, onSelectQuiz }) => {
    const quizzes = ['1', '2', '3']; 
  
    return (
      <div className="quiz-container">
        <h2>{selectedCategory}</h2>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}/>
        {quizzes.map((quiz, index) => (
          <button key={index} onClick={() => onSelectQuiz(quiz)}>
            {quiz}
          </button>
        ))}
      </div>
    );
  };

export default QuizSelection;