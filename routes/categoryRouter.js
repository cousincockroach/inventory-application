
const { Router } = require("express");
const categoryController = require("../controllers/categoryController");

const categoryRouter = Router();


categoryRouter.get("/categories", categoryController.renderCategories);


categoryRouter.post("/categories", categoryController.createCategoryPost);


categoryRouter.get("/categories/:id", categoryController.renderCategoryDetail);

module.exports = categoryRouter;