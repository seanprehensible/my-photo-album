import axios from "axios";
import React, { useEffect, useState } from "react";

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("/images")
      .then((result) => {
        setImages(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const imgList = images.map((img) => (
    <img
      key={img.key}
      src={`http://localhost:5050/uploads/${img.key}`}
      style={{ width: "100%" }}
    />
  ));
  return (
    <div>
      <h3>목록</h3>
      {imgList}
    </div>
  );
};

export default ImageList;
