import {Link} from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col bg-black w-full min-h-screen justify-center items-center">
      <h1 className="text-yellow-500 font-bold text-2xl pb-2">
        Welcome to the demo of Basic Auth
      </h1>
      <div className="bg-white rounded-2xl shadow-lg w-96 px-4 py-2">
        <div className="flex flex-col gap-4 px-2 py-2">
          <p className="text-xl px-2 py-2 text-black font-bold">First time ?</p>
          <Link
            to="/signup"
            className="w-full bg-indigo-600 rounded-lg text-white py-3 px-2 text-center hover:bg-indigo-700"
          >
            Yeah first time
          </Link>

          <p className="text-xl px-2 py-2 text-black font-bold">Nope ?</p>
          <Link
            to="/login"
            className="w-full bg-indigo-600 rounded-lg text-white px-2 py-3 text-center hover:bg-indigo-700 mb-2"
          >
            Then just Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
