export const dataReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA": {
      return { status: "loading" };
    }

    case "FILL_DATA": {
      return { status: "success", questions: action.payload.questions };
    }

    case "FAILED_TO_LOAD_DATA": {
      return { status: "failure", error: action.payload.error };
    }

    default:
      return state;
  }
};
