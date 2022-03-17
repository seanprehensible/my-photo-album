const { Router } = require("express");
const User = require("../models/User");
const { hash, compare } = require("bcryptjs");
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
    const user = await new User({
      ...req.body,
      hashedPassword,
      sessions: [{ createdAt: new Date() }],
    }).save();
    const session = user.sessions[0];
    res.json({
      message: "user registered!",
      sessionId: session._id,
      name: user.name,
    });
  } catch (err) {
    console.error(err);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const isValid = await compare(req.body.password, user.hashedPassword);
    if (!isValid) {
      throw new Error("입력하신 정보가 올바르지 않습니다.");
    } else {
      user.sessions.push({ createdAt: new Date() });
      const session = user.sessions[user.sessions.length - 1];
      await user.save();
      res.json({
        message: "user validated!",
        sessionId: session._id,
        name: user.name,
      });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = { userRouter };
