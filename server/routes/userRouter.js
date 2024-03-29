const { Router } = require("express");
const User = require("../models/User");
const Image = require("../models/Image");
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
      userId: user._id,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// session을 수정해주는 일이라 patch로 설정
userRouter.patch("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      throw new Error("입력하신 정보가 올바르지 않습니다.");
    }
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
        userId: user._id,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

userRouter.patch("/logout", async (req, res) => {
  try {
    console.log(req.user);
    if (!req.user) {
      throw new Error("invalid sessionid!");
    }
    await User.updateOne(
      { _id: req.user.id },
      { $pull: { sessions: { _id: req.headers.sessionid } } }
    );
    res.json({ message: "successfully logged out!" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

userRouter.get("/me", (req, res) => {
  try {
    if (!req.user) {
      throw new Error("권한이 없습니다.");
    }
    res.json({
      message: "me validated!",
      sessionId: req.headers.sessionid,
      name: req.user.name,
      userId: req.user._id,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

userRouter.get("/me/images", async (req, res) => {
  // private 사진들만 리턴
  try {
    if (!req.user) {
      throw new Error("권한이 없습니다.");
    }
    const images = await Image.find({ "user._id": req.user.id });
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = { userRouter };
