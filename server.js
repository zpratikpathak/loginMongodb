const path = require("path");
const express = require("express");
const bodyParser = require("body-parser"); // to parse the JSON POSTED data from web

const app = express();
app.use("/", express.static(path.join(__dirname, "static")));

app.use(bodyParser.json()); //middleware
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  res.json({ status: "ok" });
});

const port = 3500;

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
