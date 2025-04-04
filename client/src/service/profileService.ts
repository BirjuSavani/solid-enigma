import axiosInstance from './axiosInstance';
import { UserProfile } from './interface/Interface';

export const getProfile = () => axiosInstance.get('/user/profile');

export const updateProfile = (data: UserProfile) => axiosInstance.put('/user/profile', data);

export const deleteProfile = () => axiosInstance.delete('/user/profile');
