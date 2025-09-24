export async function fetchWorkouts() {
  const token = localStorage.getItem("jwt");
  const res = await fetch("http://localhost:8000/api/workouts", {
    headers: token ? { "Authorization": `Bearer ${token}` } : {}
  });
  return res.json();
}