const mongoose = require("mongoose");


main()
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}
// Schema
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const Demo = mongoose.model("Demo", userSchema);

// const demo1 = new Demo({
//   name: "Helee",
//   email: "helee@gmail.com",
//   age: 20,
// });

// demo1.save();

// const demo2 = new Demo({
//   name: "H",
//   email: "h@gmail.com",
//   age: 20,
// });

// demo2
//   .save()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// Demo.insertMany([
//   { name: "a", email: "a@gmail.com", age: 12 },
//   { name: "b", email: "b@gmail.com", age: 13 },
//   { name: "c", email: "c@gmail.com", age: 14 },
// ]).then((res) => console.log(res));

Demo.find({})
  .then((res) =>
    // console.log(res)
    // console.log(res[0])
    console.log(res[0].name)
  )
  .catch((err) => console.log(err));

// findOne
// Demo.findOne({ age: { $gt: 15 } })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// // findById
// Demo.findById({ _id: "67bbfc271da8ffc1dab21089" })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// updateOne
// Demo.updateOne({ name: "a" }, { age: 22 })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// findOneAndUpdate

//Note : { new: true }  if we not write then it give document but which is not update it also update but in database herre not display updated document....
Demo.findOneAndUpdate({ name: "a" }, { age: 50 }, { new: true })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

//findByIdAndUpdate

// deleteOne
Demo.deleteOne({ name: "H" })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
