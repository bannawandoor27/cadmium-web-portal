import React, { useState } from "react";

const CreateOrganizationPage = () => {
  const [orgName, setOrgName] = useState("");

  const handleCreateOrganization = () => {
    console.log(`Creating organization: ${orgName}`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Create Your Organization</h1>
      <input
        type="text"
        placeholder="Organization Name"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
      />
      <br />
      <button onClick={handleCreateOrganization}>Create</button>
    </div>
  );
};

export default CreateOrganizationPage;
