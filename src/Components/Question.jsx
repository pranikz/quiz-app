import React, { useContext, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import { useData, QuizContext } from "../util/Context/contextExport";
import { useQuiz, useTimer } from "../util/customhooks/hookExport";
import { Option } from "./Option";
import Confetti from "../assets/Confetti";

export const Question = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const { dataState } = useData();
  const { quizDispatch } = useContext(QuizContext);
  const { questions } = dataState;
  const { time, resetTimer } = useTimer();
  const { storeResponses } = useQuiz();
  const currentQuestion = questions[questionIndex];
  console.log(questions);
  const { image, question, options } = currentQuestion;
  const navigate = useNavigate();

  const changeQuestion = () => {
    if (selectedAnswer.includes(currentQuestion.answer)) {
      quizDispatch({ type: "RIGHT_ANSWER_COUNT" });
    }
    setQuestionIndex((prev) => prev + 1);
    storeResponses(currentQuestion, selectedAnswer, time);
    setSelectedAnswer([]);
    resetTimer();
  };

  const setUserAnswer = (userAnswer) => {
    if (selectedAnswer.find((item) => item === userAnswer)) {
      setSelectedAnswer((prev) =>
        prev.filter((option) => option !== userAnswer)
      );
    } else {
      setSelectedAnswer((prev) => [...prev, userAnswer]);
    }
  };

  const submitQuiz = () => {
    if (selectedAnswer.includes(currentQuestion.answer)) {
      quizDispatch({ type: "RIGHT_ANSWER_COUNT" });
    }
    storeResponses(currentQuestion, selectedAnswer, time);
    navigate("/result");
    resetTimer();
  };
  let percentage = (questionIndex / questions.length) * 100;
  return (
    <div>
      {" "}
      <div className="h-screen  bg-[#AF9CF3] ">
        <div className="flex justify-center max-w-md mx-auto">
          <Confetti />
        </div>

        <div className="flex justify-center items-start mt-10">
          <div className="w-24 h-24 absolute top-22 md:top-16 bg-white rounded-full flex justify-center items-center">
            <CircularProgressbar
              value={percentage}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: "butt",
                pathTransitionDuration: 0.5,
                pathColor: `rgba(0, 128, 0, 1) `,
                trailColor: "#d6d6d6",
                backgroundColor: "#008000",
              })}
            />
            <div className="absolute">
              <p>
                <i className="text-4xl font-bold">{questionIndex + 1}</i>
                <span className="text-gray-500">/{questions.length}</span>
              </p>
            </div>
          </div>
          <div className="bg-white min-h-[70vh] h-auto flex flex-col max-w-sm w-full mt-16 md:mt-0 p-6  rounded-3xl">
            <p className="mt-5 text-lg font-black">{question}</p>
            {image && <img src={image} alt="social network" />}
            {options.map((option, index) => (
              <Option
                index={index}
                option={option}
                selectedAnswer={selectedAnswer}
                setUserAnswer={setUserAnswer}
              />
            ))}
            {questionIndex === questions.length - 1 ? (
              <button
                onClick={submitQuiz}
                className="self-center mt-10 bg-red-500 text-white px-28 py-2 text-lg rounded-3xl "
              >
                Submit
              </button>
            ) : (
              <button
                onClick={changeQuestion}
                disabled={selectedAnswer.length === 0 ? true : false}
                className={`self-center mt-6 md:mt-18 bg-red-500 text-white px-28 py-2 text-lg rounded-3xl  ${
                  selectedAnswer.length === 0 ? "disabled:opacity-80" : ""
                }`}
              >
                Next
                <span className="flex-row items-center-mt-10 ml-11 absolute font-semibold text-2xl">
                  →
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
