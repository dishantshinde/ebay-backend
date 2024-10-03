const User = require("../models/userWatchlistmodel");

const addUserOnlogin = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const newUser = new User({
        email: email,
      });
      await newUser.save();
      return res.status(201).json({
        message: "New user added successfully",
      });
    } else {
      return res.status(200).json({ message: "User already exists", user });
    }
  } catch (err) {
    console.error("Error adding user:", err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { addUserOnlogin };
