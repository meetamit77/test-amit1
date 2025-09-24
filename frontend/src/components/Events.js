import React, { useEffect, useState } from "react";

export default function Events() {
  const [clubEvents, setClubEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", sport: "", date: "", time: "" });
  const [saving, setSaving] = useState(false);

  // Fetch club events

  const fetchEvents = () => {
    const token = localStorage.getItem("jwt");
    fetch("http://localhost:8000/api/club-events", {
      headers: token ? { "Authorization": `Bearer ${token}` } : {}
    })
      .then(res => res.json())
      .then(data => setClubEvents(data))
      .catch(() => setClubEvents([]));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle form input
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("jwt");
    await fetch("http://localhost:8000/api/club-events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      },
      body: JSON.stringify(form)
    });
    setSaving(false);
    setShowForm(false);
    setForm({ sport: "", date: "", time: "" });
    fetchEvents();
  };

  return (
    <div style={{ maxWidth: 600, margin: "2em auto" }}>
      <section style={{ marginBottom: "2em" }}>
        <h2 style={{ color: "#43a047", borderBottom: "1px solid #ddd", paddingBottom: "0.5em" }}>
          Club Events
        </h2>
        <button
          style={{
            marginBottom: "1em",
            padding: "0.5em 1.2em",
            background: "#43a047",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
          onClick={() => setShowForm(true)}
        >
          + Create Club Event
        </button>
        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: "1em", background: "#f5f5f5", padding: "1em", borderRadius: "6px" }}>
            <div style={{ marginBottom: "0.7em" }}>
              <label>Name: </label>
              <input name="name" value={form.name} onChange={handleChange} required style={{ marginLeft: "1em" }} />
            </div>
            <div style={{ marginBottom: "0.7em" }}>
              <label>Sport: </label>
              <input name="sport" value={form.sport} onChange={handleChange} required style={{ marginLeft: "1em" }} />
            </div>
            <div style={{ marginBottom: "0.7em" }}>
              <label>Date: </label>
              <input name="date" type="date" value={form.date} onChange={handleChange} required style={{ marginLeft: "1em" }} />
            </div>
            <div style={{ marginBottom: "0.7em" }}>
              <label>Time: </label>
              <input name="time" type="time" value={form.time} onChange={handleChange} required style={{ marginLeft: "1em" }} />
            </div>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: "0.5em 1.2em",
                background: "#4285F4",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                marginLeft: "1em",
                padding: "0.5em 1.2em",
                background: "#eee",
                color: "#333",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
          </form>
        )}
        {clubEvents.length === 0 ? (
          <div style={{ color: "#888", fontStyle: "italic" }}>No club events available.</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1em" }}>
            <thead>
              <tr style={{ background: "#f5f5f5" }}>
                <th style={{ padding: "0.5em", textAlign: "left" }}>Name</th>
                <th style={{ padding: "0.5em", textAlign: "left" }}>Sport</th>
                <th style={{ padding: "0.5em", textAlign: "left" }}>Date</th>
                <th style={{ padding: "0.5em", textAlign: "left" }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {clubEvents.map((event, idx) => (
                <tr key={idx}>
                  <td style={{ padding: "0.5em" }}>{event.name}</td>
                  <td style={{ padding: "0.5em" }}>{event.sport}</td>
                  <td style={{ padding: "0.5em" }}>{event.date}</td>
                  <td style={{ padding: "0.5em" }}>{event.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      <section>
        <h2 style={{ color: "#4285F4", borderBottom: "1px solid #ddd", paddingBottom: "0.5em" }}>Other Running Events</h2>
        <div style={{ textAlign: "left", marginTop: "1em" }}>
          <a
            href="https://www.indiarunning.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "1.2em",
              color: "#4285F4",
              textDecoration: "underline",
              fontWeight: "bold"
            }}
          >
            India Running Events
          </a>
        </div>
      </section>
    </div>
  );
}