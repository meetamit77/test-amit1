import React, { useState, useEffect, useRef } from "react";
import Logo from "../Logo.png";
import { FaUserCircle, FaRunning, FaBiking, FaSwimmer, FaCalendarAlt, FaChalkboardTeacher } from "react-icons/fa";
import Events from "./Events";
import CoachCorner from "./CoachCorner";
import Profile from "./Profile";
import Settings from "./Settings";
import Training from "./Training";
import ActivitiesTable from "./ActivitiesTable";
import { mockActivities, mockMetrics } from "./mockData";


function formatDuration(seconds) {
  if (!seconds) return "-";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h > 0 ? h : null, m, s].filter(v => v !== null).map(v => String(v).padStart(2, "0")).join(":");
}

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

export default function LandingPage({ user: initialUser }) {
  const [activeTab, setActiveTab] = useState("Training");
  const [user, setUser] = useState(initialUser || null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [profileOrSettings, setProfileOrSettings] = useState(null); // null, "Profile", or "Settings"
  const [showTrainingDropdown, setShowTrainingDropdown] = useState(false);
  const [trainingView, setTrainingView] = useState("MyActivities");
  const trainingDropdownRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    const name = params.get("name");
    if (token && email && name) {
      setUser({ email, name });
    }
  }, []);

  // Hide dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
      if (
        trainingDropdownRef.current &&
        !trainingDropdownRef.current.contains(event.target)
      ) {
        setShowTrainingDropdown(false);
      }
    }
    if (showDropdown || showTrainingDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown, showTrainingDropdown]);

  const handleUserIconClick = () => {
    setShowDropdown(true);
    setProfileOrSettings(null);
  };

  const handleDropdownSelect = (option, event) => {
    event.stopPropagation(); // Prevent click-outside from firing
    setProfileOrSettings(option);
    setShowDropdown(false);
  };

  // Handle Training tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowDropdown(false);
    setProfileOrSettings(null); // Reset profile/settings view when switching tabs
    setShowTrainingDropdown(tab === "Training");
  };

  // Tab icons and tab list
  const tabIcons = {
    Training: (
      <span>
        <FaRunning style={{ marginRight: "0.2em", color: "#4285F4" }} />
        <FaBiking style={{ marginRight: "0.2em", color: "#43a047" }} />
        <FaSwimmer style={{ color: "#fbc02d" }} />
      </span>
    ),
    Events: <FaCalendarAlt style={{ marginRight: "0.5em", color: "#43a047" }} />,
    "Coach Corner": <FaChalkboardTeacher style={{ marginRight: "0.5em", color: "#fbc02d" }} />,
  };

  const tabList = ["Training", "Events", "Coach Corner"];

  return (
    <div style={{ background: "linear-gradient(135deg, #e3f2fd 0%, #fffde7 100%)", minHeight: "100vh" }}>
      {/* Header with logo and app name */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.2em 2em",
        background: "linear-gradient(90deg, #4285F4 0%, #43a047 100%)",
        color: "#fff",
        borderBottom: "2px solid #ddd",
        boxShadow: "0 2px 8px rgba(66,133,244,0.08)",
        position: "relative"
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={Logo} alt="Tri-luminatti Logo" style={{ width: 48, marginRight: "1em" }} />
          <span style={{ fontSize: "2em", fontWeight: "bold", letterSpacing: "2px", textShadow: "1px 1px 4px #4285F4" }}>
            Tri-luminatti
          </span>
        </div>
        <div style={{ cursor: "pointer", position: "relative" }} onClick={handleUserIconClick}>
          <FaUserCircle size={36} color={user ? "#fff" : "#eee"} />
          {showDropdown && (
            <div
              ref={dropdownRef}
              style={{
                position: "absolute",
                right: 0,
                top: "2.5em",
                background: "#fff",
                border: "1px solid #4285F4",
                borderRadius: "6px",
                boxShadow: "0 4px 16px rgba(66,133,244,0.15)",
                zIndex: 10,
                minWidth: "140px",
                color: "#222",
                fontWeight: "500"
              }}>
              <div
                style={{
                  padding: "0.85em 1.2em",
                  cursor: "pointer",
                  background: "#fff",
                  color: profileOrSettings === "Profile" ? "#4285F4" : "#222",
                  fontWeight: profileOrSettings === "Profile" ? "bold" : "500",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#e3f2fd"}
                onMouseLeave={e => e.currentTarget.style.background = profileOrSettings === "Profile" ? "#e3f2fd" : "#fff"}
                onClick={e => handleDropdownSelect("Profile", e)}
              >
                Profile
              </div>
              <div
                style={{
                  padding: "0.85em 1.2em",
                  cursor: "pointer",
                  background: "#fff",
                  color: profileOrSettings === "Settings" ? "#4285F4" : "#222",
                  fontWeight: profileOrSettings === "Settings" ? "bold" : "500",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#e3f2fd"}
                onMouseLeave={e => e.currentTarget.style.background = profileOrSettings === "Settings" ? "#e3f2fd" : "#fff"}
                onClick={e => handleDropdownSelect("Settings", e)}
              >
                Settings
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Horizontal tabs */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1em 2em",
        background: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        position: "relative"
      }}>
        <div style={{ display: "flex", gap: "1em", position: "relative" }}>
          {tabList.map(tab => (
            <button
              key={tab}
              style={{
                padding: "0.7em 2em",
                background: activeTab === tab ? "#4285F4" : "#fff",
                color: activeTab === tab ? "#fff" : "#333",
                border: activeTab === tab ? "2px solid #4285F4" : "1px solid #ddd",
                borderRadius: "24px 24px 0 0",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1.1em",
                boxShadow: activeTab === tab ? "0 2px 8px rgba(66,133,244,0.15)" : "none",
                display: "flex",
                alignItems: "center",
                outline: "none",
                marginBottom: "-1px"
              }}
              onClick={() => handleTabClick(tab)}
            >
              {tabIcons[tab]} {tab}
            </button>
          ))}
          {/* Training dropdown */}
          {showTrainingDropdown && activeTab === "Training" && (
            <div
              ref={trainingDropdownRef}
              style={{
                position: "absolute",
                left: "180px",
                top: "3.2em",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                zIndex: 10,
                minWidth: "150px"
              }}
            >
              <div
                style={{
                  padding: "0.75em 1em",
                  cursor: "pointer",
                  background: trainingView === "Calendar" ? "#f0f8ff" : "#fff"
                }}
                onClick={() => {
                  setTrainingView("Calendar");
                  setShowTrainingDropdown(false);
                }}
              >
                Calendar
              </div>
              <div
                style={{
                  padding: "0.75em 1em",
                  cursor: "pointer",
                  background: trainingView === "MyActivities" ? "#f0f8ff" : "#fff"
                }}
                onClick={() => {
                  setTrainingView("MyActivities");
                  setShowTrainingDropdown(false);
                }}
              >
                My Activities
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: "2em" }}>
        {profileOrSettings === "Profile" ? (
          <Profile user={user} />
        ) : profileOrSettings === "Settings" ? (
          <Settings user={user} />
        ) : activeTab === "Training" ? (
          <Training trainingView={trainingView} />
        ) : activeTab === "Events" ? (
          (console.log("Rendering Events tab"), <Events />)
        ) : (
          <CoachCorner />
        )}
      </div>
    </div>
  );
}