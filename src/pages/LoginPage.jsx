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

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Cadmium</h1>
      <button onClick={handleLogin}>Login</button>
      <br />
      <button onClick={goToCreateOrganization}>Create Your Organization</button>
    </div>
  );
};

export default LoginPage;
