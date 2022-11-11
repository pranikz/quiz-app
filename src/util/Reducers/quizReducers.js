export const quizReducer = (state, action) => {
  switch (action.type) {
    case "START_QUIZ":
      return { ...state, sessionId: action.payload.id };

    case "FAILED_TO_START_QUIZ":
      return { ...state, message: action.payload.message };

    case "SET_RESPONSES":
      return { ...state, userAnswers: action.payload.responses };

    case "RIGHT_ANSWER_COUNT":
      return { ...state, rightAnswerCount: state.rightAnswerCount + 1 };

    case "RESET":
      return { ...state, userAnswers: [], rightAnswerCount: 0 };

    default:
      return state;
  }
};
