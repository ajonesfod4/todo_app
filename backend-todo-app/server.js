const express = require("express");
require("dotenv").config();
const cors = require("cors");

//app routes
const userRouter = require("./routes/user");
const todoRouter = require("./routes/todo");

const app = express();
app.use(cors());

//The two lines below are needed to read req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//* ############### user routes ###############
app.use("/", userRouter);

// //* ############### to do list routes routes ###############
app.use("/", todoRouter);

//* ############### port settings information ###############
const port = process.env.PORT || 3300;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
