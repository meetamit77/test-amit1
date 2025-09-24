import React from "react";

const thStyle = {
  padding: "0.5em",
  borderBottom: "2px solid #ddd",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "0.5em",
  borderBottom: "1px solid #eee",
};

export default function ActivitiesTable({ activities }) {
  console.log("ActivitiesTable received activities:", activities);
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95em" }}>
      <thead>
        <tr style={{ background: "#f5f5f5" }}>
          <th style={thStyle}>Sport</th>
          <th style={thStyle}>Date</th>
          <th style={thStyle}>Time</th>
          <th style={thStyle}>Title</th>
          <th style={thStyle}>Distance</th>
          <th style={thStyle}>Elevation</th>
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((act, idx) => {
          console.log("Activity object:", act);
          return (
            <tr key={act.id ?? idx} style={{ borderBottom: "1px solid #eee" }}>
              <td style={tdStyle}>{act.sport}</td>
              <td style={tdStyle}>
                {(() => {
                  if (!act.date) return "-";
                  const d = new Date(act.date);
                  return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
                })()}
              </td>
              <td style={tdStyle}>{act.time || "-"}</td>
              <td style={tdStyle}>
                <a href="#" style={{ color: "#4285F4", textDecoration: "underline" }}>
                  {act.title || act.description || "Untitled"}
                </a>
              </td>
              <td style={tdStyle}>{act.distance || "-"}</td>
              <td style={tdStyle}>{act.elevation || "-"}</td>
              <td style={tdStyle}>
                <a href="#" style={{ marginRight: "0.5em", color: "#4285F4" }}>Edit</a>
                <a href="#" style={{ marginRight: "0.5em", color: "#d32f2f" }}>Delete</a>
                <button style={{ padding: "0.2em 0.5em", fontSize: "0.9em" }}>Share</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}