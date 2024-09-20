import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import About from "./components/about/About";

function App() {
  return (
    <div className="">
      <Routes>
        {/* Public routes */}
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/about" exact element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
