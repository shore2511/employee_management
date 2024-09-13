const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

//load config file from  .env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middle to parse the json  request body
app.use(express.json());

// import rotes for Form API
const formRoutes = require("./routes/form");

//mount the Form ASPI routes
app.use("/api/v1", formRoutes);

//start server
app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}`);
});

//connect the Databases

const dbConnect = require("./config/databases");
dbConnect();

//default Routes
app.get("/", (req, res) => {
  res.send(`<h1> This is HOMEPAGE Body<h1/>`);
});
