const express = require("express");
const Emi = require("../Schema/emi.schema");
const Authmiddleware = require("../middleware/Authmiddleware");

const app = express.Router();


app.post("/calculateEMI", async (req, res) => {
  const { loanAmt, annualInt, tenMonth } = req.body;
  if ((!loanAmt, !annualInt, !tenMonth)) {
    return res.statusCode(500).send("All fields are required");
  }

  // E = P x r x ( 1 + r )n / ( ( 1 + r )n - 1 )

  try {
    let r = annualInt / (12 * 100).toFixed(6);

    let months = tenMonth * 12;

    let EMI =
      (loanAmt * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    EMI = Math.floor(EMI);
    let totalPayment = Math.floor(EMI * months);
    let intPayable = Math.floor(totalPayment - loanAmt);
    res.status(200).send({ EMI, totalPayment, intPayable });
  } catch (er) {
    return res.status(500).send({ msg: er.message });
  }
});

module.exports = app;
