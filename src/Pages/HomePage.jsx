import "../App.css";
import Upraisedlogo from "../assets/UpraisedLogo.png";
import { useData } from "../util/Context/contextExport";
import { useQuiz } from "../util/customhooks/useQuiz";

export const HomePage = () => {
  const { dataState } = useData();
  const { status } = dataState;
  const { startQuiz } = useQuiz();

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(175, 156, 243, 0) 7.92%, #AF9CF3 86.48%)",
        backgroundBlendMode: "multiply",
      }}
      className="h-screen flex flex-col justify-around items-center"
    >
      <img className="w-64" src={Upraisedlogo} alt="upraised logo" />
      <div
        className="w-60 h-60 rounded-full border flex justify-center items-center 
      bg-white text-red-500"
      >
        <span className="font-poppins text-7xl">Quiz</span>
      </div>
      <button
        onClick={startQuiz}
        className="bg-red-500 text-white px-28 py-5 text-4xl rounded-full "
      >
        {status === "loading" ? "Loading..." : "Start"}
      </button>
    </div>
  );
};
