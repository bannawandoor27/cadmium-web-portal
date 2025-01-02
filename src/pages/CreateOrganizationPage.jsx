import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateOrganizationPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      orgName: "",
      adminEmail: "",
      adminPassword: "",
    },
    validationSchema: Yup.object({
      orgName: Yup.string()
        .min(3, "Organization name must be at least 3 characters")
        .required("Organization name is required"),
      adminEmail: Yup.string()
        .email("Invalid email address")
        .required("Admin email is required"),
      adminPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character")
        .required("Admin password is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
      const organizationData = {
        org_name: values.orgName,
        admin_email: values.adminEmail,
        admin_password: values.adminPassword,
      };

      try {
        const response = await axios.post(
          "https://cadmium.softwarescompound.in/organizations",
          organizationData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setStatus("Organization created successfully! Redirecting to login...");
          setTimeout(() => {
            resetForm();
            navigate("/"); // Navigate to the login page
          }, 2000); // Wait for 2 seconds before redirecting
        }
      } catch (error) {
        if (error.response) {
          setStatus("Failed to create organization. Please try again.");
        } else {
          setStatus("An error occurred. Please try again later.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

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
      width: "100%", // Ensure it fills horizontally
      maxWidth: "400px", // Constrain to a reasonable width
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
    buttonHover: {
      backgroundColor: "#005bb5",
    },
    error: {
      color: "#ff6b6b",
      fontSize: "0.9rem",
      marginBottom: "10px",
    },
    successMessage: {
      marginTop: "20px",
      fontSize: "1.2rem",
      color: "#4caf50", // Success green color
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create Your Organization</h1>
      <form style={styles.form} onSubmit={formik.handleSubmit}>
        <input
          type="text"
          style={styles.input}
          placeholder="Enter Organization Name"
          {...formik.getFieldProps("orgName")}
        />
        {formik.touched.orgName && formik.errors.orgName && (
          <div style={styles.error}>{formik.errors.orgName}</div>
        )}
        <input
          type="email"
          style={styles.input}
          placeholder="Enter Admin Email"
          {...formik.getFieldProps("adminEmail")}
        />
        {formik.touched.adminEmail && formik.errors.adminEmail && (
          <div style={styles.error}>{formik.errors.adminEmail}</div>
        )}
        <input
          type="password"
          style={styles.input}
          placeholder="Enter Admin Password"
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
          {formik.isSubmitting ? "Creating..." : "Create"}
        </button>
        {formik.status && <div style={styles.successMessage}>{formik.status}</div>}
      </form>
    </div>
  );
};

export default CreateOrganizationPage;
