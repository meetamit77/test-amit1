import React from "react";
import { FaRunning, FaSwimmer, FaDumbbell, FaBiking } from "react-icons/fa";

// Helper to get all days in the current month
function getMonthDays(year, month) {
  const days = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

// Helper to group activities by date
function groupByDate(activities) {
  const map = {};
  activities.forEach(act => {
    if (!act.date) return; // skip if missing
    const d = new Date(act.date);
    if (isNaN(d.getTime())) return; // skip if invalid
    const key = d.toISOString().slice(0, 10);
    if (!map[key]) map[key] = [];
    map[key].push(act);
  });
  return map;
}

// Helper to get weekly totals
function getWeeklyTotals(activities, year, month) {
  const weeks = {};
  activities.forEach(act => {
    if (!act.date) return;
    const d = new Date(act.date);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const week = getWeekOfMonth(d);
      if (!weeks[week]) weeks[week] = { distance: 0, time: 0, calories: 0 };
      weeks[week].distance += act.distance || 0;
      weeks[week].time += act.duration || 0;
      weeks[week].calories += act.calories || 0;
    }
  });
  return weeks;
}

function getWeekOfMonth(date) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return Math.floor((date.getDate() + firstDay - 1) / 7);
}

function formatDuration(seconds) {
  if (!seconds) return "0:00:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map(v => String(v).padStart(2, "0")).join(":");
}

// Icon helper
function getSportIcon(sport) {
  if (sport === "Run" || sport === "Running") return <FaRunning color="#f57c00" />;
  if (sport === "Bike" || sport === "Cycling") return <FaBiking color="#43a047" />;
  if (sport === "Swim" || sport === "Swimming") return <FaSwimmer color="#1976d2" />;
  if (sport === "Strength") return <FaDumbbell color="#388e3c" />;
  return null;
}

export default function TrainingCalendar({ activities }) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const days = getMonthDays(year, month);
  const grouped = groupByDate(activities);
  const weeklyTotals = getWeeklyTotals(activities, year, month);

  return (
    <div style={{ display: "flex", gap: "2em" }}>
      {/* Calendar grid */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", background: "#f5f5f5", borderBottom: "1px solid #ddd" }}>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
            <div key={day} style={{ padding: "0.5em", fontWeight: "bold", textAlign: "center" }}>{day}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gridAutoRows: "120px", border: "1px solid #eee" }}>
          {/* Fill empty days at start */}
          {Array(days[0].getDay() === 0 ? 6 : days[0].getDay() - 1).fill(null).map((_, i) => (
            <div key={`empty-${i}`} style={{ background: "#fafafa", border: "1px solid #eee" }} />
          ))}
          {/* Render days */}
          {days.map(day => {
            const key = day.toISOString().slice(0, 10);
            const acts = grouped[key] || [];
            return (
              <div key={key} style={{
                border: "1px solid #eee",
                background: "#fff",
                padding: "0.3em",
                position: "relative"
              }}>
                <div style={{ fontWeight: "bold", fontSize: "1em", marginBottom: "0.2em" }}>{day.getDate()}</div>
                {acts.map((act, idx) => (
                  <div key={idx} style={{
                    background: act.sport === "Run" ? "#ffe0b2" :
                      act.sport === "Swim" ? "#bbdefb" :
                      act.sport === "Bike" ? "#c8e6c9" :
                      act.sport === "Strength" ? "#f5f5f5" : "#f5f5f5",
                    borderRadius: "4px",
                    marginBottom: "0.2em",
                    padding: "0.2em 0.4em",
                    fontSize: "0.95em",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3em"
                  }}>
                    {getSportIcon(act.sport)}
                    <span>{act.title || act.description || act.sport}</span>
                    <span style={{ marginLeft: "auto", fontSize: "0.9em", color: "#555" }}>
                      {act.distance || ""}
                      {act.time ? `, ${act.time}` : ""}
                      {act.duration ? `, ${formatDuration(act.duration)}` : ""}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      {/* Weekly totals */}
      <div style={{
        minWidth: "180px",
        background: "#424242",
        color: "#fff",
        borderRadius: "8px",
        padding: "1em",
        fontSize: "1em",
        height: "fit-content"
      }}>
        <div style={{ fontWeight: "bold", fontSize: "1.1em", marginBottom: "0.5em" }}>Weekly Totals</div>
        {Object.keys(weeklyTotals).map(week => (
          <div key={week} style={{ marginBottom: "1em", borderBottom: "1px solid #616161", paddingBottom: "0.5em" }}>
            <div style={{ fontWeight: "bold" }}>Week {parseInt(week) + 1}:</div>
            <div>Distance: {typeof weeklyTotals[week].distance === "number"
              ? weeklyTotals[week].distance.toFixed(2)
              : "0.00"} km</div>
            <div>Time: {formatDuration(weeklyTotals[week].time)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}