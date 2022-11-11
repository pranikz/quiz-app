import React, { useContext } from "react";
import GaugeChart from "react-gauge-chart";
import { QuizContext } from "../util/Context/QuizContext";
import { useQuiz } from "../util/customhooks/useQuiz";
import Confetti from "../assets/Confetti";

export const ResultPage = () => {
  const { quizState } = useContext(QuizContext);
  const { resetQuiz } = useQuiz();
  let res = quizState.rightAnswerCount / quizState.userAnswers.length;

  return (
    <div className="h-screen bg-[#AF9CF3] ">
      <div className="flex justify-center max-w-md mx-auto">
        <Confetti />
      </div>
      <div className="flex justify-center items-center mt-20">
        <div className="bg-white p-6 rounded-3xl">
          <GaugeChart
            id="gauge-chart3"
            arcPadding={0.1}
            cornerRadius={3}
            nrOfLevels={1}
            colors={["#00cc00"]}
            arcWidth={0.1}
            percent={res}
          />
          <div className="flex justiffirsty-start items-center bg-sky-100 p-3 my-2 rounded-lg">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <p className="ml-3">
              <span>
                {quizState.userAnswers.length - quizState.rightAnswerCount}
              </span>
              <span className="ml-3">InCorrect</span>
            </p>
          </div>
          <div className="flex justify-start items-center bg-pink-100 p-2 my-2 rounded-lg">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <p className="ml-3">
              <span>{quizState.rightAnswerCount}</span>
              <span className="ml-3">Correct</span>
            </p>
          </div>
          <button
            onClick={resetQuiz}
            className="bg-red-500 text-white px-28 py-2 mt-5 text-lg rounded-3xl"
          >
            Start Again
          </button>
        </div>
      </div>
    </div>
  );
};
