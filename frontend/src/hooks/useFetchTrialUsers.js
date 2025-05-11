import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchTrialUsers(navigate) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login");
      return;
    }

    axios
      .get("/api/trial", { headers: { Authorization: token } })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        if (error.response && [401, 403].includes(error.response.status)) {
          navigate("/admin-login");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  return { users, loading };
}
