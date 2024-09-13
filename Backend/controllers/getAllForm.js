// import the model
const Form = require("../models/Form");

exports.getAllForm = async (req, res) => {
  try {
    // Extract parameters from the request
    const {
      id,
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
    } = req.params;

    // Construct the query
    const query = {
      $or: [
        { _id: id },
        { employeeId: employeeId },
        { firstName: firstName },
        { lastName: lastName },
        { email: email },
        { phoneNumber: phoneNumber },
        { dateOfBirth: dateOfBirth },
        { department: department },
        { position: position },
        { dateOfJoining: dateOfJoining },
        { salary: salary },
      ],
    };

    // Find documents based on the query
    const forms = await Form.find(query);

    // Data not found
    if (forms.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Data Found with Given Criteria",
      });
    }

    // Data found
    res.status(200).json({
      success: true,
      data: forms,
      message: "Forms data successfully fetched",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: "Internal Server Error",
      message: err.message,
    });
  }
};
