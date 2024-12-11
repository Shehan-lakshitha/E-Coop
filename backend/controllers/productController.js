import Product from "../models/productModel.js";

// add products
const addProduct = async (req, res) =>{
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        countInStock: req.body.countInStock,
        category: req.body.category,
        imageURL: req.body.imageURL
    });
    try {
        product.save();
        res.status(200).json({success: true, message: "Product added successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Failed to add product"});
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data:products});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Failed to fetch products"});
    }
}

export {addProduct, getAllProducts};