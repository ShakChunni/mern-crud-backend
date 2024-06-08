const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    default: "",
  },
  interests: [
    {
      type: String,
      default: [],
    },
  ],
  bio: {
    type: String,
    maxlength: 50,
    default: "",
  },
});

const UserModel = mongoose.model("extrordinary", UserSchema);
module.exports = UserModel;
