import { useState } from "react";
import { signup } from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(username, password);
      setMessage(res.message);
      if (res.message.includes("successful")) {
        navigate("/login");
      }
    } catch (error) {
      setMessage("Signup failed. Please try again. Error: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="font-bold text-2xl text-center">Sign up</h2>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign up
          </button>
        </form>

        {message && <p className="text-center text-red-500 mt-4">{message}</p>}

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have account ?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
