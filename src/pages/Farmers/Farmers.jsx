import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Farmers.css"

const Farmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const token = localStorage.getItem('verdure_token') || localStorage.getItem('token');
        const res = await axios.get("/api/users?role=user", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const now = Date.now();
        const enriched = res.data.map(u => ({
          ...u,
          status: u.lastLogin && (now - new Date(u.lastLogin).getTime()) < 7*24*60*60*1000 ? 'Active' : 'Inactive',
        }));
        setFarmers(enriched);
      } catch (err) {
        console.error("Failed to fetch farmers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  const token = localStorage.getItem('verdure_token') || localStorage.getItem('token');

  return (
    <div>
      <h2>Farmers</h2>
      {loading ? <p>Loading farmers...</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {farmers.map(farmer => (
            <li key={farmer._id} style={{ marginBottom: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{farmer.username}</strong> — {farmer.email}
                </div>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '12px',
                  background: farmer.status === 'Active' ? '#e6fffa' : '#fff5f5',
                  color: farmer.status === 'Active' ? '#047857' : '#b91c1c',
                  fontWeight: 600,
                  fontSize: '12px'
                }}>{farmer.status}</span>
              </div>

              <FarmerProgress userId={farmer._id} token={token} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const FarmerProgress = ({ userId, token }) => {
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const res = await axios.get(`/api/users/${userId}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTrend(res.data.progressTrend || []);
      } catch (e) {
        console.error('Failed to fetch user dashboard summary:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchTrend();
  }, [userId, token]);

  return (
    <div style={{ marginTop: '8px' }}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>Progress Graph</div>
      {loading ? <div>Loading...</div> : (
        <svg width="100%" height="80" viewBox="0 0 300 80" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke="#2f855a"
            strokeWidth="3"
            points={trend.map((p, i) => `${(i/(Math.max(1, trend.length-1)))*300},${80 - (Math.min(100, p.progress)/100)*80}`).join(' ')}
          />
        </svg>
      )}
    </div>
  );
};

export default Farmers;