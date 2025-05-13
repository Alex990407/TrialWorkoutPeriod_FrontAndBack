import { useState } from "react";
import axios from "axios";

export default function useAdminLogin() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginAdmin = async (password) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post("134.122.78.151:5050/api/login", {
        password,
      });
      return response.data;
    } catch (err) {
      const msg = err.response?.data?.message || "Serverfehler";
      setErrorMessage(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loginAdmin, loading, errorMessage };
}
