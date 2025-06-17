import { Route, Routes } from "react-router-dom";
import StatisticsPage from "../pages/StatisticsPage/StatisticsPage";
import ServicesHealthPage from "../pages/ServicesHealthPage/ServicesHealthPage";
import AnaliticsPage from "../pages/AnaliticsPage/AnaliticsPage";
import UsersPage from "../pages/UsersPage/UsersPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<StatisticsPage />} />
      <Route path="/statistics" element={<StatisticsPage />} />
      <Route path="/servicesHealth" element={<ServicesHealthPage />} />
      <Route path="/analytics" element={<AnaliticsPage />} />
      <Route path="/users" element={<UsersPage />} />
    </Routes>
  );
};

export default AppRouter;
