import { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      console.log("Login response:", res); // Debug log
      setMessage(res.message);
      if (res.user) {
        console.log("User found, navigating to dashboard"); // Debug log
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error); // Debug log
      setMessage("Login failed. Please try again. Error: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="font-bold text-2xl text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h3 className="font-bold ">Username: </h3>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <h3 className="font-bold ">Password: </h3>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {message && <p className="text-center text-red-500 mt-4">{message}</p>}

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have account ?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
