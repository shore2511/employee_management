const express = require("express");
const router = express.Router();

//import Controller
const { createForm } = require("../controllers/createForm");
const { getForm, getFormById } = require("../controllers/getForm");
const { updateForm } = require("../controllers/updateForm");
const { deleteForm } = require("../controllers/deleteForm");
const { searchForm } = require("../controllers/formController");

//define API routes
router.post("/createForm", createForm);
router.get("/getForm", getForm);
router.get("/getForm/:id", getFormById);
router.put("/updateForm/:id", updateForm);
router.delete("/deleteForm/:id", deleteForm);
router.get("/search", searchForm);

module.exports = router;
// application.use;
