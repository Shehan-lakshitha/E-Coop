import React, { useEffect, useState } from "react";
import "./AddItems.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import config from "../../../config.json";

const AddItems = () => {
  const url = config.baseURL;
  const token = localStorage.getItem("authToken");

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    countInStock: "",
    imageURL: "",
    imageFile: null,
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}/api/categories`, {
          headers: { token: `${token}` },
        });
        if (response.data.success) {
          setCategories(response.data.data);
        } else {
          toast.error(response.data.message || "Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Something went wrong while fetching categories");
      }
    };

    fetchCategories();
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setData((prevData) => ({ ...prevData, imageFile: file }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!data.name) errors.name = "Product name is required";
    if (!data.description) errors.description = "Product description is required";
    if (!data.price) errors.price = "Product price is required";
    if (!data.category) errors.category = "Product category is required";
    if (!data.countInStock) errors.countInStock = "Product count in stock is required";
    if (!data.imageFile) errors.imageURL = "Product image is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append("file", data.imageFile);
    formData.append("upload_preset", "e_coop");
    formData.append("cloud_name", "dclji77rq");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dclji77rq/image/upload",
        { method: "post", body: formData }
      );
      const result = await response.json();
      return result.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Image upload failed");
    }
  };

  const addProduct = async () => {
    if (!validateForm()) return;

    try {
      const imageURL = await uploadImageToCloudinary();

      const payload = {
        ...data,
        imageURL,
        price: Number(data.price),
        countInStock: Number(data.countInStock),
      };

      const response = await axios.post(`${url}/api/products/add`, payload, {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      });

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "",
          countInStock: "",
          imageURL: "",
          imageFile: null,
        });
        setSelectedImage(null);
        setErrors({});
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while adding product");
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/categories/add`,
        { name: newCategoryName },
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Category added successfully");
        setNewCategoryName("");
        setShowCategoryForm(false);

        // Refresh categories
        const updatedCategories = await axios.get(`${url}/api/categories`, {
          headers: { token: `${token}` },
        });
        setCategories(updatedCategories.data.data);
      } else {
        toast.error(response.data.message || "Failed to add category");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while adding category");
    }
  };

  return (
    <>
      <Navbar />
      <div className="app-content">
        <Sidebar />
        <div className="add">
          <div className="heading-row">
            <h2 className="heading">Add New Product</h2>
            <button
              className="add-category-btn"
              onClick={() => setShowCategoryForm(true)}
            >
              + Add New Category
            </button>
          </div>

          {showCategoryForm && (
            <div className="category-form">
              <input
                type="text"
                placeholder="Enter category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <button onClick={handleAddCategory}>Add</button>
              <button
                className="cancel-btn"
                onClick={() => setShowCategoryForm(false)}
              >
                Cancel
              </button>
            </div>
          )}

          <form
            className="flex-col"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="add-details">
              <div>
                <p>Product Name</p>
                <input
                  onChange={onChangeHandler}
                  value={data.name}
                  name="name"
                  className={`add_input ${errors.name ? "error" : ""}`}
                  type="text"
                  placeholder="Ex: Milk"
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>

              <div>
                <p>Product Description</p>
                <textarea
                  onChange={onChangeHandler}
                  value={data.description}
                  name="description"
                  className={`add_input text-area ${errors.description ? "error" : ""}`}
                  rows="6"
                  placeholder="Ex: Fresh milk from the farm"
                ></textarea>
                {errors.description && (
                  <p className="error-message-description">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <p>Product Category</p>
                <select
                  onChange={onChangeHandler}
                  value={data.category}
                  name="category"
                  className={`input ${errors.category ? "error" : ""}`}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="error-message-category">{errors.category}</p>
                )}
              </div>

              <div className="product-details">
                <div className="product-details-input">
                  <p>Count In Stock</p>
                  <input
                    onChange={onChangeHandler}
                    value={data.countInStock}
                    name="countInStock"
                    className={`input ${errors.countInStock ? "error" : ""}`}
                    type="number"
                    placeholder="Ex: 100"
                  />
                  {errors.countInStock && (
                    <p className="error-message">{errors.countInStock}</p>
                  )}
                </div>

                <div className="product-details-input">
                  <p>Product Price</p>
                  <input
                    onChange={onChangeHandler}
                    value={data.price}
                    name="price"
                    className={`input ${errors.price ? "error" : ""}`}
                    type="number"
                    placeholder="Ex: 500"
                  />
                  {errors.price && (
                    <p className="error-message">{errors.price}</p>
                  )}
                </div>
              </div>

              <div>
                <button onClick={addProduct}>Add Product</button>
              </div>
            </div>

            <div className="add-img-upload">
              <p>Upload Image</p>
              <label htmlFor="image">
                <img
                  src={selectedImage || assets.upload_area}
                  alt="Preview"
                  className="image-preview"
                />
              </label>
              <input
                type="file"
                id="image"
                hidden
                className={`input ${errors.imageURL ? "error" : ""}`}
                onChange={handleImageChange}
              />
              {errors.imageURL && (
                <p className="error-message">{errors.imageURL}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddItems;
