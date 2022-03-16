import React, { useState } from "react";
import axios from "axios";

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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <label htmlFor="image">{fileName}</label>
      <input id="image" type="file" onChange={imageSelectHandler} />
      <button type="submit">업로드</button>
    </form>
  );
};

export default UplaodForm;
