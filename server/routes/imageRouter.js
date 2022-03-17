const { Router } = require("express");
const Image = require("../models/Image");
const { upload } = require("../middleware/imageUpload");

const imageRouter = Router();

imageRouter.get("/", async (req, res) => {
  const images = await Image.find();
  res.json(images);
});

imageRouter.post("/", upload.single("image"), async (req, res) => {
  const image = await new Image({
    key: req.file.filename,
    originalFileName: req.file.originalname,
  }).save();
  res.json(image);
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

module.exports = { imageRouter };
