const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const DB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/employee_accrual";

//Function to connect to the database

//Configures the server port
const port = process.env.PORT || 5000;

//Link the server and the app
const server = http.createServer(app);

//Connect to the database(in db.js), then start the server
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true
  })
  .then((res, err) => {
    //const newStorage = res
    if (err) return reject(err);
    console.log("Database online");
    console.log("CONNECTION DB==>>", mongoose.connection.client.s.url);
  })
  .then(() => {
    server.listen(port, () => console.log(`Server started on port ${port}`));
  });
