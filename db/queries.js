
const pool = require("./pool");


async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories ORDER BY name ASC");
  return rows;
}


async function getCategoryById(id) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
  return rows[0];
}


async function insertCategory({ name, description, tagline }) {
  await pool.query(
    "INSERT INTO categories (name, description, tagline) VALUES ($1, $2, $3)",
    [name, description, tagline]
  );
}


async function getAllItems() {
  const { rows } = await pool.query(`
    SELECT items.*, categories.name AS category_name 
    FROM items 
    JOIN categories ON items.category_id = categories.id 
    ORDER BY items.id DESC
  `);
  return rows;
}


async function getItemsByCategoryId(categoryId) {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE category_id = $1 ORDER BY name ASC",
    [categoryId]
  );
  return rows;
}


async function getItemById(id) {
  const { rows } = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
  return rows[0];
}


async function insertItem({ name, description, price, stock_quantity, specs, category_id }) {
  await pool.query(
    `INSERT INTO items (name, description, price, stock_quantity, specs, category_id) 
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [name, description, price, stock_quantity, specs, category_id]
  );
}


async function deleteItem(id) {
  await pool.query("DELETE FROM items WHERE id = $1", [id]);
}


async function deleteCategory(id) {
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  insertCategory,
  getAllItems,
  getItemsByCategoryId,
  getItemById,
  insertItem,
  deleteItem,
  deleteCategory,
};