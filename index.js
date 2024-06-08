const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://ashfaq1:ashfaq@simple-project.km5b5xe.mongodb.net/simple-projectX"
);

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // No need for hashing password
    const user = await UserModel.create({
      username,
      email,
      password, // Assuming password is already hashed or stored securely
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Comparing passwords, assuming password is stored securely
    if (user.password === password) {
      res.json(user);
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/userinfo", async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.query.username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/updateinfo", async (req, res) => {
  const { username, profession, interests, bio } = req.body;
  try {
    const updateData = {};
    if (profession !== undefined && interests !== undefined) {
      updateData.profession = profession;
      updateData.interests = interests;
    }
    if (bio !== undefined) {
      updateData.bio = bio;
    }
    const user = await UserModel.findOneAndUpdate({ username }, updateData, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
