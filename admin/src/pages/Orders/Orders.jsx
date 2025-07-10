import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import config from "../../../config.json";

const ListOrders = () => {
  const url = config.baseURL;
  const token = localStorage.getItem("authToken");
  const [orders, setOrders] = useState([]);

  const columns = [
    // {
    //     name: 'Order ID',
    //     selector: row => row._id,
    //     sortable: true,
    //     width: '180px'
    // },
    {
      name: "User ID",
      selector: (row) => row.userId,
      sortable: true,
      width: "180px",
    },
    {
      name: "Items",
      selector: (row) => (
        <ul style={{ paddingLeft: "15px" }}>
          {row.items.map((item, index) => (
            <li key={index}>
              {item.name} (x{item.quantity})
            </li>
          ))}
        </ul>
      ),
    },
    {
      name: "Delivery Address",
      selector: (row) =>
        `${row.address.street}, ${row.address.city}, ${row.address.postalCode}`,
      sortable: true,
      width: "250px",
    },
    {
      name: "Amount",
      selector: (row) => `Rs. ${row.amount}`,
      sortable: true,
    },
    // {
    //   name: "Status",
    //   selector: (row) => row.status,
    //   sortable: true,
    // },
    {
      name: "Status",
      cell: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row._id, e.target.value)}
          style={{
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
          }}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      ),
      sortable: false,
      width: "160px",
    },

    {
      name: "Payment",
      selector: (row) => (row.payment ? "Paid" : "Pending"),
      sortable: true,
    },
    {
      name: "Order Date",
      selector: (row) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
      width: "180px",
    },
  ];

  // status : ["processing", "shipped", "done", "ready for pickup"]
  const statusOptions = ["processing", "shipped", "ready for pickup", "done"];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "rgba(254, 182, 13, 0.3)",
        color: "rgba(254, 182, 13, 1)",
        fontSize: "16px",
        fontWeight: "bold",
        justifyContent: "center",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
      },
    },
    cells: {
      style: {
        justifyContent: "left",
      },
    },
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/orders/getOrders`, {
        headers: { token: `${token}` },
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    console.log("Updating status:", orderId, newStatus);
    try {
      const response = await axios.post(
        `${url}/api/orders/statusUpdate`,
        {
          orderId,
          status: newStatus,
        },
        {
          headers: { token: `${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Status updated!");
        fetchOrders();
      } else {
        toast.error(response.data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Status update failed:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Error updating status");
    }
  };

  return (
    <>
      <Navbar />
      <div className="app-content">
        <Sidebar />
        <div className="add">
          <h2>All Orders</h2>
          <DataTable
            columns={columns}
            data={orders}
            fixedHeader
            pagination
            customStyles={customStyles}
          />
        </div>
      </div>
    </>
  );
};

export default ListOrders;
