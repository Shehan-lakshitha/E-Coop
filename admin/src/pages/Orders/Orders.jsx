import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import PrintOrderButton from "./PrintOrderButton";
import config from "../../../config.json";

const ListOrders = () => {
  const url = config.baseURL;
  const token = localStorage.getItem("authToken");
  const [orders, setOrders] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});

  const statusOptions = ["processing", "shipped", "ready for pickup", "done"];

  const columns = [
    {
      name: "User Name",
      selector: (row) => row.userName,
      sortable: true,
      width: "140px",
      wrap: true,
    },
    {
      name: "Items",
      selector: (row) => row.items,
      cell: (row) => (
        <ul className="order-items-list">
          {row.items.map((item, index) => (
            <li key={index}>
              {item.name} (x{item.quantity})
            </li>
          ))}
        </ul>
      ),
      sortable: false,
      width: "200px",
    },
    {
      name: "Delivery Address",
      selector: (row) =>
        `${row.address.street}, ${row.address.city}, ${row.address.postalCode}`,
      sortable: true,
      width: "140px",
      wrap: true,
    },
    {
      name: "Amount",
      selector: (row) => `Rs. ${row.amount}`,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row._id, e.target.value)}
          className="order-status-select"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      ),
      sortable: false,
      width: "140px",
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
      width: "110px",
      wrap: true,
    },
    {
      name: "Print",
      cell: (row) => <PrintOrderButton order={row} className="print-btn" />,
      sortable: false,
      width: "110px",
      wrap: true,
      
    },
  ];

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
        lineHeight: "1.5",
        minHeight: "60px",
      },
    },
    cells: {
      style: {
        justifyContent: "left",
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/orders/getOrders`, {
        headers: { token: `${token}` },
      });

      if (response.data.success) {
        const ordersWithUserNames = await Promise.all(
          response.data.orders.map(async (order) => {
            try {
              const userRes = await axios.get(
                `${url}/api/users/getUser/${order.userId}`,
                {
                  headers: { token: `${token}` },
                }
              );

              return {
                ...order,
                userName: userRes.data.success
                  ? userRes.data.user.name
                  : "Unknown User",
              };
            } catch (err) {
              return {
                ...order,
                userName: "Unknown User",
              };
            }
          })
        );

        const sortedOrders = ordersWithUserNames.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const counts = sortedOrders.reduce((acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1;
          return acc;
        }, {});

        setOrders(sortedOrders);
        setStatusCounts(counts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.post(
        `${url}/api/orders/statusUpdate`,
        { orderId, status: newStatus },
        { headers: { token: `${token}` } }
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

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="app-content">
        <Sidebar />
        <div className="list_items">
          <div className="orders-header">
            <h2 className="heading">All Orders</h2>
            <div className="status-counts">
              <span className="status-processing">
                Processing: {statusCounts["processing"] || 0}
              </span>
              <span className="status-shipped">
                Shipped: {statusCounts["shipped"] || 0}
              </span>
              <span className="status-pickup">
                Ready for Pickup: {statusCounts["ready for pickup"] || 0}
              </span>
              <span className="status-done">
                Done: {statusCounts["done"] || 0}
              </span>
            </div>
          </div>

          <div className="list_table">
            <DataTable
              columns={columns}
              data={orders}
              fixedHeader
              pagination
              customStyles={customStyles}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListOrders;
