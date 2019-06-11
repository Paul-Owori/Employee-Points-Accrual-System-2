const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

//Creates a schema
const financeSchema = new Schema({
  //finance personal and login details
  finance_id: mongoose.Schema.Types.ObjectId,
  finance_firstName: {
    type: String,
    required: true
  },
  finance_lastName: {
    type: String,
    required: true
  },
  finance_email: {
    type: String,
    required: true
  },
  finance_salt: {
    type: String,
    required: true
  },
  finance_hash: {
    type: String,
    required: true
  }
});

financeSchema.methods.setPassword = function(password) {
  // creating a unique salt for a particular finance
  this.finance_salt = crypto.randomBytes(16).toString("hex");

  // hashing finance's salt and password with 1000 iterations, 64 length and sha512 digest

  this.finance_hash = crypto
    .pbkdf2Sync(password, this.finance_salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

financeSchema.methods.validPassword = function(password) {
  let hash = crypto
    .pbkdf2Sync(password, this.finance_salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.finance_hash === hash;
};

module.exports = Finance = mongoose.model("Finance", financeSchema);
