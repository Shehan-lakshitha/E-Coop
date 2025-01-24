import React, { useEffect, useState } from 'react';
import './AddItems.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddItems = () => {
    const url = 'http://localhost:8080';
    const [imageURL, setImageURL] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Milk',
        countInStock: '',
    });
    const [errors, setErrors] = useState({});

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

        try {
            const response = await axios.post(
                `${url}/api/products/add`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data.success) {
                setData({
                    name: '',
                    description: '',
                    price: '',
                    category: 'Milk',
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
        }
    };

    // useEffect(() => {
    //   console.log(data);
    // }, [data]);

    return (
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
                                errors.name ? 'border-red' : ''
                            }`}
                            type="text"
                            id="productName"
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
                            className={`add_input text-area ${
                                errors.description ? 'border-red' : ''
                            }`}
                            rows="6"
                            id="description"
                            placeholder="Ex: Fresh milk from the farm"
                        ></textarea>
                        {errors.description && (
                            <p className="error-message-description">{errors.description}</p>
                        )}
                    </div>
                    <div>
                        <p>Product Category</p>
                        <select
                            onChange={onChangeHandler}
                            value={data.category}
                            name="category"
                            className={`input ${
                                errors.category ? 'border-red' : ''
                            }`}
                            id="category"
                        >
                            <option value="milk">Milk</option>
                            <option value="rice">Rice</option>
                            <option value="meat">Meat</option>
                            <option value="cereals">Cereals</option>
                        </select>
                        {errors.category && (
                            <p className="error-message">{errors.category}</p>
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
                                    errors.countInStock ? 'border-red' : ''
                                }`}
                                type="number"
                                id="productCount"
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
                                className={`input ${
                                    errors.price ? 'border-red' : ''
                                }`}
                                type="number"
                                id="productPrice"
                                placeholder="Ex: 500"
                            />
                            {errors.price && <p className="error-message">{errors.price}</p>}
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
                    {errors.imageURL && <p className="error-message">{errors.imageURL}</p>}
                </div>
            </form>
        </div>
    );
};

export default AddItems;
