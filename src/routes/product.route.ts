import express from "express";
import controller from "../controllers/product.controller";

const app = express.Router();

app.get("/", controller.getItems);
app.get("/:id", controller.getOneItem);
app.get("/category/:query", controller.getItemsCategory);

export = app;
