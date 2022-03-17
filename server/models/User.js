const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    hashedPassword: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
