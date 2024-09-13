//Bussiness logic are written here

// import the model
const Form = require("../models/Form");

// create a new Form item
exports.deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    await Form.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Form DELETED",
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
