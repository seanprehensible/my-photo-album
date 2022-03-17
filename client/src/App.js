import React from "react";
import { ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Routes, Route } from "react-router-dom";
import ToolBar from "./components/ToolBar";

const App = () => {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <ToolBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
