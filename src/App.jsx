import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./auth/login";
import SignUp from "./auth/signup";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";


const App = () => {
  return (
    <Router >
      <Navbar /> {/* Navbar displayed on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
