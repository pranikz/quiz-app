import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { QuizContextProvider } from "./util/Context/QuizContext";
import { DataContextProvider } from "./util/Context/DataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <DataContextProvider>
        <QuizContextProvider>
          <App />
        </QuizContextProvider>
      </DataContextProvider>
    </Router>
  </React.StrictMode>
);


