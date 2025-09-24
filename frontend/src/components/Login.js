import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const GOOGLE_LOGIN_URL = "http://localhost:8000/api/auth/google/login";

export default function Login({ onLoginSuccess }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    const name = params.get("name");
    const token = params.get("token");
    
    if (email && name && token) {
      setUser({ email, name });
      localStorage.setItem("jwt", token);
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwt");
        setUser(null);
      }
      if (onLoginSuccess) onLoginSuccess({ email, name });
    }
  }, [onLoginSuccess]);

  const handleLogin = () => {
    window.location.href = GOOGLE_LOGIN_URL;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "3em" }}>
      <h1>Welcome to Tri Illuminati</h1>
      <p>Your all-in-one fitness and coaching platform.</p>
      {!user ? (
        <button
          style={{
            padding: "1em 2em",
            fontSize: "1.1em",
            background: "#4285F4",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleLogin}
        >
          Login with Google
        </button>
      ) : null}
    </div>
  );
}