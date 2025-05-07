import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { password });
      localStorage.setItem("adminToken", response.data.token);
      navigate("/admin");
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Serverfehler");
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginBottom: "15px",
              fontSize: "1rem",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#457b9d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Login
          </button>
        </form>
        {message && (
          <p
            style={{
              marginTop: "15px",
              color: "red",
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminLoginPage;
