// Main app scaffold
import React, { useState } from "react";
import Home from "./pages/Home";
import LandingPage from "./components/LandingPage";

export default function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userInfo) => {
    setUser(userInfo);
  };

  return (
    <>
      {!user ? (
        <Home onLoginSuccess={handleLoginSuccess} />
      ) : (
        <LandingPage user={user} />
      )}
    </>
  );
}
