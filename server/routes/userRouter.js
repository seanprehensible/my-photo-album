const { Router } = require("express");
const User = require("../models/User");
const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  // console.log(req.body);
  await new User(req.body).save();
  res.json({ message: "user registered!" });
});

module.exports = { userRouter };
