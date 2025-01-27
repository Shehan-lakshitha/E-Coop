import React, { useEffect, useState } from 'react';
import './AddItems.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

const AddItems = () => {
    const url = 'http://localhost:4000';
    const [imageURL, setImageURL] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        countInStock: '',
    });
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});

    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${url}/api/categories`, {
                    headers: {
                        token: `${token}`,
                    },
                });
                if (response.data.success) {
                    setCategories(response.data.data);
                } else {
                    toast.error(
                        response.data.message || 'Failed to fetch categories'
                    );
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast.error('Something went wrong while fetching categories');
            }
        };

        fetchCategories();
    }, []);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const validateForm = () => {
        const errors = {};
        if (!data.name) {
            errors.name = 'Product name is required';
        }

        if (!data.description) {
            errors.description = 'Product description is required';
        }

        if (!data.price) {
            errors.price = 'Product price is required';
        }

        if (!data.category) {
            errors.category = 'Product category is required';
        }

        if (!data.countInStock) {
            errors.countInStock = 'Product count in stock is required';
        }

        if (!imageURL) {
            errors.imageURL = 'Product image is required';
        }

        setErrors(errors);

        if (Object.keys(errors).length > 0) {
            return false;
        }

        return true;
    };

    const addProduct = async () => {
        const isValid = validateForm();
        if (!isValid) {
            return;
        }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', Number(data.price));
        formData.append('category', data.category);
        formData.append('countInStock', Number(data.countInStock));
        formData.append('imageURL', imageURL);

        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        try {
            const response = await axios.post(
                `${url}/api/products/add`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        token: `${token}`,
                    },
                }
            );

            if (response.data.success) {
                setData({
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    countInStock: '',
                });
                setImageURL(false);
                setErrors({});
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong while adding product');
        }
    };

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="app-content">
                <div>
                    <Sidebar />
                </div>
                <div className="add">
                    <form
                        className="flex-col"
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <div className="add-details">
                            <div>
                                <p>Product Name</p>
                                <input
                                    onChange={onChangeHandler}
                                    value={data.name}
                                    name="name"
                                    className={`add_input ${
                                        errors.name ? 'error' : ''
                                    }`}
                                    type="text"
                                    id="productName"
                                    placeholder="Ex: Milk"
                                />
                                {errors.name && (
                                    <p className="error-message">
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                            <div>
                                <p>Product Description</p>
                                <textarea
                                    onChange={onChangeHandler}
                                    value={data.description}
                                    name="description"
                                    className={`add_input text-area ${
                                        errors.description ? 'error' : ''
                                    }`}
                                    rows="6"
                                    id="description"
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
                                    className={`input ${
                                        errors.category ? 'error' : ''
                                    }`}
                                    id="category"
                                >
                                    <option value="" disabled>
                                        Select Category
                                    </option>
                                    {categories.map((category) => (
                                        <option
                                            key={category._id}
                                            value={category._id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="error-message-category">
                                        {errors.category}
                                    </p>
                                )}
                            </div>
                            <div className="product-details">
                                <div className="product-details-input">
                                    <p>Count In Stock</p>
                                    <input
                                        onChange={onChangeHandler}
                                        value={data.countInStock}
                                        name="countInStock"
                                        className={`input ${
                                            errors.countInStock ? 'error' : ''
                                        }`}
                                        type="number"
                                        id="productCount"
                                        placeholder="Ex: 100"
                                    />
                                    {errors.countInStock && (
                                        <p className="error-message">
                                            {errors.countInStock}
                                        </p>
                                    )}
                                </div>
                                <div className="product-details-input">
                                    <p>Product Price</p>
                                    <input
                                        onChange={onChangeHandler}
                                        value={data.price}
                                        name="price"
                                        className={`input ${
                                            errors.price ? 'error' : ''
                                        }`}
                                        type="number"
                                        id="productPrice"
                                        placeholder="Ex: 500"
                                    />
                                    {errors.price && (
                                        <p className="error-message">
                                            {errors.price}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <button onClick={addProduct}>
                                    Add Product
                                </button>
                            </div>
                        </div>
                        <div className="add-img-upload">
                            <p>Upload Image</p>
                            <label htmlFor="image">
                                <img
                                    src={
                                        imageURL
                                            ? URL.createObjectURL(imageURL)
                                            : assets.upload_area
                                    }
                                    alt="Product-Image"
                                />
                            </label>
                            <input
                                onChange={(e) => setImageURL(e.target.files[0])}
                                type="file"
                                id="image"
                                hidden
                                required
                            />
                            {errors.imageURL && (
                                <p className="error-message">
                                    {errors.imageURL}
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddItems;
