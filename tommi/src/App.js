import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CategorySelection from './components/categories';
import QuizSelection from './components/quizzes';
import QuestionComponent from './components/questions';

const IntroScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div>
      <h1>Tommi</h1>
    </div>
  );
};


const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleIntroFinish = () => {
    setShowIntro(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleNextQuestion = (isCorrect) => {
    /*if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    } */
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div>
      {showIntro && <IntroScreen onFinish={handleIntroFinish} />}
      {!showIntro && !selectedCategory && (
        <CategorySelection onSelectCategory={handleCategorySelect} />
      )}
      {selectedCategory && !selectedQuiz && (
        <QuizSelection
          selectedCategory={selectedCategory}
          onSelectQuiz={handleQuizSelect}
        />
      )}
      {selectedQuiz && (
        <QuestionComponent
          question={`Spurning ${currentQuestionIndex + 1}`}
          options={['A', 'B', 'C', 'D']}
          onNextQuestion={handleNextQuestion}
        />
      )}
    </div>
  );
};

export default App;
