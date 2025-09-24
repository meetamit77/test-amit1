import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Settings({ user }) {
  return (
    <div style={{ textAlign: "center", marginTop: "2em" }}>
      <h2>
        <FaUserCircle style={{ marginRight: "0.5em", color: "#43a047" }} />
        Tri luminatti Settings
      </h2>
      <p><strong>Name:</strong> {user ? user.name : "Guest"}</p>
      <p><strong>Email:</strong> {user ? user.email : "Not logged in"}</p>
    </div>
  );
}