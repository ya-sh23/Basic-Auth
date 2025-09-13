import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import "./App.css";
import Home from "./component/Home";
import Login from "./component/login";
import Signup from "./component/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
