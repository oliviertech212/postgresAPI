const client = require("./connection.js");

const express = require("express");

const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.json());

// get all users
app.get("/users", (req, res) => {
  client.query("select * from users", (err, result) => {
    if (!err) {
      console.log("here is result", result.rows);
      res.send(result.rows);
    } else {
      res.send({ status: "fail", error: err.message });
    }
  });

  client.end;
});

app.listen(3000, () => {
  console.log("postgres db is connected succesful");
});

client.connect();
