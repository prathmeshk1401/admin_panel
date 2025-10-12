import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css"
import Chart from "../../components/Chart/Chart";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout from admin panel?")) {
      // Clear all stored data
      localStorage.removeItem("verdure_token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to user app login
      window.location.href = "http://localhost:3000/login";
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchStats();
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("verdure_token") || localStorage.getItem("token");
      const res = await axios.get("/api/dashboard/admin", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data);
      setLastUpdated(res.data.lastUpdated);
    } catch (err) {
      console.error("Failed to fetch admin stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #045d1f',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1rem'
        }}></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="adminDashboard">
      <div className="page-title">
        <h2 className="page-title">Dashboard</h2>
        <p>
          Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Never'}
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <h3>👥 Total Users</h3>
          <div className="stat-value">{stats.totalUsers || 0}</div>
          <div className="stat-subtext">Active: {stats.activeUsers || 0}</div>
        </div>
        <div className="stat-card">
          <h3>🌱 Total Crops</h3>
          <div className="stat-value">{stats.totalCrops || 0}</div>
          <div className="stat-subtext">Across all users</div>
        </div>
        <div className="stat-card">
          <h3>💰 Total Revenue</h3>
          <div className="stat-value">₹{(stats.revenue || 0).toLocaleString()}</div>
          <div className="stat-subtext">From payments</div>
        </div>
        <div className="stat-card">
          <h3>📈 Net Profit</h3>
          <div className="stat-value">₹{(stats.netProfit || 0).toLocaleString()}</div>
          <div className="stat-subtext">All users combined</div>
        </div>
      </div>

      {/* Charts Overview */}
      <div className="charts-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <Chart
          title="Users: Active vs Total (Graph)"
          type="bar"
          data={(stats.userTrend || []).length ? stats.userTrend : [
            { month: 'Apr', total: 0, active: 0 },
            { month: 'May', total: 0, active: 0 },
            { month: 'Jun', total: 0, active: 0 },
            { month: 'Jul', total: 0, active: 0 },
            { month: 'Aug', total: 0, active: 0 },
            { month: 'Sep', total: stats.totalUsers || 0, active: stats.activeUsers || 0 }
          ]}
          dataKey={"active"}
        />
        <Chart
          title="Net Profit Graph"
          type="line"
          data={(stats.financialTrend || []).length ? stats.financialTrend : [
            { month: 'Apr', net: 0 },
            { month: 'May', net: 0 },
            { month: 'Jun', net: 0 },
            { month: 'Jul', net: 0 },
            { month: 'Aug', net: 0 },
            { month: 'Sep', net: stats.netProfit || 0 }
          ]}
          dataKey={"net"}
        />
      </div>

      {/* Detailed Stats */}
      <div >
        {/* Crop Status Breakdown */}
        <div className="detail-card">
          <h3>🌾 Crop Status Breakdown</h3>
          <div style={{ marginTop: '1rem' }}>
            {Object.entries(stats.cropsByStatus || {}).map(([status, count]) => (
              <div key={status}>
                <span>{status}:</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Overview */}
        <div className="detail-card">
          <h3>💵 Financial Overview</h3>
          <div style={{ marginTop: '1rem' }}>
            <div>
              <span>Total Income:</span>
              <span>₹{(stats.totalIncome || 0).toLocaleString()}</span>
            </div>
            <div>
              <span>Total Expenses:</span>
              <span>₹{(stats.totalExpenses || 0).toLocaleString()}</span>
            </div>
            <div>
              <span>Net Profit:</span>
              <span>₹{(stats.netProfit || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        {/* Recent Users */}
        <div className="detail-card">
          <h3>👤 Recent Users</h3>
          <div style={{ marginTop: '1rem' }}>
            {(stats.recentUsers || []).map((user, index) => (
              <div key={index}>
                <div>
                  <div>{user.username}</div>
                  <div>{user.email}</div>
                </div>
                <div>
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Crops */}
        <div className="detail-card">
          <h3>🌱 Recent Crop Activities</h3>
          <div>
            {(stats.recentCrops || []).map((crop, index) => (
              <div key={index}>
                <div>
                  <div>{crop.name}</div>
                  <div>
                    by {crop.userId?.username || 'Unknown'} • {crop.status}
                  </div>
                </div>
                <div>
                  ₹{(crop.totalIncome || 0).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="buttons">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="refreshBtn"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
          <button
            onClick={handleLogout}
            className="logout"
          >
            Logout
          </button>
        </div>
    </div>
  );
};

export default Dashboard;