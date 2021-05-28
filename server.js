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
});
//console.log(process.env.DB_URL);

const app = express();
app.use("/", express.static(path.join(__dirname, "static")));

app.use(bodyParser.json()); //middleware
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  res.json({ status: "ok" });
});

app.listen(process.env.PORT, () => {
  console.log(`App is listening on http://localhost:${process.env.PORT}`);
});
