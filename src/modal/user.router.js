const express = require("express");
const User = require("../Schema/user.schema");
const Authmiddleware = require("../middleware/Authmiddleware");

const app = express.Router();

// ################ user signup logic here ################

app.post("/signup", async (req, res) => {
  let { name, email, password, role } = req.body;
  let user = await User.findOne({ email });

  try {
    if (user) {
      return res
        .status(401)
        .send("This email is registered please try with another email");
    } else {
      let newUser = new User({ name, email, password });
      await newUser.save();
      return res.status(200).send(newUser);
    }
  } catch (er) {
    return res.status(500).send({ msg: er.message });
  }
});

// ################ user login logic here ###################

app.post("/login", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(404)
      .send("Your Credential is not correct check your credential");
  }
  const user = await User.findOne({ name, email, password });

  try {
    if (!user) {
      return res.status(404).send("Invalid Credentials");
    }
    return res.status(200).send({
      msg: "Login successfull",
      token: `${user.id}:${user.email}:${user.password}`,
    });
  } catch (er) {
    return res.status(500).send({ msg: er.message });
  }
});

// ################## getProfile logic here #################

app.get("/getProfile", Authmiddleware, async (req, res) => {
  const [id, email, password] = req.headers.token.split(":");

  try {
    let user = await User.findById(id);
    if (!user) {
      res.status(500).send("Something went wrong");
    } else {
      return res.status(200).send(user);
    }
  } catch (er) {
    return res.status(500).send({ msg: er.message });
  }
});

module.exports = app;
