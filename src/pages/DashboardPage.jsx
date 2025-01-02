import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        const response = await axios.get("https://cadmium.softwarescompound.in/applications", {
          headers: {
            "CD-ID": cd_id,
            "CD-Secret": cd_secret,
          },
        });

        if (response.status === 200) {
          setApplications(response.data);
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch applications. Please try again.");
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: "#121212", // Dark theme background
      color: "#ffffff", // Light text color
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "2.5rem",
      marginBottom: "30px",
      fontWeight: "bold",
    },
    applicationList: {
      marginTop: "20px",
      width: "80%",
      maxWidth: "800px",
      backgroundColor: "#1e1e1e",
      padding: "20px",
      borderRadius: "8px",
    },
    applicationItem: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      borderBottom: "1px solid #333",
    },
    applicationName: {
      fontWeight: "bold",
      fontSize: "1.2rem",
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
      <h1 style={styles.title}>Dashboard</h1>
      {loading ? (
        <div style={styles.loader}>Loading applications...</div>
      ) : error ? (
        <div style={styles.error}>{error}</div>
      ) : (
        <div style={styles.applicationList}>
          {applications.length === 0 ? (
            <div>No applications found for this organization.</div>
          ) : (
            applications.map((app) => (
              <div key={app.id} style={styles.applicationItem}>
                <span style={styles.applicationName}>{app.application_name}</span>
                <span>ID: {app.id}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
