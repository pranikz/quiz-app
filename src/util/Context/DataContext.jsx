import { createContext, useContext, useReducer } from "react";
import { dataReducer } from "../Reducers/dataReducer";

const DataContext = createContext();

const initialState = {
  status: "idle",
  error: "",
  questions: [],
};

const DataContextProvider = ({ children }) => {
  const [dataState, dataDispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ dataState, dataDispatch }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataContextProvider, useData };
