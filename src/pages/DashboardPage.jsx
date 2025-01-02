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
    // Clear localStorage
    localStorage.removeItem("organization_name");
    localStorage.removeItem("organization_id");
    localStorage.removeItem("cd_id");
    localStorage.removeItem("cd_secret");

    // Redirect to login page
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
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      backgroundColor: "#121212", // Dark theme background
      color: "#ffffff", // Light text color
      fontFamily: "Arial, sans-serif",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      maxWidth: "1200px",
      alignItems: "center",
      marginBottom: "20px",
    },
    logoutButton: {
      padding: "10px 20px",
      backgroundColor: "#ff6b6b",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem",
    },
    settingsButton: {
      padding: "10px 20px",
      backgroundColor: "#1f78d1",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem",
      marginRight: "10px",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "bold",
    },
    cardsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
      width: "100%",
      maxWidth: "1200px",
    },
    card: {
      backgroundColor: "#1e1e1e",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      color: "#ffffff",
    },
    cardTitle: {
      fontSize: "1.5rem",
      marginBottom: "10px",
      fontWeight: "bold",
    },
    cardInfo: {
      margin: "5px 0",
      fontSize: "1rem",
    },
    copyButton: {
      marginTop: "5px",
      padding: "6px 10px",
      backgroundColor: "#1f78d1",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "0.9rem",
    },
    deleteButton: {
      marginTop: "10px",
      padding: "8px 15px",
      backgroundColor: "#ff6b6b",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    error: {
      color: "#ff6b6b",
      fontSize: "1.2rem",
    },
    loader: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <div>
          <button style={styles.settingsButton} onClick={goToSettings}>
            Settings
          </button>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      {loading ? (
        <div style={styles.loader}>Loading applications...</div>
      ) : error ? (
        <div style={styles.error}>{error}</div>
      ) : (
        <div style={styles.cardsContainer}>
          {applications.length === 0 ? (
            <div>No applications found for this organization.</div>
          ) : (
            applications.map((app) => (
              <div key={app.id} style={styles.card}>
                <div style={styles.cardTitle}>{app.application_name}</div>
                <div style={styles.cardInfo}>
                  <strong>ID:</strong> {app.id}{" "}
                  <button
                    style={styles.copyButton}
                    onClick={() => handleCopy(app.id)}
                  >
                    Copy
                  </button>
                </div>
                <div style={styles.cardInfo}>Total Logs: {app.total_logs}</div>
                <div style={styles.cardInfo}>
                  Resolved Logs: {app.resolved_logs}
                </div>
                <div style={styles.cardInfo}>
                  Today's Logs: {app.todays_logs}
                </div>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(app.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
