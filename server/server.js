require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { imageRouter } = require("./routes/imageRouter");

const app = express();
const { MONGO_URI, PORT } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("mongodb connected!");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/uploads", express.static(__dirname + "/uploads")); // 정적 파일 제공

app.use("/images", imageRouter);

app.listen(PORT, () => {
  console.log(`express server listening on http://localhost:${PORT}`);
});
