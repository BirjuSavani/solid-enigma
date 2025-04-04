import axiosInstance from './axiosInstance';
import { LoginData, RegisterData } from './interface/Interface';

export const login = (data: LoginData) => axiosInstance.post('/auth/login', data);

export const register = (data: RegisterData) => axiosInstance.post('/auth/register', data);
