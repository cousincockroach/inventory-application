
const { Router } = require("express");
const itemController = require("../controllers/itemController");

const itemRouter = Router();


itemRouter.get("/", itemController.renderDashboard);


itemRouter.get("/items/new", itemController.renderCreateItemForm);


itemRouter.post("/items/new", itemController.createItemPost);


itemRouter.post("/items/:id/delete", itemController.deleteItemPost);

module.exports = itemRouter;