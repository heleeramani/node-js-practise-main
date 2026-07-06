const { log } = require("console");
var express = require("express");
var path = require("path");
const { v4: uuidv4 } = require("uuid");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

var methodOverride = require("method-override");
app.use(methodOverride("_method"));

let posts = [
  {
    id: uuidv4(),
    username: "Helee",
    content: "Working on Node Js",
  },
  {
    id: uuidv4(),
    username: "Isha",
    content: "Reading",
  },
];

app.get("/", (req, res) => {
  console.log("Server working well");
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  // console.log(req.body);
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  //   res.send("post request working");
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  //   console.log(id);
  let post = posts.find((p) => id === p.id);
  console.log(post);
  res.render("show.ejs", { post });
  //   res.send("working");
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  console.log(newContent);
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(post);
  //   res.send("Working");
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/posts");
});

let port = 8080;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
