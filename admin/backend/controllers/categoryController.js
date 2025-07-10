import Category from "../models/categoryModel.js";

// add category
const addCategory = async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });
  try {
    category.save();
    res
      .status(200)
      .json({ success: true, message: "New category create successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to add category" });
  }
};

// get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch categories" });
  }
};

// delete category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (category) {
      res
        .status(200)
        .json({ success: true, message: "Category deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete category" });
  }
};

// update category
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      category.name = req.body.name;

      await category.save();
      res
        .status(200)
        .json({ success: true, message: "Category updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update category" });
  }
};

export { addCategory, getAllCategories, deleteCategory, updateCategory };
