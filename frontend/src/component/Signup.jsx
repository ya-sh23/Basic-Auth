export default function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="font-bold text-2xl text-center">Sign up</h2>
        <form className="space-y-4">
          <h3 className="font-bold ">Username: </h3>
          <input
            type="text"
            placeholder="Enter username"
            className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <h3 className="font-bold ">Email: </h3>
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <h3 className="font-bold ">Password: </h3>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Sign up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have account ?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
