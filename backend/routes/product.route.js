import express from "express";

import { getProducts, createProduct, getProductById, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/hello", (req, res) => {
    return res.send("Hello from the backend");
});


router.post("/", createProduct);

router.delete("/:id", deleteProduct);

router.get("/", getProducts);

router.put("/:id", updateProduct);

router.get("/:id", getProductById);


export default router;