// import { Client } from "pg";
const { Client } = require("pg");

const dotenv = require("dotenv");

dotenv.config();

const client = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

// export default client;
module.exports = client;
