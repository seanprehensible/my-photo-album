const express = require("express");
const multer = require("multer");
const { v4: uuid } = require("uuid");
const mime = require("mime-types");

const app = express();
const PORT = 5050;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid()}.${mime.extension(file.mimetype)}`);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!["image/jpeg", "image/png"].includes(file.mimetype)) {
      cb(new Error("invalid file type!"), false);
    } else {
      cb(null, true);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.use("/uploads", express.static(__dirname + "/uploads")); // 정적 파일 제공

app.get("/", (req, res) => {
  res.send("hi");
});

app.post("/upload", upload.single("image"), (req, res) => {
  res.json(req.file);
  /*   {
    "fieldname": "image",
    "originalname": "520ABBB4-864C-4B1B-BAA8-5B383F39A839_1_105_c.jpeg",
    "encoding": "7bit",
    "mimetype": "image/jpeg",
    "destination": "./uploads",
    "filename": "3847311b-7e51-4be0-806b-770ab8dddc17.jpeg",
    "path": "uploads/3847311b-7e51-4be0-806b-770ab8dddc17.jpeg",
    "size": 147231
} */
});

app.listen(PORT, () => {
  console.log(`express server listening on http://localhost:${PORT}`);
});
