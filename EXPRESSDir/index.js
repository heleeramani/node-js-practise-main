const express = require("express");
// app is a object
const app = express();

let port = 3000; //8080
// listen for incoming request
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

// app.use((req, res) => {
//   console.log("Request Received");
//   res.send("This is a basic response");
//   //   res.send({
//   //     name: "apple",
//   //     color: "red",
//   //   });
//   // res.send("<ul><li>Apple</li><li>Baana</li></ul>"
// });

//   Routing
app.get("/", (req, res) => {
  res.send("you contacted Root path");
});

app.get("/apple", (req, res) => {
  res.send("you contacted Apple path");
});

app.get("/orange", (req, res) => {
  res.send("you contacted Orange path");
});

// app.get("*", (req, res) => {
//   res.send("This path does not exist");
// });

// Path Parameter
app.get("/:username/:id", (req, res) => {
  let { username, id } = req.params;
  res.send(`Welcome to the page of @${username}, your ID is ${id}`);
  //   res.send(`<h1>Welcome to the page of @${username}, your ID is ${id}</h1>`);
});

app.post("/", (req, res) => {
  res.send("you send a post request to root");
});

app.get("/search", (req, res) => {
  let { q } = req.query;
  if (!q) {
    res.send("Nothing Searched");
  }
  res.send(`search result for query ${q}`);
});
