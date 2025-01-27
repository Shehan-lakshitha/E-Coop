import React, { useEffect, useState } from 'react';
import './ListItems.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GrEdit } from 'react-icons/gr';
import { AiOutlineDelete } from 'react-icons/ai';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

const ListItems = () => {
    const url = 'http://localhost:4000';
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/products/allProducts`);
            console.log(response.data);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const removeItem = async (id) => {
        try {
            const response = await axios.delete(
                `${url}/api/products/delete/${id}`
            );
            if (response.data.success) {
                toast.success(response.data.message);
                fetchList();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="app-content">
                <div>
                    <Sidebar />
                </div>
                <div className="list_items">
                    <h3 className="list_title">All List Items</h3>

                    <table className="list_table">
                        <thead className="table_header">
                            <tr className="header_row">
                                <th scope="col" className="header_name">
                                    Image
                                </th>
                                <th scope="col" className="header_name">
                                    Name
                                </th>
                                <th scope="col" className="header_name">
                                    Category
                                </th>
                                <th scope="col" className="header_name">
                                    Description
                                </th>
                                <th scope="col" className="header_name">
                                    Price
                                </th>
                                <th scope="col" className="header_name">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {list.map((item) => (
                                <tr className="body_row" key={item._id}>
                                    <td>
                                        <img
                                            src={item.imageURL}
                                            alt="Item-Image"
                                        />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>{item.description}</td>
                                    <td>Rs. {item.price}</td>
                                    <td className="action_buttons">
                                        <div>
                                            <button className="edit_button">
                                                <GrEdit />
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() =>
                                                    removeItem(item._id)
                                                }
                                                className="delete_button"
                                            >
                                                <AiOutlineDelete />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ListItems;
