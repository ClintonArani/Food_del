import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUtensils, FaShoppingCart, FaUsers, FaDollarSign } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";
import { format } from "date-fns";
import './Dashboard.css';

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const Dashboard = () => {
  const url = "http://localhost:4000"; // Your backend base URL

  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [foodRes, orderRes, userRes] = await Promise.all([
        axios.get(`${url}/api/food/list`),
        axios.get(`${url}/api/order/list`),
        axios.get(`${url}/api/user/list`)
      ]);

      setFoods(Array.isArray(foodRes.data.data) ? foodRes.data.data : []);
      setOrders(Array.isArray(orderRes.data.data) ? orderRes.data.data : []);
      setUsers(Array.isArray(userRes.data) ? userRes.data : []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="loading-state">Loading data...</div>;

  // Calculate metrics
  const totalFoods = foods.length;
  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter(o => o.payment)
    .reduce((sum, o) => sum + (o.amount || 0), 0);
  const totalUsers = users.length;

  // Pie Chart: Orders by Status
  const orderStatusData = Object.values(
    orders.reduce((acc, order) => {
      acc[order.status] = acc[order.status] || { name: order.status, value: 0 };
      acc[order.status].value += 1;
      return acc;
    }, {})
  );

  // Bar Chart: Revenue over Time
  const revenueData = Object.values(
    orders.reduce((acc, order) => {
      const date = format(new Date(order.date), "yyyy-MM-dd");
      acc[date] = acc[date] || { date, revenue: 0 };
      if (order.payment) acc[date].revenue += order.amount || 0;
      return acc;
    }, {})
  ).sort((a, b) => new Date(a.date) - new Date(b.date));

  // Pie Chart: Foods by Category
  const categoryData = Object.values(
    foods.reduce((acc, food) => {
      acc[food.category] = acc[food.category] || { name: food.category, value: 0 };
      acc[food.category].value += 1;
      return acc;
    }, {})
  );

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <FaUtensils className="summary-icon icon-blue" />
          <div className="summary-text">
            <p className="summary-label">Total Foods</p>
            <h2 className="summary-value">{totalFoods}</h2>
          </div>
        </div>
        
        <div className="summary-card">
          <FaShoppingCart className="summary-icon icon-green" />
          <div className="summary-text">
            <p className="summary-label">Total Orders</p>
            <h2 className="summary-value">{totalOrders}</h2>
          </div>
        </div>
        
        <div className="summary-card">
          <FaDollarSign className="summary-icon icon-yellow" />
          <div className="summary-text">
            <p className="summary-label">Total Revenue</p>
            <h2 className="summary-value">${totalRevenue.toFixed(2)}</h2>
          </div>
        </div>
        
        <div className="summary-card">
          <FaUsers className="summary-icon icon-purple" />
          <div className="summary-text">
            <p className="summary-label">Total Users</p>
            <h2 className="summary-value">{totalUsers}</h2>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Orders by Status */}
        <div className="chart-container">
          <h3 className="chart-title">Orders by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={orderStatusData} 
                dataKey="value" 
                nameKey="name" 
                outerRadius={120} 
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {orderStatusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} orders`, 'Count']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Foods by Category */}
        <div className="chart-container">
          <h3 className="chart-title">Foods by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={categoryData} 
                dataKey="value" 
                nameKey="name" 
                outerRadius={120}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} items`, 'Count']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Over Time */}
      <div className="revenue-chart">
        <h3 className="chart-title">Revenue Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Revenue']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
            <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders Table */}
      <div className="recent-orders">
        <h3 className="orders-title">Recent Orders</h3>
        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 10).map(order => {
                const user = users.find(u => u._id === order.userId || u.id === order.userId);
                return (
                  <tr key={order._id}>
                    <td>{order._id?.substring(0, 8)}...</td>
                    <td>{user ? user.name || `${user.firstName} ${user.lastName}` : "Unknown"}</td>
                    <td>${order.amount?.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <span className={`payment-badge ${order.payment ? 'paid' : 'unpaid'}`}>
                        {order.payment ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td>{format(new Date(order.date), "MMM dd, yyyy")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;