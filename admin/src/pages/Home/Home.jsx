import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Statistic, Typography, Table } from "antd";
import { Line } from "@ant-design/charts";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import config from "../../../config.json";
import "./Home.css";

const Home = () => {
  const url = config.baseURL;
  const token = localStorage.getItem("authToken");

  const [monthlySales, setMonthlySales] = useState(0);
  const [todaySales, setTodaySales] = useState(0);
  const [dailySalesData, setDailySalesData] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});
  const [bestSellers, setBestSellers] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/orders/getOrders`, {
        headers: { token: `${token}` },
      });

      if (res.data.success) {
        const orders = res.data.orders;

        const now = new Date();
        const currentMonth = now.getMonth();
        const today = now.toDateString();

        let monthTotal = 0;
        let todayTotal = 0;
        const dailyMap = {};
        const statusMap = {};
        const productMap = {};

        orders.forEach((order) => {
          const date = new Date(order.createdAt);
          const dateStr = date.toLocaleDateString("en-US");

          if (date.getMonth() === currentMonth) {
            monthTotal += order.amount;
          }
          if (date.toDateString() === today) {
            todayTotal += order.amount;
          }

          dailyMap[dateStr] = (dailyMap[dateStr] || 0) + order.amount;
          statusMap[order.status] = (statusMap[order.status] || 0) + 1;

          order.items.forEach((item) => {
            productMap[item.name] = (productMap[item.name] || 0) + item.quantity;
          });
        });

        const dailyData = Object.keys(dailyMap).map((date) => ({
          date,
          sales: dailyMap[date],
        }));

        const sortedProducts = Object.entries(productMap)
          .map(([name, quantity]) => ({ name, quantity }))
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 5);

        setMonthlySales(monthTotal);
        setTodaySales(todayTotal);
        setDailySalesData(dailyData);
        setStatusCounts(statusMap);
        setBestSellers(sortedProducts);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
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
        <div className="overview-container">
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total Sales (This Month)"
                  value={monthlySales}
                  prefix="Rs."
                  precision={2}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Today's Sales"
                  value={todaySales}
                  prefix="Rs."
                  precision={2}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Line
                  data={dailySalesData}
                  xField="date"
                  yField="sales"
                  height={250}
                  smooth
                  autoFit
                  xAxis={{ title: { text: "Date", style: { fontSize: 14 } } }}
                  yAxis={{ title: { text: "Sales (Rs.)", style: { fontSize: 14 } } }}
                  meta={{
                    date: { alias: "Date" },
                    sales: { alias: "Sales (Rs.)" },
                  }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
            <Col span={12}>
              <Card title="Order Status">
                {["processing", "shipped", "ready for pickup", "done"].map(
                  (status) => (
                    <Typography.Paragraph key={status}>
                      <strong>
                        {status.charAt(0).toUpperCase() + status.slice(1)}:
                      </strong>{" "}
                      {statusCounts[status] || 0}
                    </Typography.Paragraph>
                  )
                )}
              </Card>
            </Col>

            <Col span={12}>
              <Card title="Best Selling Products">
                <Table
                  dataSource={bestSellers}
                  columns={[
                    { title: "Product", dataIndex: "name", key: "name" },
                    { title: "Quantity Sold", dataIndex: "quantity", key: "quantity" },
                  ]}
                  pagination={false}
                  size="small"
                  rowKey="name"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Home;
