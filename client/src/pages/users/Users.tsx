import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import axios from 'axios';
import UsersList from './UsersList';

interface User {
  _id: string;
  name: string;
  email: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('/api/users', newUser);
      if (response.data.success) {
        setUsers([...users, response.data.data]);
        setNewUser({ name: '', email: '' });
        (document.getElementById('closeModal') as HTMLButtonElement).click();
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">User Management</h2>
        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addUserModal">
          <FaUserPlus className="me-2" /> Add User
        </button>
      </div>

      {/* Users Table */}
      <UsersList />

      {/* Add User Modal */}
      <div
        className="modal fade"
        id="addUserModal"
        tabIndex={-1}
        aria-labelledby="addUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addUserModalLabel">
                Add New User
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeModal">
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleAddUser}>
                Add User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
