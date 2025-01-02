import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashboardPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      const cd_id = localStorage.getItem("cd_id");
      const cd_secret = localStorage.getItem("cd_secret");

      if (!cd_id || !cd_secret) {
        setError("CD ID or Secret not found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://cadmium.softwarescompound.in/applications",
          {
            headers: {
              "CD-ID": cd_id,
              "CD-Secret": cd_secret,
            },
          }
        );

        if (response.status === 200) {
          const apps = response.data.map((app) => ({
            id: app._id?.$oid || "Unknown ID",
            application_name: app.application_name,
            total_logs: app.total_logs,
            resolved_logs: app.resolved_logs,
            todays_logs: app.todays_logs,
          }));
          setApplications(apps);
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch applications. Please try again.");
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleDelete = async (appId) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      const cd_id = localStorage.getItem("cd_id");
      const cd_secret = localStorage.getItem("cd_secret");

      try {
        const response = await axios.delete(
          `https://cadmium.softwarescompound.in/applications/${appId}`,
          {
            headers: {
              "CD-ID": cd_id,
              "CD-Secret": cd_secret,
            },
          }
        );

        if (response.status === 200) {
          setApplications(applications.filter((app) => app.id !== appId));
          alert("Application deleted successfully.");
        }
      } catch (err) {
        alert("Failed to delete the application. Please try again.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("organization_name");
    localStorage.removeItem("organization_id");
    localStorage.removeItem("cd_id");
    localStorage.removeItem("cd_secret");
    navigate("/");
  };

  const goToSettings = () => {
    navigate("/settings");
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const styles = {
    pageContainer: {
      minHeight: "100vh",
      minWidth: "100vw",
      backgroundColor: "#121212",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      color: "#ffffff",
      fontFamily: "Arial, sans-serif",
      overflow: "auto",
    },
    container: {
      flex: 1,
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#1e1e1e",
      borderBottom: "1px solid #333",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    title: {
      fontSize: "2rem",
      margin: 0,
      color: "#ffffff",
    },
    buttonContainer: {
      display: "flex",
      gap: "10px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "1rem",
      color: "#ffffff",
      backgroundColor: "#1f78d1",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    logoutButton: {
      backgroundColor: "#dc3545",
    },
    cardsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
      padding: "20px",
    },
    card: {
      backgroundColor: "#1e1e1e",
      borderRadius: "8px",
      padding: "20px",
      border: "1px solid #333",
    },
    cardTitle: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      marginBottom: "15px",
      color: "#ffffff",
    },
    cardInfo: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
      color: "#cccccc",
    },
    copyButton: {
      padding: "5px 10px",
      backgroundColor: "#2d3748",
      color: "#ffffff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "0.875rem",
      marginLeft: "10px",
    },
    deleteButton: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#dc3545",
      color: "#ffffff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginTop: "15px",
    },
    error: {
      color: "#dc3545",
      textAlign: "center",
      padding: "20px",
      backgroundColor: "rgba(220, 53, 69, 0.1)",
      borderRadius: "4px",
      margin: "20px",
    },
    loader: {
      textAlign: "center",
      padding: "40px",
      color: "#ffffff",
    },
    noApps: {
      textAlign: "center",
      padding: "40px",
      color: "#888888",
      gridColumn: "1 / -1",
    },
    statValue: {
      fontWeight: "bold",
      color: "#ffffff",
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <div style={styles.buttonContainer}>
          <button 
            style={styles.button}
            onClick={goToSettings}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#1857a4"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#1f78d1"}
          >
            Settings
          </button>
          <button 
            style={{...styles.button, ...styles.logoutButton}}
            onClick={handleLogout}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#bd2130"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#dc3545"}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={styles.container}>
        {loading ? (
          <div style={styles.loader}>Loading applications...</div>
        ) : error ? (
          <div style={styles.error}>{error}</div>
        ) : (
          <div style={styles.cardsContainer}>
            {applications.length === 0 ? (
              <div style={styles.noApps}>No applications found for this organization.</div>
            ) : (
              applications.map((app) => (
                <div key={app.id} style={styles.card}>
                  <div style={styles.cardTitle}>{app.application_name}</div>
                  <div style={styles.cardInfo}>
                    <span>ID:</span>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span>{app.id}</span>
                      <button
                        style={styles.copyButton}
                        onClick={() => handleCopy(app.id)}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#3d4a5f"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#2d3748"}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  <div style={styles.cardInfo}>
                    <span>Total Logs:</span>
                    <span style={styles.statValue}>{app.total_logs}</span>
                  </div>
                  <div style={styles.cardInfo}>
                    <span>Resolved Logs:</span>
                    <span style={styles.statValue}>{app.resolved_logs}</span>
                  </div>
                  <div style={styles.cardInfo}>
                    <span>Today's Logs:</span>
                    <span style={styles.statValue}>{app.todays_logs}</span>
                  </div>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(app.id)}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#bd2130"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "#dc3545"}
                  >
                    Delete Application
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;