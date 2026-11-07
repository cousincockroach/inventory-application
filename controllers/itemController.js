const db = require("../db/queries");
const { body, validationResult } = require("express-validator");


async function renderDashboard(req, res) {
  try {
    const items = await db.getAllItems();
    const categories = await db.getAllCategories();
    res.render("index", {
      title: "Pulse Tech | Warehouse Inventory",
      items,
      categories,
    });
  } catch (err) {
    console.error("Error loading dashboard:", err);
    res.status(500).send("Server Error");
  }
}


async function renderCreateItemForm(req, res) {
  try {
    const categories = await db.getAllCategories();
    res.render("item-form", {
      title: "Pulse Tech | Add New Hardware",
      categories,
      errors: null,
      oldInput: {},
    });
  } catch (err) {
    console.error("Error loading item form:", err);
    res.status(500).send("Server Error");
  }
}


const validateItem = [
  body("name")
    .trim()
    .notEmpty().withMessage("Item name is required.")
    .isLength({ max: 150 }).withMessage("Name cannot exceed 150 characters."),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a valid positive number."),
  body("stock_quantity")
    .isInt({ min: 0 })
    .withMessage("Stock quantity must be a whole number."),
  body("category_id")
    .isInt()
    .withMessage("Please select a valid category."),
  body("specs").trim().optional(),
  body("description").trim().optional(),
];


const createItemPost = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();
      return res.status(400).render("item-form", {
        title: "Pulse Tech | Add New Hardware",
        categories,
        errors: errors.array(),
        oldInput: req.body,
      });
    }

    try {
      const { name, description, price, stock_quantity, specs, category_id } = req.body;
      await db.insertItem({
        name,
        description,
        price,
        stock_quantity,
        specs,
        category_id: parseInt(category_id, 10),
      });
      res.redirect("/");
    } catch (err) {
      console.error("Error creating item:", err);
      res.status(500).send("Server Error");
    }
  },
];


async function deleteItemPost(req, res) {
  try {
    const itemId = req.params.id;
    await db.deleteItem(itemId);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  renderDashboard,
  renderCreateItemForm,
  createItemPost,
  deleteItemPost,
};