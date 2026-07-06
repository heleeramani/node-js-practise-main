const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "geek8685",
});

let getRandomUser = () => {
  return [
    faker.string.uuid(), // Generates a unique ID
    faker.internet.username(), // Corrected username method
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// SQL Query
// let q = "INSERT INTO user (id, username, email, password) VALUES ?";
// let q = "SHOW TABLES";
// let q = "insert into user (id, username, email, password) values (?, ?, ?, ?)";

// let user = [[103, "abc1", "abc1@gmail.com", "abc1"], [102, "abc2", "abc2@gmail.com", "abc2"]];
// Store generated users in `data` array
// let data = [];
// for (let i = 0; i < 100; i++) {
//   // Generates 100 users
//   //   console.log(getRandomUser());
//   data.push(getRandomUser());
// }

// Execute Query
// connection.query(q, [user], (err, result) => {
//   if (err) {
//     console.error("Error inserting data:", err);
//   } else {
//     console.log("Inserted Rows:", result.affectedRows);
//   }
//   connection.end(); // Close connection after execution
// });

// try {
//   connection.query(q, [user], (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });
// } catch (err) {
//   console.log(err);
// }

// try {
//   connection.query(q, [data], (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });
// } catch (err) {
//   console.log(err);
// }

app.get("/", (req, res) => {
  try {
    let q = `select count(*) from user`;
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    res.send("Something went wrong");
  }
});

app.get("/user", (req, res) => {
  let q = `select * from user`;
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      // console.log(users);
      res.render("showUsers.ejs", { users });
    });
  } catch (err) {
    res.send("something went wrong");
  }
});

app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let q = `select * from user where id = '${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("Something error in DB");
  }
});

app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formPass, username: newUsername } = req.body;
  console.log(id);
  let q = `select * from user where id = '${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (formPass != user.password) {
        res.send("WRONG Password!");
      } else {
        let q2 = `update user set username = '${newUsername}' where id = '${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          // res.send(result);
          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("Something error in DB");
  }
});

// Add new User
app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/user/new", (req, res) => {
  let { username, email, password } = req.body;
  let id = uuidv4();

  let q = `insert into user (id, username, email, password) values ('${id}', '${username}', '${email}', '${password}')`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      res.redirect("/user");
    });
  } catch (err) {
    console.log(err);
    res.send("Somethig went wrong");
  }
});

app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    res.send("some error with DB");
  }
});


// app.delete("/user/:id", (req, res) => {
//   let { id } = req.params;
//   let { password: formPass, username: newUsername } = req.body;
//   console.log(id);
//   let q = `select * from user where id = '${id}'`;

//   try {
//     connection.query(q, (err, result) => {
//       if (err) throw err;
//       let user = result[0];
//       if (formPass != user.password) {
//         res.send("WRONG Password!");
//       } else {
//         let q2 = `update user set username = '${newUsername}' where id = '${id}'`;
//         connection.query(q2, (err, result) => {
//           if (err) throw err;
//           // res.send(result);
//           res.redirect("/user");
//         });
//       }
//     });
//   } catch (err) {
//     console.log(err);
//     res.send("Something error in DB");
//   }
// });
app.delete("/user/:id/", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];

      if (user.password != password) {
        res.send("WRONG Password entered!");
      } else {
        let q2 = `DELETE FROM user WHERE id='${id}'`; //Query to Delete
        connection.query(q2, (err, result) => {
          if (err) throw err;
          else {
            console.log(result);
            console.log("deleted!");
            res.redirect("/user");
          }
        });
      }
    });
  } catch (err) {
    res.send("some error with DB");
  }
});
app.listen("8080", () => {
  console.log("Server is Lestining on Port 8080");
});
