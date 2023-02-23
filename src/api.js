import { client, connect } from "./connection";

import express from "express";

import { json } from "body-parser";

const app = express();
app.use(json());

// get all users
app.get("/users", (req, res) => {
  client.query("select * from users", (err, result) => {
    if (!err) {
      // console.log("here is result", result.rows);
      res.send({ status: "success", data: result.rows });
    } else {
      res.send({ status: "fail", error: err.message });
    }
  });
});

// get single user by id
app.get("/user/:id", (req, res) => {
  client.query(
    `select * from users where id=${req.params.id} `,
    (err, result) => {
      if (!err) {
        // console.log("here is result", result.rows);
        res.send({ status: "success", data: result.rows });
      } else {
        res.send({ status: "fail", error: err.message });
      }
    }
  );
});

// insert new user
app.post("/user/post", (req, res) => {
  const user = req.body;

  const insertQuery = `INSERT INTO users (id, "firstName", "lastName", "location") VALUES (${user.id}, '${user.firstName}', '${user.lastName}', '${user.location}')`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send({ status: "success", message: "user created successfully" });
    } else {
      res.send({ status: "fail", error: err.message });
    }
  });
});

app.put("/update/:id", (req, res) => {
  const user = req.body;

  const updateQuery = `update users  
    set  "firstName"='${user.firstName}',
         "lastName"='${user.lastName}',
         "location" = '${user.location}'
           where id=${user.id}
    `;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send({ status: "success", message: "update was successful" });
    } else {
      console.log(err);
      res.send({ status: "fail", error: err.message });
    }
  });
});

// delete user
app.delete("/delete/:id", (req, res) => {
  let insertQuery = `delete from users where id=${req.params.id}`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send({ status: "success", message: "user deleted successful" });
    } else {
      console.log(err);
      res.send({ status: "fail", error: err.message });
    }
  });
});

connect();

app.listen(3000, () => {
  console.log("postgres db is connected succesful");
});
