import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

// add products
const addProduct = async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    console.log(category);

    if (!category) {
      return res.status(400).json({ success: false, message: "Category not found" });
    }

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock,
      category: category._id,
      imageURL: req.body.imageURL,
    });

    await product.save();

    res.status(200).json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res
        .status(200)
        .json({ success: true, message: "Product deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name;
      product.description = req.body.description;
      product.price = req.body.price;
      product.countInStock = req.body.countInStock;
      product.category = req.body.category;
      product.imageURL = req.body.imageURL;

      await product.save();
      res
        .status(200)
        .json({ success: true, message: "Product updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update product" });
  }
};

const getProductsByIds = async (req, res) => {
  try {
    const { productIds } = req.body;

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product IDs array" });
    }

    const products = await Product.find({ _id: { $in: productIds } });

    res.status(200).json({
      success: true,
      data: products,
      message: `${products.length} product(s) found`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
};

export { addProduct, getAllProducts, deleteProduct, updateProduct, getProductsByIds };
