import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchTrialUsers from "../hooks/useFetchTrialUsers";

function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { users, loading } = useFetchTrialUsers(navigate);

  const filteredUsers = [...users]
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    .filter(
      (user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div
      style={{
        padding: "20px",
        color: "#333",
      }}
    >
      <h2
        style={{
          fontSize: "1.8rem",
          marginBottom: "20px",
          borderLeft: "5px solid #457b9d",
          paddingLeft: "10px",
        }}
      >
        Admin Panel – Probetraining Nutzer
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Suche nach Name oder E-Mail"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
            flex: "1",
            minWidth: "200px",
          }}
        />
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#457b9d",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            whiteSpace: "nowrap",
          }}
        >
          ⬅️ Zurück zur Startseite
        </button>
      </div>

      {loading ? (
        <p>Lade Nutzer...</p>
      ) : (
        <>
          <p>
            Gesamt: <strong>{filteredUsers.length}</strong> Nutzer
          </p>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              padding: "20px",
              marginTop: "20px",
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                minWidth: "600px",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{ borderBottom: "1px solid #ccc", padding: "10px" }}
                  >
                    Name
                  </th>
                  <th
                    style={{ borderBottom: "1px solid #ccc", padding: "10px" }}
                  >
                    E-Mail
                  </th>
                  <th
                    style={{ borderBottom: "1px solid #ccc", padding: "10px" }}
                  >
                    Startdatum
                  </th>
                  <th
                    style={{ borderBottom: "1px solid #ccc", padding: "10px" }}
                  >
                    Enddatum
                  </th>
                  <th
                    style={{ borderBottom: "1px solid #ccc", padding: "10px" }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, idx) => (
                  <tr
                    key={idx}
                    style={{
                      backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "white",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#e3f2fd")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        idx % 2 === 0 ? "#f9f9f9" : "white")
                    }
                  >
                    <td style={{ padding: "10px" }}>
                      {user.firstName} {user.lastName}
                    </td>
                    <td style={{ padding: "10px" }}>{user.email}</td>

                    <td style={{ padding: "10px" }}>
                      {new Date(user.startDate).toLocaleDateString("de-DE")}
                    </td>
                    <td style={{ padding: "10px" }}>
                      {new Date(user.endDate).toLocaleDateString("de-DE")}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor:
                            new Date(user.endDate) >= new Date()
                              ? "green"
                              : "red",
                          display: "inline-block",
                          marginRight: "8px",
                        }}
                      ></span>
                      {new Date(user.endDate) >= new Date()
                        ? "Aktiv"
                        : "Abgelaufen"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminPage;
