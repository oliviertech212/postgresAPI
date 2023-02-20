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

connect();

app.listen(3000, () => {
  console.log("postgres db is connected succesful");
});
