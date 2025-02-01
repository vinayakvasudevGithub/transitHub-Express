const asyncHandler = require("express-async-handler");
const UserModel = require("../models/User");

//@desc Register a User
//@route POST /api/users/register
//@acces public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const userAvailable = await UserModel.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user allready registered");
  }
  //should hash password
  //   console.log(password);

  const user = await UserModel.create({
    username,
    email,
    password,
  });

  console.log(`user created ${user}`);

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
});

//@desc login User
//@route POST /api/users/login
//@acces public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "login user" });
});

//@desc  current User
//@route POST /api/users/current
//@acces public
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "current user" });
});

module.exports = { registerUser, loginUser, currentUser };
