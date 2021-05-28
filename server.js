const path = require("path");
const express = require("express");
const bodyParser = require("body-parser"); // to parse the JSON POSTED data from web
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
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  const { username, password: plainTextPassword } = req.body;

  const password = await bcrypt.hash(password, 10); //Generating encrypted/hash passwword
  //console.log(await bcrypt.hash(password, 10)); //Generating encrypted/hash passwword
  res.json({ status: "ok" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
