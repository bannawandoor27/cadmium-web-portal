import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreateOrganizationPage from "./pages/CreateOrganizationPage";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/create-organization" element={<CreateOrganizationPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

      </Routes>
    </Router>
  );
};

export default App;
