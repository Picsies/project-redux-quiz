import React from "react";
import { useSelector } from "react-redux";

export const Progress = () => {
  const currentQuestionIndex = useSelector(
    (state) => state.quiz.currentQuestionIndex
  );
  const totalQuestions = useSelector((state) => state.quiz.questions.length);

  return <p>{`Question ${currentQuestionIndex + 1}/${totalQuestions}`}</p>;
};