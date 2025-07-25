import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import backgroundImage from "../assets/boxing_Background.jpg.webp";
import useRegisterTrialUser from "../hooks/useRegisterTrialUser";

function TrialRegistrationPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    startDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { registerUser, loading, error, successMessage } =
    useRegisterTrialUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      setFormData({ firstName: "", lastName: "", email: "", startDate: "" });
    } catch (err) {}
  };

  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        color: "white",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 1,
        }}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          zIndex: 2,
          maxWidth: "400px",
          width: "90%",
          padding: "20px",
          backgroundColor: "rgba(0,0,0,0.7)",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>
          Registrierung für ein Probetraining
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="Vorname"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={{
              display: "block",
              margin: "10px 0",
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
            }}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Nachname"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={{
              display: "block",
              margin: "10px 0",
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              display: "block",
              margin: "10px 0",
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
            }}
          />
          <p style={{ fontSize: "0.9rem", margin: "10px 0", color: "#ccc" }}>
            Bitte geben Sie das heutige Datum ein. Ab dem Tag Ihres ersten
            Trainings beginnt Ihre 14-tägige Probezeit!
          </p>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            style={{
              display: "block",
              margin: "10px 0",
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
            }}
          />
          <button
            type="submit"
            style={{
              marginTop: "10px",
              padding: "12px 24px",
              backgroundColor: "#e63946",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Registrierung
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#457b9d",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            marginBottom: "10px",
          }}
        >
          ⬅️ Zurück zur Startseite
        </button>

        {loading && <p style={{ marginTop: "20px", color: "#ccc" }}>Lade...</p>}
        {error && <p style={{ marginTop: "20px", color: "red" }}>{error}</p>}
        {successMessage && (
          <p style={{ marginTop: "20px", color: "lightgreen" }}>
            {successMessage}
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default TrialRegistrationPage;
