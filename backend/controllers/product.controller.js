import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {

    try {

        const products = await Product.find({});

        return res.status(200).json(
            {
                success: true,
                data: products
            }
        );

    } catch (error) {
        console.log("error in getting products", error.message);

        return res.status(500).send(
            {
                success: false,
                message: "Internal server error"
            }
        );

    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({
            success: false,
            message: "Product not found"
        });
    }
    
    try {
        const product = await Product.findById(id);
        return res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.log("error in getting product", error.message);
        return res.status(500).send({
            success: false,
            message: "Internal server error"
        });
    }    
}

export const createProduct = async (req, res) => {

    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).send(
            {
                message: "All fields are required"

            }
        );
    }

    const newProduct = new Product(product);

    try {

        await newProduct.save();
        return res.status(201).json(
            {
                success: true,
                data: newProduct
            }
        );

    } catch (error) {
        console.log("error in creating product", error.message);

        return res.status(500).send(
            {
                success: false,
                message: "Internal server error"
            }
        );
    }
}   

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({
            success: false,
            message: "Product not found"
        });
    }

    try {

        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

        return res.status(200).json(
            {
                success: true,
                data: updatedProduct
            }
        );

    } catch (error) {
        console.log("error in updating product", error.message);

        return res.status(500).send(
            {
                success: false,
                message: "Internal server error"
            }
        );

    }

}

export const deleteProduct = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({
            success: false,
            message: "Product not found"
        });
    }

    try {

        await Product.findByIdAndDelete(id);

        return res.status(200).json(
            {
                success: true,
                message: "Product deleted successfully"
            }
        );

    } catch (error) {
        console.log("error in deleting product", error.message);

        return res.status(500).send(
            {
                success: false,
                message: "Internal server error"
            }
        );
    }
}