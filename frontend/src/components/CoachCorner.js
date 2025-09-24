import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function CoachCorner() {
  return (
    <div>
      <h2 style={{ color: "#fbc02d" }}>
        <FaChalkboardTeacher style={{ marginRight: "0.5em" }} />
        Coach Corner
      </h2>
      <p>Tips and resources from your coach.</p>
    </div>
  );
}