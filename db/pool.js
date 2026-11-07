
const { Pool } = require("pg");
require("dotenv").config();

module.exports = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || process.env.USER,
  password: process.env.DB_PASSWORD || "",
  database: "pulse_tech",
  port: process.env.DB_PORT || 5432,
});