
const { Client } = require("pg");
require("dotenv").config();

const SQL = `
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  tagline VARCHAR(150)
);

CREATE TABLE items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  specs VARCHAR(255),
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);

INSERT INTO categories (name, description, tagline)
VALUES 
  ('Acoustics & Audio', 'Studio-grade sound systems and luxury headwear.', 'Intelligent Sound Tech'),
  ('Workstations', 'Precision-milled aluminum laptops and desktop rigs.', 'Uncompromising Power'),
  ('Displays & Vision', 'Ultra-wide OLED canvases and color-accurate monitors.', 'Visual Perfection'),
  ('Peripherals', 'Custom mechanical keyboards and precision pointer devices.', 'Tactile Excellence');

INSERT INTO items (name, description, price, stock_quantity, specs, category_id)
VALUES 
  ('Aethelgard H9 Gold Edition', 'Over-ear studio headphones with custom driver enclosures.', 1299.99, 12, 'Seamless Control, Titanium Driver', 1),
  ('PulseBook Pro 16', 'Architectural laptop with unified memory architecture.', 32000.00, 8, '32GB RAM, 2TB SSD, M-Core', 2),
  ('Vanguard 34" Curved OLED', 'Ultrawide color-grade monitor with ambient backlighting.', 20000.50, 4, '240Hz, 0.03ms, HDR1000', 3),
  ('Apex Key-One Mechanical', 'CNC machined brass plate keyboard with custom switches.', 450.00, 25, 'Hot-swap, Gasket Mount', 4);
`;

async function main() {
  console.log("Seeding Pulse Tech database...");
  const client = new Client({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || process.env.USER,
    password: process.env.DB_PASSWORD || "",
    database: "pulse_tech",
    port: process.env.DB_PORT || 5432,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Database successfully seeded!");
}

main().catch((err) => console.error("Seeding failed:", err));