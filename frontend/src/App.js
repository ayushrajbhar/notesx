import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup'

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Routes>
            <Route exact path="/" element={<Header />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

// Add Features:
// Make environment variables
// OTP verification in Signup
// Forgot Password
// Sidebar
// Fix tags bug
// Make contact and about pages

export default App;
