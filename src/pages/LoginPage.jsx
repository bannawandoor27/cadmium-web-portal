import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Logging in...");
  };

  const goToCreateOrganization = () => {
    navigate("/create-organization");
  };

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
    button: {
      margin: "15px 0",
      padding: "12px 25px",
      fontSize: "1rem",
      color: "#ffffff",
      backgroundColor: "#1f78d1",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonSecondary: {
      backgroundColor: "#6c757d",
    },
    buttonHover: {
      backgroundColor: "#005bb5",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Cadmium</h1>
      <button
        style={styles.button}
        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        onClick={handleLogin}
      >
        Login
      </button>
      <button
        style={{ ...styles.button, ...styles.buttonSecondary }}
        onClick={goToCreateOrganization}
      >
        Create Your Organization
      </button>
    </div>
  );
};

export default LoginPage;
