import { useState, useEffect } from "react";
import { logout, getDashboard } from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        console.log("Fetching dashboard..."); // Debug log
        const res = await getDashboard();
        console.log("Dashboard response:", res); // Debug log
        if (res.message && res.message.includes("Welcome")) {
          setUser(res.message.split(" ")[1]); // Extract username from "Welcome username"
        } else {
          setError("Unauthorized access");
          navigate("/login");
        }
      } catch (error) {
        console.error("Dashboard error:", error); // Debug log
        setError("Failed to load dashboard");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res.message === "Logged out successfully") {
        navigate("/");
      }
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-black w-full min-h-screen justify-center items-center">
      <h1 className="text-yellow-500 font-bold text-2xl pb-2">
        Welcome to the Dashboard, {user}!
      </h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
