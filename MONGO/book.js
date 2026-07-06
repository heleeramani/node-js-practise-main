const mongoose = require("mongoose");

main()
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 20,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
    min: [1, "Price is too low for Amazong seling"],
  },
  discount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ["finctopn, non-fiction"],
  },
  genre: [String],
});

const Book = mongoose.model("Book", bookSchema);

const book1 = new Book({
  title: "Hanuman Charitra",
  author: "HAriprakash Swami",
  price: 1200,
  genre: ["comics, superheros", "fiction"],
});
book1.save();

Book.findByIdAndUpdate(
  "67bd41ebd8e3911a0446a665",
  { price: -5000 },
  { runValidators: true }
)
  .then((res) => console.log(res))
  .catch((err) => console.log(err.errors.price.properties));
