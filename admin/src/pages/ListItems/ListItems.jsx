import React, { useEffect, useState } from 'react';
import './ListItems.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GrEdit } from 'react-icons/gr';
import { AiOutlineDelete } from 'react-icons/ai';
import DataTable from 'react-data-table-component';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import config from '../../../config.json';

const ListItems = () => {
    const url = config.baseURL;
    const token = localStorage.getItem('authToken');
    const [list, setList] = useState([]);

    const columns = [
        {
            name: 'Image',
            selector: (row) => (
                <div>
                    <img
                        src={row.imageURL}
                        alt={row.imageURL}
                        className="body_row_img"
                    />
                </div>
            ),
        },
        {
            name: 'Name',
            selector: (row) => (
                <div>
                    <p>{row.name}</p>
                </div>
            ),
            sortable: true,
        },
        {
            name: 'Description',
            selector: (row) => (
                <div>
                    <p>{row.description}</p>
                </div>
            ),
            width: '30%',
            sortable: true,
        },
        {
            name: 'Category',
            selector: (row) => (
                <div>
                    <p>{row.category}</p>
                </div>
            ),
            sortable: true,
        },
        {
            name: 'Price',
            selector: (row) => (
                <div>
                    <p>Rs. {row.price}</p>
                </div>
            ),
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="action_buttons">
                    <button className="edit_button">
                        <GrEdit />
                    </button>
                    <button
                        onClick={() => removeItem(row._id)}
                        className="delete_button"
                    >
                        <AiOutlineDelete />
                    </button>
                </div>
            ),
        },
    ];

    const customStyles = {
        headRow: {
            style: {
                border: 'none',
            },
        },
        headCells: {
            style: {
                backgroundColor: 'rgba(254, 182, 13, 0.3)',
                padding: '-10px',
                borderRadius: '10px',
                justifyContent: 'center',
                color: 'rgba(254, 182, 13, 1)',
                fontSize: '16px',
                fontWeight: 'bold',
            },
        },
        rows: {
            style: {
                fontSize: '14px',
            },
        },
        cells: {
            style: {
                padding: '0px',
                justifyContent: 'center',
                borderRadius: '10px',
            },
        },
        pagination: {
            pageButtonsStyle: {
                fill: 'black !important',
            },
        },
    };

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/products/allProducts`);
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
                `${url}/api/products/delete/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        token: `${token}`,
                    },
                }
            );
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
                    <DataTable
                        columns={columns}
                        data={list}
                        fixedHeader
                        pagination
                        customStyles={customStyles}
                    />
                </div>
            </div>
        </>
    );
};

export default ListItems;
