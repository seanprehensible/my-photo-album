const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ImageSchema = new Schema(
  {
    user: {
      _id: { type: mongoose.Types.ObjectId, required: true, index: true }, // 원래 자동 생성 해주지만 그냥 추가해봄
      name: { type: String, required: true },
      username: { type: String, required: true },
    },
    public: { type: Boolean, required: true, default: false },
    key: { type: String, required: true },
    originalFileName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("image", ImageSchema);
