import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Crops.css"

const Crops = () => {
  const [crops, setCrops] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    exportPrice: "",
    expenses: "",
    link: ""
  });

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await axios.get("/api/crops");
        setCrops(res.data);
      } catch (err) {
        console.error("Failed to fetch crops:", err);
      }
    };

    fetchCrops();
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/crops", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setCrops(prev => [...prev, res.data]);
      setFormData({ name: "", exportPrice: "", expenses: "", link: "" });
    } catch (err) {
      console.error("Failed to add crop:", err);
    }
  };

  return (
    <div>
      <h2>Crops</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Crop Name" required />
        <input name="exportPrice" value={formData.exportPrice} onChange={handleChange} placeholder="Export Price" required />
        <input name="expenses" value={formData.expenses} onChange={handleChange} placeholder="Expenses" required />
        <input name="link" value={formData.link} onChange={handleChange} placeholder="Reference Link" />
        <button type="submit">Add Crop</button>
      </form>

      <ul>
        {crops.map(crop => (
          <li key={crop._id}>
            <strong>{crop.name}</strong> — ₹{crop.exportPrice} | Profit: ₹{crop.profitIncome}
            <br />
            <a href={crop.link} target="_blank" rel="noopener noreferrer">Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Crops;