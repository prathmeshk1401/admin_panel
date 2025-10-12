import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css"

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('verdure_token') || localStorage.getItem('token');
        const res = await axios.get("/api/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Map active/inactive based on lastLogin within 7 days
        const now = Date.now();
        const enriched = res.data.map(u => ({
          ...u,
          status: u.lastLogin && (now - new Date(u.lastLogin).getTime()) < 7*24*60*60*1000 ? 'Active' : 'Inactive'
        }));
        setUsers(enriched);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    try {
      const token = localStorage.getItem('verdure_token') || localStorage.getItem('token');
      await axios.patch(`/api/users/${id}`, { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(prev =>
        prev.map(user => user._id === id ? { ...user, role: newRole } : user)
      );
    } catch (err) {
      console.error("Failed to update role:", err);
    }
  };

  return (
    <div className="users">
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '12px',
                  background: user.status === 'Active' ? '#e6fffa' : '#fff5f5',
                  color: user.status === 'Active' ? '#047857' : '#b91c1c',
                  fontWeight: 600,
                  fontSize: '12px'
                }}>{user.status}</span>
              </td>
              <td>
                <select
                  value={user.role}
                  onChange={e => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;