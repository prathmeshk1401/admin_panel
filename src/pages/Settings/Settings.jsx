import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Settings.css";

const defaultPreferences = {
  currency: "INR",
  theme: "light",
  farmName: "",
  email: "",
  phone: "",
  address: "",
  cropRotation: false,
  irrigationSystem: "manual",
  soilMonitoring: false,
  weatherAlerts: true,
  priceUpdates: false,
  maintenanceReminders: true,
  twoFactorAuth: false,
  sessionTimeout: 30,
};

const Settings = () => {
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch preferences from API
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await axios.get("/api/dashboard", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const fetchedPrefs = res.data.preferences || {};
        setPreferences((prev) => ({
          ...prev,
          ...fetchedPrefs,
          currency: fetchedPrefs.currency || "INR",
          theme: fetchedPrefs.theme || "light",
        }));
      } catch (err) {
        console.error("Failed to fetch dashboard preferences:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.post(
        "/api/dashboard/update",
        { preferences },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Preferences updated successfully!");
    } catch (err) {
      console.error("Failed to update preferences:", err);
      alert("Failed to update preferences. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Reset to defaults
  const handleReset = () => {
    setPreferences(defaultPreferences);
  };

  if (loading) {
    return (
      <div className="settings-container">
        <div className="loading-spinner">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Farm Administration Settings</h1>
        <p>Manage your farm's configuration, preferences, and notifications</p>
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        {/* Account Settings */}
        <div className="settings-section">
          <h2>Account Settings</h2>
          <div className="form-group">
            <label htmlFor="farmName">Farm Name</label>
            <input
              type="text"
              id="farmName"
              name="farmName"
              value={preferences.farmName}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter farm name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={preferences.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter email address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={preferences.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter phone number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Farm Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={preferences.address}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter farm address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="currency">Preferred Currency</label>
            <select
              id="currency"
              name="currency"
              value={preferences.currency}
              onChange={handleChange}
              className="form-select"
            >
              <option value="INR">INR (Indian Rupee)</option>
              <option value="USD">USD (US Dollar)</option>
              <option value="EUR">EUR (Euro)</option>
            </select>
          </div>
        </div>

        {/* Dashboard Preferences */}
        <div className="settings-section">
          <h2>Dashboard Preferences</h2>
          <div className="form-group">
            <label htmlFor="theme">Dashboard Theme</label>
            <select
              id="theme"
              name="theme"
              value={preferences.theme}
              onChange={handleChange}
              className="form-select"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="verdure">Verdure Green (Farming Theme)</option>
            </select>
          </div>
        </div>

        {/* Farm Configuration */}
        <div className="settings-section">
          <h2>Farm Configuration</h2>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="cropRotation"
              name="cropRotation"
              checked={preferences.cropRotation}
              onChange={handleChange}
              className="form-checkbox"
            />
            <label htmlFor="cropRotation">Enable Crop Rotation Tracking</label>
          </div>
          <div className="form-group">
            <label htmlFor="irrigationSystem">Irrigation System</label>
            <select
              id="irrigationSystem"
              name="irrigationSystem"
              value={preferences.irrigationSystem}
              onChange={handleChange}
              className="form-select"
            >
              <option value="manual">Manual</option>
              <option value="semi-automatic">Semi-Automatic</option>
              <option value="automatic">Automatic</option>
            </select>
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="soilMonitoring"
              name="soilMonitoring"
              checked={preferences.soilMonitoring}
              onChange={handleChange}
              className="form-checkbox"
            />
            <label htmlFor="soilMonitoring">Enable Soil Monitoring</label>
          </div>
        </div>

        {/* Notifications */}
        <div className="settings-section">
          <h2>Notifications</h2>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="weatherAlerts"
              name="weatherAlerts"
              checked={preferences.weatherAlerts}
              onChange={handleChange}
              className="form-checkbox"
            />
            <label htmlFor="weatherAlerts">Weather Alerts</label>
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="priceUpdates"
              name="priceUpdates"
              checked={preferences.priceUpdates}
              onChange={handleChange}
              className="form-checkbox"
            />
            <label htmlFor="priceUpdates">Crop Price Updates</label>
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="maintenanceReminders"
              name="maintenanceReminders"
              checked={preferences.maintenanceReminders}
              onChange={handleChange}
              className="form-checkbox"
            />
            <label htmlFor="maintenanceReminders">
              Equipment Maintenance Reminders
            </label>
          </div>
        </div>

        {/* Security */}
        <div className="settings-section">
          <h2>Security Settings</h2>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="twoFactorAuth"
              name="twoFactorAuth"
              checked={preferences.twoFactorAuth}
              onChange={handleChange}
              className="form-checkbox"
            />
            <label htmlFor="twoFactorAuth">Enable Two-Factor Authentication</label>
          </div>
          <div className="form-group">
            <label htmlFor="sessionTimeout">Session Timeout (minutes)</label>
            <input
              type="number"
              id="sessionTimeout"
              name="sessionTimeout"
              value={preferences.sessionTimeout}
              onChange={handleChange}
              min="5"
              max="120"
              className="form-input"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={saving}
          >
            Reset to Defaults
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
