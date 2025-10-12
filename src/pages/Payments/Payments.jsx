import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Payments.css"

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({ total: 0, paid: 0, pending: 0 });

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get("/api/payments", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setPayments(res.data);

        const paid = res.data.filter(p => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0);
        const pending = res.data.filter(p => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0);
        setSummary({ total: paid + pending, paid, pending });
      } catch (err) {
        console.error("Failed to fetch payments:", err);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div>
      <h2>Payments</h2>
      <div className="summary-grid">
        <div>Total Revenue: ₹{summary.total}</div>
        <div>Paid: ₹{summary.paid}</div>
        <div>Pending: ₹{summary.pending}</div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Farmer</th>
            <th>Crop</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment._id}>
              <td>{payment.farmerName}</td>
              <td>{payment.crop}</td>
              <td>₹{payment.amount}</td>
              <td>{payment.status}</td>
              <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;