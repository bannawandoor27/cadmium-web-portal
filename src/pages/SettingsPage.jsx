import React from "react";

const SettingsPage = () => {
  const cd_id = localStorage.getItem("cd_id");
  const cd_secret = localStorage.getItem("cd_secret");

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      backgroundColor: "#121212", // Dark theme background
      color: "#ffffff", // Light text color
      height: "100vh",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "2.5rem",
      marginBottom: "30px",
      fontWeight: "bold",
    },
    info: {
      fontSize: "1.2rem",
      margin: "10px 0",
      wordBreak: "break-word",
    },
    copyButton: {
      padding: "8px 15px",
      backgroundColor: "#1f78d1",
      color: "#ffffff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem",
      marginTop: "10px",
    },
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Settings</h1>
      <div style={styles.info}>
        <strong>CD-ID:</strong> {cd_id}
        <button
          style={styles.copyButton}
          onClick={() => handleCopy(cd_id)}
        >
          Copy
        </button>
      </div>
      <div style={styles.info}>
        <strong>CD-Secret:</strong> {cd_secret}
        <button
          style={styles.copyButton}
          onClick={() => handleCopy(cd_secret)}
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
