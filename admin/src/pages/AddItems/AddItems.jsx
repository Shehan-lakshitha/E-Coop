import React, { useEffect, useState } from 'react';
import './AddItems.css';
import { assets } from '../../assets/assets';

const AddItems = () => {

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Milk",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <div className="add">
      <form className="flex-col">
        <div className="add-details">
          <div>
            <p>Product name</p>
            <input
              onChange={onChangeHandler}
              value={data.name}
              name="name" 
              className="add_input"
              type="text"
              id="productName"
            />
          </div>
          <div>
            <p>Product description</p>
            <textarea
              onChange={onChangeHandler}
              value={data.description}
              name="description" 
              className="add_input text-area"
              rows="6"
              id="description"
            ></textarea>
          </div>
          <div className="product-details">
            <div className="product-details-input">
              <p>Product category</p>
              <select
                onChange={onChangeHandler}
                value={data.category}
                name="category" 
                className="input"
                id="category"
              >
                <option value="milk">Milk</option>
                <option value="rice">Rice</option>
                <option value="meat">Meat</option>
                <option value="cereals">Cereals</option>
              </select>
            </div>
            <div className="product-details-input">
              <p>Product price</p>
              <input
                onChange={onChangeHandler}
                value={data.price}
                name="price"
                className="input"
                type="number"
                id="productPrice"
              />
            </div>
          </div>
          <div>
            <button>Add Product</button>
          </div>
        </div>
        <div className="add-img-upload">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
      </form>
    </div>
  );
};

export default AddItems;
