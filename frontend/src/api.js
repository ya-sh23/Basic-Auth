const API_URL = "http://localhost:4000";

//signup
export async function signup(username, password) {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

//login
export async function login(username, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

//dashboard
export async function getDashboard() {
  const res = await fetch(`${API_URL}/dashboard`, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}

//logout
export async function logout() {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  return res.json();
}
