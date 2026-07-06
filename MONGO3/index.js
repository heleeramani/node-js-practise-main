const express = require("express");
const app = express();
const methodOverride = require("method-override");
const mongoose = require("mongoose");

const path = require("path");
const Chat = require("./models/chat");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.use(express.urlencoded({ extended: true }));

// Index Route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  console.log(chats);
  //   res.send("Working");
  res.render("index.ejs", { chats });
});

// New Chat
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// craerte route
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });

  console.log(newChat);

  newChat
    .save()
    .then((res) => console.log("CHAT WAS SAVED"))
    .catch((err) => console.log(err));

  res.redirect("/chats");
});

// Edit Route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );
  res.redirect("/chats");
});

app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats")
});

app.get("/", (req, res) => {
  res.send("Working....");
});

app.listen(8080, () => {
  console.log("Server is Listening on port 8080");
});
