import React, { useEffect, useState } from "react";
import TrainingCalendar from "./TrainingCalendar";
import ActivitiesTable from "./ActivitiesTable";

export default function Training({ trainingView }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    fetch("http://localhost:8000/api/workouts", {
      headers: token ? { "Authorization": `Bearer ${token}` } : {}
    })
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(err => {
        console.error("Failed to fetch workouts:", err);
        setActivities([]);
      });
  }, []);

  return (
    <div>
      {trainingView === "Calendar" ? (
        <TrainingCalendar activities={activities} />
      ) : (
        <ActivitiesTable activities={activities} />
      )}
    </div>
  );
}