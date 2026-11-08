const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  tagline VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  specs TEXT,
  category_id INT REFERENCES categories(id) ON DELETE CASCADE
);

INSERT INTO categories (name, description, tagline) VALUES 
('Processors & Core', 'High-performance computing units and silicon modules.', 'Silicon Power'),
('Optics & Sensors', 'Precision lenses, LiDAR modules, and telemetry capture.', 'Vision Systems'),
('Power & Grid', 'Solid-state batteries, micro-reactors, and distribution.', 'Energy Matrix')
ON CONFLICT DO NOTHING;

INSERT INTO items (name, description, price, stock_quantity, specs, category_id) VALUES 
('Quantum Core X9', 'Next-generation 128-core processing module for heavy compute workloads.', 2499.99, 14, '128 Cores, 4.8GHz, Liquid Cooled', 1),
('LiDAR Array Pro', '360-degree high-resolution spatial scanning module with sub-millimeter precision.', 899.50, 32, 'Range: 200m, 60fps, IP67', 2),
('Titanium Cell Battery', 'High-density solid-state power cell with rapid thermal dissipation.', 450.00, 85, '5000mAh, 12V Output, 15min Fast Charge', 3)
ON CONFLICT DO NOTHING;
`;

async function main() {
  console.log("Seeding Pulse Tech database...");

  const connectionString = process.env.DATABASE_URL;

  const client = new Client(
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

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database successfully seeded!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await client.end();
  }
}

main();