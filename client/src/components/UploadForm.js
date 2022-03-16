import React, { useState } from "react";
import axios from "axios";
import "./UploadForm.css";
import { toast } from "material-react-toastify";

const UplaodForm = () => {
  const defaultMsg = "이미지 파일을 업로드 해주세요.";
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(defaultMsg);

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
      });
      console.log(res);
      toast.success("업로드 성공!");
    } catch (err) {
      console.error(err);
      toast.error("업로드 실패!");
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
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
