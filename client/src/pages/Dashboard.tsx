import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="d-flex vh-100 bg-light">
      <Sidebar />
      <main className="flex-grow-1 d-flex flex-column">
        <Header />
        <section className="p-4">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
