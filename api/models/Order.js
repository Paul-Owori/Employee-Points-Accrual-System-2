const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creates a schema
const orderSchema = new Schema({
  order_id: mongoose.Schema.Types.ObjectId,
  //Who placed the order?
  employee_id: mongoose.Schema.Types.ObjectId,
  //What item/service was ordered for
  order_for: {
    type: String,
    required: true
  },
  //How many points did the order cost
  order_price: {
    type: Number,
    required: true
  },
  //Have admin approved the order?
  admin_approval_status: {
    type: Boolean,
    default: false
  },
  //Which admin personnel approved the order?
  admin_viewed_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },
  //Have finance approved the order?
  finance_approval_status: {
    type: Boolean,
    default: false
  },
  //Which finance personnel approved the order?
  finance_viewed_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Finance"
  },
  //When was the order made?
  order_date: {
    type: Date,
    default: new Date()
  }
});

module.exports = Order = mongoose.model("Order", orderSchema);
