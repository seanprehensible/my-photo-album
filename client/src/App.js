import React from "react";
import UplaodForm from "./components/UploadForm";
import { ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <h2>사진첩</h2>
      <UplaodForm />
      <ToastContainer />
    </div>
  );
};

export default App;
