const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    maxLength: 50,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    maxLength: 100,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 100,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  department: {
    type: String,
    required: true,
    enum: ["IT", "HR", "Finance"], // Ensures the value is one of the allowed departments
  },
  position: {
    type: String,
    required: false,
  },
  dateOfJoining: {
    type: Date,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  CreatedAt: {
    type: Date,
    require: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    require: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Form", formSchema);
