import React, {useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { quiz } from "../reducers/quiz";
import { Summary } from "./Summary";
import { Progress } from "./Progress";
import "./CurrentQuestion.css";

export const CurrentQuestion = () => {
  const dispatch = useDispatch();
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );
  const quizOver = useSelector(
    (state) => state.quiz.quizOver
  );

  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);

  const handleAnswer = (answerIndex) => {
    
    if(!quizOver && !answerSubmitted) {
      // Dispatch action to submit the answer
      dispatch(quiz.actions.submitAnswer({ questionId: question.id, answerIndex}));
      //Set answerSubmitted to true to indicate that the answer has been submitted
      setAnswerSubmitted(true);

      if (answerIndex === question.correctAnswerIndex){
        setCorrectAnswer(true);
      }
      else {
        setCorrectAnswer(false);
      }

    }
  };

  const handleNextQuestion = () => {
    // Check if it's the last question
    if(question.currentQuestionIndex + 1 === question.length){
      dispatch(quiz.actions.setQuizOver(true));
    }
    else {
      // Go to next question if there are more questions
      dispatch(quiz.actions.goToNextQuestion());     
    }
    setAnswerSubmitted(false);
  };

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  return (
    <div className="quiz-container">
      {quizOver? (
        <Summary />
      ) : (
        <div className="question-container">
          <h1>Disney Trivia</h1>
          <h2>{question.questionText}</h2>
          <form>
            {question.options.map((option, index) => (
              <label key={index} className="option-label"> 
              <input 
                type="radio" 
                name="answer"
                onChange={() => handleAnswer(index)} 
                checked={index === question.selectedOptionIndex}
                />
              {option}
              </label>
            ))}
          </form>
          {answerSubmitted && (
            <div className="feedback-container">
              {correctAnswer ? (
                <p className="correct-feedback">You are correct</p>
              ) : (
                <p className="incorrect-feedback">{`You are incorrect. The correct answer is ${question.options[question.correctAnswerIndex]}`}</p>
              )}
              <button className="next-button" onClick={handleNextQuestion}>
                Next
              </button>
            </div>
          )}
          <Progress />
        </div>      
        )}    
    </div>
  );
};
