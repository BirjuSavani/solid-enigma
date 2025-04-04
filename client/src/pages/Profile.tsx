import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { deleteProfile, getProfile, updateProfile } from '../service/profileService';
import { showError, showSuccess } from '../utils/toast';

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
}

const Profile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getProfile();
        if (response.data.success && response.data.data) {
          setUser(response.data.data);
          setEditedUser(response.data.data);
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    }
  };

  const handleSaveClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (!editedUser) {
        showError('User data is not available');
        return;
      }

      const response = await updateProfile(editedUser);

      if (response.data.success) {
        setUser(response.data.data);
        setEditedUser(response.data.data);
        setIsEditing(false);
        showSuccess(response.data.message || 'Profile updated successfully');
      } else {
        showError(response.data.message || 'Failed to update profile');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showError(error.message || 'An unexpected error occurred');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteProfile();
      if (response.data.success) {
        sessionStorage.removeItem('token');
        showSuccess(response.data.message || 'Profile deleted successfully');
        navigate('/');
      } else {
        showError(response.data.message || 'Failed to delete profile');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showError(error.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="row g-0">
          {/* Left Panel - User Info */}
          <div
            className="col-md-4 d-flex flex-column align-items-center justify-content-center text-white p-4"
            style={{ background: 'linear-gradient(to right, rgb(65, 119, 255), rgb(43, 153, 255))' }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3541/3541871.png"
              alt="User Avatar"
              className="rounded-circle border border-white p-1"
              width="100"
              height="100"
            />
            <h4 className="mt-3">{user?.name || 'Loading...'}</h4>

            {/* Buttons */}
            <div className="d-flex align-items-center gap-2 mt-2">
              <button
                onClick={isEditing ? handleSaveClick : handleEditClick}
                className="btn btn-light btn-sm d-flex align-items-center gap-1"
              >
                {isEditing ? (
                  <>
                    <FaSave /> Save Profile
                  </>
                ) : (
                  <>
                    <FaEdit /> Edit Profile
                  </>
                )}
              </button>

              {/* Open Modal Button */}
              <button
                className="btn btn-danger btn-sm d-flex align-items-center gap-1"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
              >
                <FaTrash /> Delete Profile
              </button>
            </div>
          </div>

          {/* Right Panel - User Details */}
          <div className={`col-md-8 p-4 ${isEditing ? 'border border-primary bg-light p-3 rounded' : ''}`}>
            <h5 className="mb-3 fw-bold">User Details</h5>
            {loading ? (
              <p>Loading user data...</p>
            ) : (
              <div className="row">
                <div className="col-md-6">
                  <p className="text-muted mb-1">Email</p>
                  {isEditing ? (
                    <Input
                      type="email"
                      name="email"
                      value={editedUser?.email}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    <p className="fw-medium">{user?.email}</p>
                  )}
                </div>
                <div className="col-md-6">
                  <p className="text-muted mb-1">Phone</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={editedUser?.phone}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    <p className="fw-medium">{user?.phone || 'Not Provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bootstrap Delete Confirmation Modal */}
      <div className="modal fade" id="deleteModal" tabIndex={-1} aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirm Deletion
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete your profile? This action cannot be undone.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleConfirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
