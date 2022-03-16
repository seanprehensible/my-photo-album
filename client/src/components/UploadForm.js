import React, { useState } from "react";
import axios from "axios";
import "./UploadForm.css";
import { toast } from "material-react-toastify";
import ProgressBar from "./ProgressBar";

const UplaodForm = () => {
  const defaultMsg = "이미지 파일을 업로드 해주세요.";
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(defaultMsg);
  const [percent, setPercent] = useState(0);

  const imageSelectHandler = (event) => {
    console.log(event);
    const imageFile = event.target.files[0];
    setFile(imageFile);
    setFileName(imageFile.name);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          //   console.log(progressEvent);
          setPercent(
            Math.round((100 * progressEvent.loaded) / progressEvent.total)
          );
        },
      });
      console.log(res);
      setTimeout(() => {
        setPercent(0);
      }, 3000);
      toast.success("업로드 성공!");
    } catch (err) {
      console.error(err);
      setPercent(0);
      toast.error("업로드 실패!");
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <ProgressBar percent={percent} />
      <div className="file-dropper">
        <label htmlFor="image">{fileName}</label>
        <input id="image" type="file" onChange={imageSelectHandler} />
      </div>
      <button type="submit" className="submit-btn">
        업로드
      </button>
    </form>
  );
};

export default UplaodForm;
