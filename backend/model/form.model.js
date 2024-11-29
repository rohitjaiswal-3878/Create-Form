const mongoose = require("mongoose");
const inputSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  type: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  value: {
    type: String,
  },
});

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  formData: [inputSchema],
});

const Form = mongoose.model("form", formSchema);
module.exports = Form;
