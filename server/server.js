require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { imageRouter } = require("./routes/imageRouter");
const { userRouter } = require("./routes/userRouter");
const { authenticate } = require("./middleware/authentication");

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
app.use(express.json()); // 파싱 후 req.body에 저장
app.use(authenticate); // 인증 후 req.user에 저장

app.use("/images", imageRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`express server listening on http://localhost:${PORT}`);
});
