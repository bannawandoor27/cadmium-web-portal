import React from "react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();
  const cd_id = localStorage.getItem("cd_id");
  const cd_secret = localStorage.getItem("cd_secret");

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
    backButton: {
      padding: "10px 20px",
      fontSize: "1rem",
      color: "#ffffff",
      backgroundColor: "#1f78d1",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    content: {
      flex: 1,
      padding: "40px 20px",
      maxWidth: "800px",
      margin: "0 auto",
      width: "100%",
    },
    card: {
      backgroundColor: "#1e1e1e",
      borderRadius: "8px",
      padding: "30px",
      border: "1px solid #333",
    },
    sectionTitle: {
      fontSize: "1.5rem",
      marginBottom: "30px",
      color: "#ffffff",
      borderBottom: "1px solid #333",
      paddingBottom: "10px",
    },
    infoContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    infoItem: {
      backgroundColor: "#252525",
      padding: "20px",
      borderRadius: "6px",
      border: "1px solid #333",
    },
    infoHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
    },
    label: {
      fontWeight: "bold",
      color: "#888",
      fontSize: "0.9rem",
      textTransform: "uppercase",
    },
    value: {
      color: "#ffffff",
      fontSize: "1.1rem",
      wordBreak: "break-all",
      fontFamily: "monospace",
      marginTop: "5px",
    },
    copyButton: {
      padding: "8px 15px",
      backgroundColor: "#2d3748",
      color: "#ffffff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "0.875rem",
      transition: "background-color 0.2s",
    },
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <h1 style={styles.title}>Settings</h1>
        <button 
          style={styles.backButton}
          onClick={() => navigate("/dashboard")}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#1857a4"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#1f78d1"}
        >
          Back to Dashboard
        </button>
      </div>

      <div style={styles.content}>
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>API Credentials</h2>
          <div style={styles.infoContainer}>
            <div style={styles.infoItem}>
              <div style={styles.infoHeader}>
                <span style={styles.label}>CD-ID</span>
                <button
                  style={styles.copyButton}
                  onClick={() => handleCopy(cd_id)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#3d4a5f"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#2d3748"}
                >
                  Copy
                </button>
              </div>
              <div style={styles.value}>{cd_id}</div>
            </div>

            <div style={styles.infoItem}>
              <div style={styles.infoHeader}>
                <span style={styles.label}>CD-Secret</span>
                <button
                  style={styles.copyButton}
                  onClick={() => handleCopy(cd_secret)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#3d4a5f"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#2d3748"}
                >
                  Copy
                </button>
              </div>
              <div style={styles.value}>{cd_secret}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;