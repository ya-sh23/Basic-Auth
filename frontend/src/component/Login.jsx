export default function Login(){
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h2 className="font-bold text-2xl text-center">Login</h2>
          <form className="space-y-4">
            <h3 className="font-bold ">Username: </h3>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <h3 className="font-bold ">Password: </h3>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </form>

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
