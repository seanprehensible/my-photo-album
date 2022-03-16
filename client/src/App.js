import React from "react";
import UplaodForm from "./components/UploadForm";
import { ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import ImageList from "./components/ImageList";

const App = () => {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2>사진첩</h2>
      <UplaodForm />
      <ImageList />
      <ToastContainer />
    </div>
  );
};

export default App;
