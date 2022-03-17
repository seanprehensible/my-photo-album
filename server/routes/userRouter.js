const { Router } = require("express");
const User = require("../models/User");
const { hash } = require("bcryptjs");
const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  // console.log(req.body);
  try {
    if (req.body.password.length < 8) {
      throw new Error("비밀번호는 8자 이상으로 입력해주세요.");
    }
    if (req.body.username.length < 3) {
      throw new Error("유저명은 3자 이상으로 입력해주세요.");
    }
    const hashedPassword = await hash(req.body.password, 10);
    await new User({ ...req.body, hashedPassword }).save();
    res.json({ message: "user registered!" });
  } catch (err) {
    console.error(err);
  }
});

module.exports = { userRouter };
