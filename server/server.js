const express      = require("express");
const app          = express(); // create express app
const port         = process.env.PORT || 5000;
const chalk        = require("react-dev-utils/chalk");
const clearConsole = require("react-dev-utils/clearConsole");
const openBrowser  = require("react-dev-utils/openBrowser");
const bodyParser   = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/home",(req, res) => {
  res.json({
    "name": "bill",
    "age": 99
  })
})
app.get("/", (req, res) => {
  //res.send(backend);
  res.send("This is from express.js");
});

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
  openBrowser("http://localhost:5000");
});