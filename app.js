const express = require("express");
const bodyParser = require("body-parser");
const orderRoutes = require("./api/routes/orders");
const employeeRoutes = require("./api/routes/employees");
const adminRoutes = require("./api/routes/admins");
const financeRoutes = require("./api/routes/finances");

const app = express();

//bodyParser middleware
app.use(bodyParser.json());

//Routes
app.use("/orders", orderRoutes);
app.use("/employees", employeeRoutes);
app.use("/admins", adminRoutes);
app.use("/finances", financeRoutes);

module.exports = app;
