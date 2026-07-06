const mongoose = require("mongoose");

// chartSchema
// from, required
// to, required
// msg, maxlength:50
// created_at; required
// const Chat = mongoose.model/...

// require i index.js  ./models/chat.js
// insert record in index.js    new Date()   chta.save.then.catch   //

const chatSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    maxLength: 50,
  },
  created_at: {
    type: String,
    required: true,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
