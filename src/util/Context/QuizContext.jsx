import { createContext, useReducer } from "react";
import { quizReducer } from "../Reducers/quizReducers";

const QuizContext = createContext();

const initialState = {
  sessionId: "",
  error: "",
  userAnswers: [],
  rightAnswerCount: 0,
};

const QuizContextProvider = ({ children }) => {
  const [quizState, quizDispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ quizState, quizDispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContextProvider, QuizContext };
