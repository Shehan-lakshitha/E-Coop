import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { token, url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/orders/getUserOrders`, {
        headers: { token },
      });
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="container">
          <div className="my-orders-header">
            <span>Items</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Address</span>
            <span>Order Date</span>
          </div>

          {orders.map((order, index) => (
            <div key={index} className="my-orders-order">
              <div>
                <img src={assets.parcel_icon} alt="Parcel Icon" />
                <p>
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity}
                      {idx < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </div>

              <p>${order.amount}.00</p>

              <p>
                <span style={{ color: "green" }}>&#x25cf;</span>{" "}
                <b>{order.status}</b>
              </p>

              <p>
                {order.address?.street}, {order.address?.city},{" "}
                {order.address?.postalCode}
              </p>

              <p>{new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
