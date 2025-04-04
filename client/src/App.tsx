import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Users from './pages/users/Users';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<h2 className="h4 mb-4 text-center mt-4 text-dark">Welcome to SOLID ENIGMA</h2>} />
              <Route path="profile" element={<Profile />} />
              <Route path="users" element={<Users />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
