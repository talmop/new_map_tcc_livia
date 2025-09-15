import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Map from "./components/Map";
import PointDetails from "./components/PointDetails";
import Ratings from "./components/Ratings";
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/map" element={<Map />} />
        <Route path="/point/:id" element={<PointDetails />} />
        <Route path="/ratings/:id" element={<Ratings />} />
      </Routes>
    </Router>
  );
}

export default App;
