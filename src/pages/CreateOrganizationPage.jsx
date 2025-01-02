import React, { useState } from "react";

const CreateOrganizationPage = () => {
  const [orgName, setOrgName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleCreateOrganization = async () => {
    const organizationData = {
      org_name: orgName,
      admin_email: adminEmail,
      admin_password: adminPassword,
    };

    console.log("Creating organization with data:", organizationData);

    // Replace this with your API call
    try {
      const response = await fetch("https://your-api-endpoint/organizations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(organizationData),
      });

      if (response.ok) {
        console.log("Organization created successfully!");
      } else {
        console.error("Failed to create organization:", await response.text());
      }
    } catch (error) {
      console.error("Error creating organization:", error);
    }
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
    input: {
      marginBottom: "20px",
      padding: "10px",
      fontSize: "1rem",
      width: "300px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      backgroundColor: "#1e1e1e",
      color: "#ffffff",
    },
    button: {
      margin: "10px 0",
      padding: "12px 25px",
      fontSize: "1rem",
      color: "#ffffff",
      backgroundColor: "#1f78d1",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#005bb5",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create Your Organization</h1>
      <input
        type="text"
        style={styles.input}
        placeholder="Enter Organization Name"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
      />
      <input
        type="email"
        style={styles.input}
        placeholder="Enter Admin Email"
        value={adminEmail}
        onChange={(e) => setAdminEmail(e.target.value)}
      />
      <input
        type="password"
        style={styles.input}
        placeholder="Enter Admin Password"
        value={adminPassword}
        onChange={(e) => setAdminPassword(e.target.value)}
      />
      <button
        style={styles.button}
        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        onClick={handleCreateOrganization}
      >
        Create
      </button>
    </div>
  );
};

export default CreateOrganizationPage;
