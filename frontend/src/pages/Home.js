import React from "react";
import Logo from "../Logo.png";
import Login from "../components/Login";

export default function Home({ onLoginSuccess }) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #e3f2fd 0%, #fffde7 100%)"
    }}>
      <img src={Logo} alt="Tri-luminatti Logo" style={{ width: 120, marginBottom: "1em" }} />
      <h1 style={{ fontSize: "2.5em", fontWeight: "bold", color: "#4285F4", marginBottom: "1em" }}>
        Tri-luminatti
      </h1>
      <Login onLoginSuccess={onLoginSuccess} />
    </div>
  );
}
