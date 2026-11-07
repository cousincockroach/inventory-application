
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");


async function renderCategories(req, res) {
  try {
    const categories = await db.getAllCategories();
    res.render("categories", {
      title: "Pulse Tech | Categories",
      categories,
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).send("Server Error");
  }
}


async function renderCategoryDetail(req, res) {
  try {
    const categoryId = req.params.id;
    const category = await db.getCategoryById(categoryId);
    const items = await db.getItemsByCategoryId(categoryId);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.render("category-detail", {
      title: `Pulse Tech | ${category.name}`,
      category,
      items,
    });
  } catch (err) {
    console.error("Error fetching category details:", err);
    res.status(500).send("Server Error");
  }
}


const validateCategory = [
  body("name")
    .trim()
    .notEmpty().withMessage("Category name is required.")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters."),
  body("description").trim().optional(),
  body("tagline").trim().optional(),
];


const createCategoryPost = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();
      return res.status(400).render("categories", {
        title: "Pulse Tech | Categories",
        categories,
        errors: errors.array(),
        oldInput: req.body,
      });
    }

    try {
      const { name, description, tagline } = req.body;
      await db.insertCategory({ name, description, tagline });
      res.redirect("/categories");
    } catch (err) {
      console.error("Error creating category:", err);
      res.status(500).send("Server Error");
    }
  },
];

module.exports = {
  renderCategories,
  renderCategoryDetail,
  createCategoryPost,
};