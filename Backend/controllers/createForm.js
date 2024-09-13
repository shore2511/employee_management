//Bussiness logic are written here

// import the model
const Form = require("../models/Form");

// create a new todo item
exports.createForm = async (req, res) => {
  try {
    //extract title and description from the request body
    const {
      employeeId,
      firstName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth,
      department,
      position,
      dateOfJoining,
      salary,
    } = req.body;
    //create a new Form object and insert in DB
    const response = await Form.create({
      employeeId,
      firstName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth,
      department,
      position,
      dateOfJoining,
      salary,
    });

    //send the json response with a succes flag
    res.status(201).json({
      success: true,
      data: response,
      message: "Entry Created Successfully",
    });
  } catch (err) {
    console.err(err);
    console.log(err);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: err.message,
    });
  }
};
