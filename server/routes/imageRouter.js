const { Router } = require("express");
const Image = require("../models/Image");
const { upload } = require("../middleware/imageUpload");
const fs = require("fs");
const { promisify } = require("util");
const { default: mongoose } = require("mongoose");

const fileUnlink = promisify(fs.unlink);
const imageRouter = Router();

imageRouter.get("/", async (req, res) => {
  // public 이미지들만 제공
  const images = await Image.find({ public: true });
  res.json(images);
});

imageRouter.post("/", upload.single("image"), async (req, res) => {
  // 유저 정보, public 유무 확인
  try {
    if (!req.user) {
      throw new Error("권한이 없습니다.");
    }
    const image = await new Image({
      user: {
        _id: req.user.id,
        name: req.user.name,
        username: req.user.username,
      },
      public: req.body.public,
      key: req.file.filename,
      originalFileName: req.file.originalname,
    }).save();
    res.json(image);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
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

imageRouter.delete("/:imageId", async (req, res) => {
  try {
    // 유저 권한 확인
    if (!req.user) {
      throw new Error("권한이 없습니다.");
    }
    // 사진 삭제
    if (!mongoose.isValidObjectId(req.params.imageId)) {
      throw new Error("올바르지 않은 이미지입니다.");
    }
    const image = await Image.findOneAndDelete({ _id: req.params.imageId });
    if (!image) {
      return res.json({ message: "요청하신 이미지는 이미 삭제되었습니다." });
    }
    await fileUnlink(`./uploads/${image.key}`);
    res.json({ message: "요청하신 이미지가 삭제되었습니다." });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

imageRouter.patch("/:imageId/like", (req, res) => {
  // 유저 권한 확인
  // like 중복 안되도록 확인
});

imageRouter.patch("/:imageId/unlike", (req, res) => {
  // 유저 권한 확인
  // like 중복 취소 안되도록 확인
});

module.exports = { imageRouter };
