import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../Pages/HomePage";
import { QuestionPage } from "../../Pages/QuestionPage";
import { ResultPage } from "../../Pages/ResultPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/question" element={<QuestionPage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
};
