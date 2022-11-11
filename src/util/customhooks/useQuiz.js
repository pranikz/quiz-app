import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../Context/DataContext";
import { QuizContext } from "../Context/QuizContext";

export const useQuiz = () => {
  const { dataDispatch } = useData();
  const { quizState, quizDispatch } = useContext(QuizContext);
  const navigate = useNavigate();
  const API = "https://636b8e2a7f47ef51e133c241.mockapi.io/api";

  const startQuiz = async () => {
    try {
      const { data, status } = await axios.post(`${API}/responses`, {});
      if (status === 201) {
        quizDispatch({ type: "START_QUIZ", payload: { id: data.id } });
        dataDispatch({ type: "FETCH_DATA" });
        try {
          const { status, data } = await axios.get(`${API}/quiz`);
          if (status === 200) {
            dataDispatch({ type: "FILL_DATA", payload: { questions: data } });
          }
        } catch (error) {
          dataDispatch({
            type: "FAILED_TO_LOAD_DATA",
            payload: { message: "Something went wrong" },
          });
        }
        navigate("/question");
      }
    } catch (error) {
      quizDispatch({
        type: "FAILED_TO_START_QUIZ",
        payload: { message: "Something went wrong" },
      });
    }
  };

  const storeResponses = async (question, selectedAnswers, time) => {
    try {
      const { data, status } = await axios.put(
        `${API}/responses/${quizState.sessionId}`,
        {
          responses: [
            ...quizState.userAnswers,
            { question, selectedAnswers, time },
          ],
        }
      );
      if (status === 200) {
        quizDispatch({
          type: "SET_RESPONSES",
          payload: { responses: data.responses },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetQuiz = async () => {
    try {
      const { data, status } = await axios.post(`${API}/responses`, {});
      if (status === 201) {
        quizDispatch({ type: "START_QUIZ", payload: { id: data.id } });
        navigate("/question");
      }
    } catch (error) {
      quizDispatch({
        type: "FAILED_TO_START_QUIZ",
        payload: { message: "Something went wrong" },
      });
    }
    quizDispatch({ type: "RESET" });
  };

  return { startQuiz, storeResponses, resetQuiz };
};
