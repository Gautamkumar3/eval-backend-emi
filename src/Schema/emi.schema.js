const mongoose = require("mongoose");

let EmiSchema = mongoose.Schema({
  loanAmt: { type: Number, required: true },
  annualInt: { type: Number, required: true },
  tenMonth: { type: Number, required: true },
});

const EMI = mongoose.model("emi", EmiSchema);

module.exports = EMI;
