import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import backgroundImage from "../assets/boxing_Background.jpg.webp";
import logoImage from "../assets/kurze-rippe.png";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
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
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1,
        }}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <motion.h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Willkommen zu Kurze Rippe 🥊
        </motion.h1>

        <motion.img
          src={logoImage}
          alt="Kurze Rippe Logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            maxWidth: "200px",
            marginBottom: "10px",
          }}
        />

        <motion.p
          style={{ fontSize: "1.2rem", marginBottom: "20px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Wählen Sie eine Option:
        </motion.p>
        <motion.button
          onClick={() => navigate("/registration")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            margin: "10px",
            padding: "12px 24px",
            backgroundColor: "#e63946",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          ➡️ Zum Probetraining
        </motion.button>
        <motion.button
          onClick={() => navigate("/admin")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            margin: "10px",
            padding: "12px 24px",
            backgroundColor: "#457b9d",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          🛠️ Zur Admin-Seite
        </motion.button>
      </motion.div>
    </div>
  );
}

export default HomePage;
