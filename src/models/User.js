const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add the user name"],
    },
    email: {
      type: String,
      required: [true, "please add the user name"],
      unique: [true, "email address allready taken"],
    },
    password: {
      type: String,
      required: [true, "plaese add the user password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
