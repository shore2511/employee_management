const Form = require('../models/Form');

exports.searchForm = async (req, res) => {
  try {
    const { employeeId, name, department, startDate, endDate } = req.query;

    // Create a filter object
    let filter = {};

    // Exact match for Employee ID
    if (employeeId) {
      filter.employeeId = employeeId;
    }

    // Partial match for Name (First or Last)
    if (name) {
      filter.$or = [
        { firstName: { $regex: name, $options: 'i' } },
        { lastName: { $regex: name, $options: 'i' } },
      ];
    }

    // Filter by department
    if (department) {
      filter.department = department;
    }

    // Date range filter for Date of Joining
    if (startDate && endDate) {
      filter.dateOfJoining = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
      filter.dateOfJoining = { $gte: new Date(startDate) };
    } else if (endDate) {
      filter.dateOfJoining = { $lte: new Date(endDate) };
    }

    const forms = await Form.find(filter);

    // No forms found
    if (forms.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No data found for the provided filters',
      });
    }

    // Success
    res.status(200).json({
      success: true,
      data: forms,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
