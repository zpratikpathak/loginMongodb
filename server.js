const path = require("path");
const express = require("express");

const app = express();
app.use("/", express.static(path.join(__dirname, "static")));

const port = 3500;

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
