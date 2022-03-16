const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ImageSchema = new Schema(
  {
    key: { type: String, required: true },
    originalFileName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("image", ImageSchema);
