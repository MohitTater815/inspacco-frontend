import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import { AlertProvider } from "./components/Alert";
import AuthLayout from "./auth/layout";
import ProtectedRoute from "./auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard";


const App = () => {
  return (
    <Router>
      <AlertProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/auth" element={<AuthLayout />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AlertProvider>
    </Router>
  );
};

export default App;
