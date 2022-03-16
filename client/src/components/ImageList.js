import React, { useContext } from "react";
import { ImageContext } from "../context/ImageContext";

const ImageList = () => {
  const [images] = useContext(ImageContext);

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
