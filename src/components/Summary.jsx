import React from "react";
import { useSelector } from "react-redux";

export const Summary = () => {
  const answers = useSelector((state) => state.quiz.answers);
  const totalQuestions = useSelector((state) => state.quiz.questions.length);
  const correctAnswers = answers.filter((answer) => answer.isCorrect).length;
  const incorrectAnswers = totalQuestions - correctAnswers;

  return (
    <div>
      <h1>Quiz Summary</h1>
      <p>{`You got ${correctAnswers} questions correct and ${incorrectAnswers} questions incorrect.`}</p>
      <ul>
        {answers.map((answer) => (
          <li key={answer.questionId}>
            {answer.isCorrect ? "Correct" : "Incorrect"}: {answer.question.questionText}
            <br />
            Your answer: {answer.answer}
            <br />
            Correct answer: {answer.question.options[answer.question.correctAnswerIndex]}
          </li>
        ))}
      </ul>
    </div>
  );
};