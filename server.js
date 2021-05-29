const path = require("path");
const express = require("express");
const bodyParser = require("body-parser"); // to parse the JSON POSTED data from web
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const User = require("./model/user");
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
//console.log(process.env.DB_URL);

const bcrypt = require("bcryptjs"); //For Encrypting/Hasing the password

const app = express();
app.use("/", express.static(path.join(__dirname, "static")));

app.use(bodyParser.json()); //middleware to parse/read json post data

//Password Chnaging system
app.post("/api/change-password", async (req, res) => {
  const { token, newpassword: plainTextPassword } = req.body;

  //jwt.verify converts the middle value of JWT into human readable data
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const password = await bcrypt.hash(plainTextPassword, 10); //Generating encrypted/hash passwword
    //console.log(await bcrypt.hash(password, 10)); //Generating encrypted/hash passwword

    //Handling Password Error
    if (plainTextPassword.length < 6) {
      res.json({
        status: "error",
        error: "Password is too Small. Password should be atleast 6 Characters",
      });
    }

    //changing the passsword
    const _id = user.id;
    await User.updateOne({ _id }, { $set: { password } });
  } catch (error) {
    res.json({ status: "error", error: "Invalid Signature ;)" });
  }
  console.log(user);
  res.json({ status: "ok" });
});

//for logging into system
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  //finding user
  const user = await User.findOne({ username }).lean(); //.lean returns the value in simple javascript format

  //User not found
  if (!user) {
    return res.json({ status: "error", error: "Invalid Username" });
  }

  //Comparing Password
  if (bcrypt.compare(password, user.password)) {
    //Login Succesfull

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );
    return res.json({ status: "ok", data: token });
  }

  res.json({ staus: "error", error: "Wrong Password" });
});

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  const { username, password: plainTextPassword } = req.body;

  const password = await bcrypt.hash(plainTextPassword, 10); //Generating encrypted/hash passwword
  //console.log(await bcrypt.hash(password, 10)); //Generating encrypted/hash passwword

  //Handling Username errors
  if (!username || typeof username !== "string") {
    res.json({ status: "error", error: "Invalid Username" });
  }

  //Handling Password Error
  if (plainTextPassword.length < 6) {
    res.json({
      status: "error",
      error: "Password is too Small. Password should be atleast 6 Characters",
    });
  }

  //Adding username and password in database
  try {
    const response = await User.create({
      username,
      password,
    });
    console.log(`User created Succesfully: ${response}`);
  } catch (error) {
    console.log(JSON.stringify(error)); // Error hae multiple json object values

    if (error.code === 11000) {
      return res.json({ status: "Error", error: "User already exist" });
    }
    throw error; // Throwing unknown errors
  }

  res.json({ status: "ok" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
