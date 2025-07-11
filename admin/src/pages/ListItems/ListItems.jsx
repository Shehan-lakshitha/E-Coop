import React, { useEffect, useState } from "react";
import "./ListItems.css";
import axios from "axios";
import { toast } from "react-toastify";
import { GrEdit } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import { CgCloseO } from "react-icons/cg";
import DataTable from "react-data-table-component";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import config from "../../../config.json";

const ListItems = () => {
  const url = config.baseURL;
  const token = localStorage.getItem("authToken");

  const [list, setList] = useState([]);
  const [categories, setCategories] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <div>
          <img src={row.imageURL} alt={row.imageURL} className="body_row_img" />
        </div>
      ),
    },
    {
      name: "Name",
      selector: (row) => <p>{row.name}</p>,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => <p>{row.description}</p>,
      width: "30%",
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => <p>{row.categoryName}</p>,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => <p>Rs. {row.price}</p>,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="action_buttons">
          <button
            onClick={() => {
              setSelectedProduct(row);
              setIsFormVisible(true);
            }}
            className="edit_button"
          >
            <GrEdit />
          </button>
          <button onClick={() => removeItem(row._id)} className="delete_button">
            <AiOutlineDelete />
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "rgba(254, 182, 13, 0.3)",
        color: "rgba(254, 182, 13, 1)",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "10px",
        justifyContent: "center",
      },
    },
    cells: {
      style: {
        justifyContent: "center",
        padding: "10px",
      },
    },
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/categories`, {
        headers: {
          token: `${token}`,
        },
      });
      if (response.data.success) {
        const categoryMap = response.data.data.reduce((acc, category) => {
          acc[category._id] = category.name;
          return acc;
        }, {});
        setCategories(categoryMap);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/products/allProducts`);
      if (response.data.success) {
        const productsWithCategoryNames = response.data.data.map((product) => ({
          ...product,
          categoryName: categories[product.category] || "Unknown",
        }));
        setList(productsWithCategoryNames);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/products/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${url}/api/products/update/${selectedProduct._id}`,
        {
          name: selectedProduct.name,
          description: selectedProduct.description,
          price: selectedProduct.price,
          countInStock: selectedProduct.countInStock,
          category: selectedProduct.category,
          imageURL: selectedProduct.imageURL,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Product updated successfully!");
        setIsFormVisible(false);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Update failed!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(categories).length > 0) {
      fetchList();
    }
  }, [categories]);

  return (
    <>
      <Navbar />
      <div className="app-content">
        <Sidebar />
        <div className="add">
          <h2 className="heading">List Items</h2>
          <DataTable
            columns={columns}
            data={list}
            fixedHeader
            pagination
            customStyles={customStyles}
          />
        </div>

        {isFormVisible && selectedProduct && (
          <div className="modal_overlay">
            <div className="form_container">
              <button
                className="close_button"
                onClick={() => setIsFormVisible(false)}
              >
                <CgCloseO />
              </button>
              <h1>Edit Item</h1>
              <form onSubmit={handleUpdate}>
                <div className="edit-product">
                  <div className="edit-details">
                    <div>
                      <p>Product Name</p>
                      <input
                        className="edit_input"
                        type="text"
                        name="name"
                        value={selectedProduct.name || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <p>Product Description</p>
                      <textarea
                        name="description"
                        rows="6"
                        value={selectedProduct.description || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <p>Product Category</p>
                      <select
                        className="edit_input"
                        name="category"
                        value={selectedProduct.category || ""}
                        onChange={handleChange}
                      >
                        {Object.keys(categories).map((categoryId) => (
                          <option key={categoryId} value={categoryId}>
                            {categories[categoryId]}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="stock-price">
                      <div>
                        <p>Price</p>
                        <input
                          className="edit_input"
                          type="number"
                          name="price"
                          value={selectedProduct.price || ""}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <p>Stock</p>
                        <input
                          className="edit_input"
                          type="number"
                          name="countInStock"
                          value={selectedProduct.countInStock || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="edit-image">
                    <p>Product Image</p>
                    <img
                      src={selectedProduct.imageURL}
                      alt="Preview"
                      className="image-preview"
                    />
                  </div>
                </div>
                <button type="submit" className="edit_submit_button">
                  Update Product
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ListItems;
