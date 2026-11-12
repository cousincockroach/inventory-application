const { Pool } = require("pg");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool(
  connectionString
    ? {
        connectionString,
        ssl: {
          rejectUnauthorized: false, 
        },
      }
    : {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || process.env.USER,
        password: process.env.DB_PASSWORD || "",
        database: "pulse_tech",
        port: process.env.DB_PORT || 5432,
      }
);

module.exports = pool; 