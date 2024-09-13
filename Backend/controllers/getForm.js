//Bussiness logic are written here

// import the model
const Form = require("../models/Form");

// create a new Form item
exports.getForm = async (req, res) => {
  try {
    //fetch all Form items grom databases
    const forms = await Form.find({});

    // response
    res.status(200).json({
      success: true,
      data: forms,
      message: "Entire Form Data is Fetch ",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: err.message,
    });
  }
};

exports.getFormById = async (req, res) => {
  try {
    //extract Form items basis on id
    const id = req.params.id;
    const form = await Form.findById({ _id: id });

    // data for given id not found
    if (!form) {
      return res.status(404).json({
        success: false,
        message: "No Data Found with Given Id",
      });
    }

    // Data for given Id Found
    res.status(200).json({
      success: true,
      data: form,
      message: `Form ${id} data successfully fetch`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: err.message,
    });
  }
};
