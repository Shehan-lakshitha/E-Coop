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
      selector: (row) => (
        <div>
          <p>{row.name}</p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => (
        <div>
          <p>{row.description}</p>
        </div>
      ),
      width: "30%",
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => (
        <div>
          <p>{row.category}</p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => (
        <div>
          <p>Rs. {row.price}</p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="action_buttons">
          <button
            onClick={() => setIsFormVisible(true)}
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
    headRow: {
      style: {
        border: "none",
      },
    },
    headCells: {
      style: {
        backgroundColor: "rgba(254, 182, 13, 0.3)",
        padding: "-10px",
        borderRadius: "10px",
        justifyContent: "center",
        color: "rgba(254, 182, 13, 1)",
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
      },
    },
    cells: {
      style: {
        padding: "0px",
        justifyContent: "center",
        borderRadius: "10px",
      },
    },
    pagination: {
      pageButtonsStyle: {
        fill: "black !important",
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
          category: categories[product.category] || "Unknown",
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

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
      await fetchList();
    };

    fetchData();
  }, [categories]);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="app-content">
        <Sidebar />
        <div className="add">
          <DataTable
            columns={columns}
            data={list}
            fixedHeader
            pagination
            customStyles={customStyles}
          />
        </div>

        {isFormVisible && (
          <div className="modal_overlay">
            <div className="form_container">
              <button
                className="close_button"
                onClick={() => setIsFormVisible(false)}
              >
                <CgCloseO />
              </button>
              <h1>Edit Item</h1>
              <form>
                <div className="edit-product">
                  <div className="edit-details">
                    <div>
                      <p>Product Name</p>
                      <input
                        className="edit_input"
                        type="text"
                        placeholder="Ex: Milk"
                        id="productName"
                        name="name"
                      />
                    </div>
                    <div>
                      <p>Product Description</p>
                      <textarea
                        name="description"
                        rows="6"
                        id="description"
                        placeholder="Ex: Fresh milk from the farm"
                      ></textarea>
                    </div>
                    <div>
                      <p>Product Category</p>
                      <select
                        className="edit_input"
                        name="category"
                        id="category"
                      >
                        {Object.keys(categories).map((category) => (
                          <option value={category}>
                            {categories[category]}
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
                          placeholder="Ex: 50"
                          id="price"
                          name="price"
                        />
                      </div>
                      <div>
                        <p>Stock</p>
                        <input
                          className="edit_input"
                          type="number"
                          placeholder="Ex: 50"
                          id="stock"
                          name="stock"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="edit-image">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                      <img
                        src=""
                        alt="Product Preview"
                        className="image-preview"
                      />
                    </label>
                    <input type="file" id="image" name="image" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ListItems;
