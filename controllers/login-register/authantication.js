import User from "../../models/user-model.js";
import Fire from "../../models/fireBaseUser.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    res.status(200).json({
      message: "User login successfully",
      token: await user.generateToken(),
      user: user._id.toString(),
    });
  } catch (err) {
    console.error("Error from login route", err);
    res.status(500).send("Internal Server Error");
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);

    const newUser = new User({
      username: username,
      email: email,
      password: hash_password,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      token: await newUser.generateToken(),
      user: newUser._id.toString(),
    });
  } catch (e) {
    console.error("Error from register route", e);
    return res.status(500).send("Internal Server Error");
  }
};

const forget = (req, res) => {
  try {
    res.status(200).send("Welcome to forget world!");
  } catch (e) {
    console.error("Error from forget route", e);
    res.status(500).send("Error from forget route");
  }
};

const fireUser = async (req, res) => {
  try {
    const { id, username, email, photoURL } = req.body;

    // Validate required fields
    if (!id || !username || !email || !photoURL) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await Fire.findOne({ email: email });
    if (user) {
      return res.status(200).json({
        message: "User login successfully",
        token: await user.generateToken(),
        user: user._id.toString(),
      });
    } else {
      const newUser = new Fire({
        id: id,
        username: username,
        email: email,
        photoURL: photoURL,
        isAdmin: false,
      });

      await newUser.save();

      return res.status(201).json({
        message: "User registered successfully",
        token: await newUser.generateToken(),
        user: newUser._id.toString(),
      });
    }
  } catch (e) {
    console.error("Error from fireUser route", e);
    return res.status(500).send("Internal Server Error");
  }
};

export { login, register, forget, fireUser };
