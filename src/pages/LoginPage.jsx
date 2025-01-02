import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      adminEmail: "",
      adminPassword: "",
    },
    validationSchema: Yup.object({
      adminEmail: Yup.string()
        .email("Invalid email address")
        .required("Admin email is required"),
      adminPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Admin password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      const loginData = {
        admin_email: values.adminEmail,
        admin_password: values.adminPassword,
      };

      try {
        const response = await axios.post(
          "https://cadmium.softwarescompound.in/login",
          loginData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 200) {
          const { organization_name, id, cd_id, cd_secret } = response.data;

          // Store organization_name, id, cd_id, and cd_secret in localStorage
          localStorage.setItem("organization_name", organization_name);
          localStorage.setItem("organization_id", id);
          localStorage.setItem("cd_id", cd_id);
          localStorage.setItem("cd_secret", cd_secret);

          console.log("Login successful!");
          console.log(`Welcome, ${organization_name} (${id})`);

          // Navigate to the dashboard or home page
          navigate("/dashboard");
        }
      } catch (error) {
        setStatus("Login failed. Please check your credentials and try again.");
        console.error("Login error:", error.response?.data || error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

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
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      maxWidth: "400px",
    },
    title: {
      fontSize: "2.5rem",
      marginBottom: "30px",
      fontWeight: "bold",
    },
    input: {
      marginBottom: "10px",
      padding: "10px",
      fontSize: "1rem",
      width: "100%",
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
    buttonSecondary: {
      backgroundColor: "#6c757d",
    },
    buttonHover: {
      backgroundColor: "#005bb5",
    },
    error: {
      color: "#ff6b6b",
      fontSize: "0.9rem",
      marginBottom: "10px",
    },
    statusMessage: {
      marginTop: "20px",
      fontSize: "1.2rem",
      color: "#4caf50", // Success green color
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Cadmium</h1>
      <form style={styles.form} onSubmit={formik.handleSubmit}>
        <input
          type="email"
          style={styles.input}
          placeholder="Admin Email"
          {...formik.getFieldProps("adminEmail")}
        />
        {formik.touched.adminEmail && formik.errors.adminEmail && (
          <div style={styles.error}>{formik.errors.adminEmail}</div>
        )}
        <input
          type="password"
          style={styles.input}
          placeholder="Admin Password"
          {...formik.getFieldProps("adminPassword")}
        />
        {formik.touched.adminPassword && formik.errors.adminPassword && (
          <div style={styles.error}>{formik.errors.adminPassword}</div>
        )}
        <button
          type="submit"
          style={styles.button}
          disabled={formik.isSubmitting}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
        >
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </button>
        {formik.status && <div style={styles.statusMessage}>{formik.status}</div>}
      </form>
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
