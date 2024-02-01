//importing mongoose again to create a schema for our facts object
const mongoose = require("mongoose");

const factSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
  },
  date: {
    type: String,
    default: Date.now(),
  },
  tag: {
    type: String,
  },
  text: {
    type: String,
  },
});

const Fact = mongoose.model("Fact", factSchema);

module.exports = Fact;
