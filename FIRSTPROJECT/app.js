const express = require("express");
const app = express();
const methodOverride = require("method-override");
const mongoose = require("mongoose");

const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const Listing = require("./models/listing.js");
0;

main()
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlist");
}

app.use(express.urlencoded({ extended: true }));

// app.get("/testListing", async(req, res) => {
//     let sampleListing = new Listing ({
//         title:"My New Villa",
//         description: "By the Beach",
//         price: 1200,
//         location: "goa",
//         country: "india"
//     })

//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Successful testing")
// })

app.get("/listings", async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listing/index.ejs", { allListing });
});

app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("show.ejs", {listing})
});

app.get("/", (req, res) => {
  res.send("Working....");
});

app.listen(8080, () => {
  console.log("Server is Listening on port 8080");
});
