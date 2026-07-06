var express = require("express");
var path = require("path");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/register", (req, res) => {
  let { username, password } = req.query;
  res.send(`GET Request, Username is ${username}`);
});

app.post("/register", (req, res) => {
  let { username, password } = req.body;
  res.send(`GET Request, Username is ${username}`);
});

let port = 8080;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
