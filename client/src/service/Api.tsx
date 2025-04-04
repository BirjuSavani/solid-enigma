import axios from 'axios';
import { LoginData, RegisterData, UserProfile } from './interface/Interface';

const API_URl = 'http://localhost:5000/api';
// const API_URl = 'https://solid-enigma-zb8b.onrender.com/api';

export const login = async (data: LoginData) => {
  return await axios.post(`${API_URl}/auth/login`, data);
};

export const register = async (data: RegisterData) => {
  return await axios.post(`${API_URl}/auth/register`, data);
};

export const profile = async () => {
  return await axios.get(`${API_URl}/user/profile`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
};

export const profileUpdate = async (data: UserProfile) => {
  return await axios.put(`${API_URl}/user/profile`, data, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
};

export const profileDelete = async () => {
  return await axios.delete(`${API_URl}/user/profile`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
};
