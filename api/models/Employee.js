const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

//Creates a schema
const employeeSchema = new Schema({
  //Employee personal details
  employee_id: mongoose.Schema.Types.ObjectId,
  employee_firstName: {
    type: String,
    required: true
  },
  employee_lastName: {
    type: String,
    required: true
  },
  employee_email: {
    type: String,
    required: true
  },
  //Employee seniority tier
  employee_seniority: {
    type: String,
    required: true
  },
  employee_joinDate: {
    type: Date,
    default: new Date()
  },
  //This will be a dynamic figure to be deducted
  //from the total number of points an employee should have
  // based on current date and join date
  employee_pointsSpent: {
    type: Number,
    default: 0
  },
  //Employee password details
  employee_salt: {
    type: String,
    required: true
  },
  employee_hash: {
    type: String,
    required: true
  }
});

employeeSchema.methods.setPassword = function(password) {
  // creating a unique salt for a particular employee
  this.employee_salt = crypto.randomBytes(16).toString("hex");

  // hashing employee's salt and password with 1000 iterations, 64 length and sha512 digest

  this.employee_hash = crypto
    .pbkdf2Sync(password, this.employee_salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

employeeSchema.methods.validPassword = function(password) {
  let hash = crypto
    .pbkdf2Sync(password, this.employee_salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.employee_hash === hash;
};

module.exports = Employee = mongoose.model("Employee", employeeSchema);
