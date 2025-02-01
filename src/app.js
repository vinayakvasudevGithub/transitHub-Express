const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/Dbconnection");
const dotenv = require("dotenv").config();
connectDb();
const app = express();
app.use(express.json());

app.use("/api/bus", require("./routes/busRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

module.exports = app;
