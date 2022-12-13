const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db.js");
const UserRouter = require("./modal/user.router");
const EmiRouter = require("./modal/emi.router");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", UserRouter);
app.use("/", EmiRouter);

app.get("/", (req, res) => {
  res.send("Wecome");
});

app.listen(8080, async () => {
  await dbConnect();
  console.log("Server is running on port 8080");
});
