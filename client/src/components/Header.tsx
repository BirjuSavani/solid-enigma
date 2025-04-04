import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../service/Api';
import { UserProfile } from '../service/interface/Interface';
import { showError } from '../utils/toast';

function Header() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await profile();
        if (response.data.success && response.data.data) {
          setUser(response.data.data);
        } else {
          showError('Failed to retrieve user data');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        showError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  return (
    <header className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
      <Link to="/dashboard" className="text-decoration-none d-flex align-items-center">
        <h1 className="h5 m-0">Dashboard</h1>
      </Link>
      <div className="d-flex align-items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3541/3541871.png"
          alt="Profile"
          className="rounded-circle me-2"
          style={{ width: '40px', height: '40px' }}
        />
        <Link to="/dashboard/profile" className=" text-decoration-none d-flex align-items-center">
          <h5 className="m-0">{user?.name}</h5>
        </Link>
      </div>
    </header>
  );
}

export default Header;
