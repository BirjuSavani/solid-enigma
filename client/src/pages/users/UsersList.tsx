import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { UserProfile } from '../../service/interface/Interface';

function UsersList() {
  const [users, setUsers] = useState<UserProfile[]>([]);

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

  return (
    <table className="table table-striped table-hover shadow-sm">
      <thead className="bg-primary text-white">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2">
                  <FaEdit />
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="text-center">
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default UsersList;
