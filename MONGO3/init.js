const Chat = require("./models/chat.js");
const mongoose = require("mongoose");

main()
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// Chat.indsertmany(...)

const allChats = [
  {
    from: "helee",
    to: "isha",
    msg: "All The best For Exam. i trust You got A1",
    created_at: new Date(),
  },
  {
    from: "alen",
    to: "bob",
    msg: "hello",
    created_at: new Date(),
  },
  {
    from: "casey",
    to: "donald",
    msg: "how are you",
    created_at: new Date(),
  },
  {
    from: "shreya",
    to: "xyz",
    msg: "i am fine",
    created_at: new Date(),
  },
  {
    from: "abc",
    to: "pqr",
    msg: "hello, who are you",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);
