import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this.username.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.SIGNTURE,
      {
        expiresIn: "30d",
      }
    );
  } catch (e) {
    console.log("error from jwt user model", e);
  }
};

const User = mongoose.model("User", userSchema );

export default User;
