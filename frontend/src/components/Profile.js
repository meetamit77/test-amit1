import React, { useEffect, useState } from "react";
import { FaUserCircle, FaRunning, FaBiking, FaSwimmer, FaCalendarAlt, FaChalkboardTeacher } from "react-icons/fa";


export default function Profile({ user }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    fetch("http://localhost:8000/api/workouts", {
      headers: token ? { "Authorization": `Bearer ${token}` } : {}
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch activities");
        return res.json();
      })
      .then(data => {
        console.log('Fetched activities:', data);
        setActivities(data); // Store all activities for metrics
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Calculate metrics from activities
  const currentYear = new Date().getFullYear();
  const metrics = {
    year: { Run: 0, Bike: 0, Swim: 0 },
    allTime: { Run: 0, Bike: 0, Swim: 0 }
  };
  activities.forEach(a => {
    // Extract numeric value and unit from distance string (e.g., "500 m", "7.89 km")
    let dist = 0;
    let unit = "km";
    if (a.distance) {
      const match = a.distance.match(/([\d.]+)\s*(km|m)/i);
      if (match) {
        dist = Number(match[1]);
        unit = match[2].toLowerCase();
        if (unit === "m") dist = dist / 1000; // Convert meters to kilometers
      }
    }
    if (a.sport === "Run") {
      metrics.allTime.Run += dist;
      if (new Date(a.date).getFullYear() === currentYear) metrics.year.Run += dist;
    } else if (a.sport === "Bike") {
      metrics.allTime.Bike += dist;
      if (new Date(a.date).getFullYear() === currentYear) metrics.year.Bike += dist;
    } else if (a.sport === "Swim") {
      metrics.allTime.Swim += dist;
      if (new Date(a.date).getFullYear() === currentYear) metrics.year.Swim += dist;
    }
  });

  return (
    <div style={{ textAlign: "center", marginTop: "2em" }}>
      <h2>
        <FaUserCircle style={{ marginRight: "0.5em", color: "#4285F4" }} />
        {`Tri-luminatti : ${user && user.name ? ` ${user.name}` : ''}`}
      </h2>
      <h3>Last 5 Activities</h3>
      {loading ? (
        <div>Loading activities...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <table style={{ margin: "0 auto", borderCollapse: "collapse", minWidth: "320px", boxShadow: "0 2px 8px #e3f2fd" }}>
          <thead>
            <tr style={{ background: "#4285F4", color: "#fff" }}>
              <th style={{ padding: "0.7em 1em", border: "none" }}>Date</th>
              <th style={{ padding: "0.7em 1em", border: "none" }}>Type</th>
              <th style={{ padding: "0.7em 1em", border: "none" }}>Distance (km)</th>
            </tr>
          </thead>
          <tbody>
            {activities.slice(-5).reverse().map((a, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#e3f2fd" : "#fff" }}>
                <td style={{ padding: "0.7em 1em" }}>{a.date}</td>
                <td style={{ padding: "0.7em 1em", fontWeight: "bold", color: a.sport === "Run" ? "#4285F4" : a.sport === "Bike" ? "#43a047" : "#fbc02d" }}>{a.sport}</td>
                <td style={{ padding: "0.7em 1em" }}>{a.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3 style={{ marginTop: "2em" }}>Aggregate Metrics</h3>
      <table style={{ margin: "0 auto", borderCollapse: "collapse", minWidth: "320px", boxShadow: "0 2px 8px #e3f2fd" }}>
        <thead>
          <tr style={{ background: "#43a047", color: "#fff" }}>
            <th style={{ padding: "0.7em 1em", border: "none" }}>Period</th>
            <th style={{ padding: "0.7em 1em", border: "none" }}>Run (km)</th>
            <th style={{ padding: "0.7em 1em", border: "none" }}>Bike (km)</th>
            <th style={{ padding: "0.7em 1em", border: "none" }}>Swim (km)</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ background: "#e3f2fd" }}>
            <td style={{ padding: "0.7em 1em", fontWeight: "bold" }}>This Year</td>
            <td style={{ padding: "0.7em 1em", color: "#4285F4" }}>{metrics.year.Run}</td>
            <td style={{ padding: "0.7em 1em", color: "#43a047" }}>{metrics.year.Bike}</td>
            <td style={{ padding: "0.7em 1em", color: "#fbc02d" }}>{metrics.year.Swim}</td>
          </tr>
          <tr style={{ background: "#fff" }}>
            <td style={{ padding: "0.7em 1em", fontWeight: "bold" }}>All Time</td>
            <td style={{ padding: "0.7em 1em", color: "#4285F4" }}>{metrics.allTime.Run}</td>
            <td style={{ padding: "0.7em 1em", color: "#43a047" }}>{metrics.allTime.Bike}</td>
            <td style={{ padding: "0.7em 1em", color: "#fbc02d" }}>{metrics.allTime.Swim}</td>
          </tr>
        </tbody>
      </table>
      {!user && <div style={{ marginTop: "1em", color: "#888" }}>Login to see your personalized stats.</div>}
    </div>
  );
}