import { Client } from "pg";

import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

const connect = async () => {
  await client.connect();
  console.log("Connected to Postgres");
};

export { connect, client };
