import { Routes, Route } from "react-router-dom";

import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";

function App() {
  return (
    <div className="">
      <Routes>
        {/* Public routes */}
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
