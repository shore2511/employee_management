//Bussiness logic are written here

// import the model
const Form = require("../models/Form");

// create a new Form item
exports.updateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      employeeId,
      firstName,
      lastName,
      dateOfBirth,
      department,
      email,
      phoneNumber,
      position,
      dateOfJoining,
      salary,
    } = req.body;

    const form = await Form.findByIdAndUpdate(
      { _id: id },
      {
        employeeId,
        firstName,
        lastName,
        dateOfBirth,
        department,
        email,
        phoneNumber,
        position,
        dateOfJoining,
        salary,
        updatedAt: Date.now(),
      }
    );
    //send the json response with a succes flag
    res.status(200).json({
      success: true,
      data: form,
      message: "updated Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Server Error",
    });
  }
};
