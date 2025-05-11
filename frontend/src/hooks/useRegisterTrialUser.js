import { useState } from "react";
import axios from "axios";

export default function useRegisterTrialUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const registerUser = async (formData) => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("/api/trial", formData);
      setSuccessMessage(response.data.message || "Danke für Registrierung!");
      return response.data;
    } catch (err) {
      const msg =
        err.response?.data?.message || "Fehler bei der Registrierung.";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error, successMessage };
}
