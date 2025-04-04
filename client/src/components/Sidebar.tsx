import { FaBox, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo1.webp'; // Correct import

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  return (
    <div className="bg-primary text-white d-flex flex-column p-4 vh-100" style={{ width: '250px' }}>
      <Link to="/dashboard" className="text-white text-decoration-none d-flex align-items-center">
        <img src={logo} alt="Logo" className=" border me-2 h4 mb-4" style={{ width: '70px', height: '70px' }} />

        <h2 className="h4 mb-4">SOLID ENIGMA</h2>
      </Link>

      <nav className="flex-grow-1">
        <ul className="list-unstyled">
          <li className="mb-3">
            <Link to="/dashboard/users" className="text-white text-decoration-none d-flex align-items-center">
              <FaUser className="me-2" /> Users
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/dashboard" className="text-white text-decoration-none d-flex align-items-center">
              <FaBox className="me-2" /> Products
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout button at the bottom */}
      <div className="mt-auto">
        <Link to="/" className="text-white text-decoration-none d-flex align-items-center" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" /> Logout
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
