const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
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
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await UserModel.findOne({ email });

  //should compare with hashed password when we use hashed password
  if (user && user.password) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      //   should change the expiry time
      process.env.ACCESS_TOKEN_CODE,
      { expiresIn: "50m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc  current User
//@route POST /api/users/current
//@acces privet
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
