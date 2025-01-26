const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
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
  time: {
    type: Date,
    default: Date.now, // Automatically assigns the current date and time
  },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
