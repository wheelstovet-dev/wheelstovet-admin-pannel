// import { axios } from '@/lib/axios';
// import storage from '@/utils/storage';

// const login = (data: any) => {
//   return axios.post(`/admin/user/login`, data);
// };
// const getProfile = () => {
//   return axios.get(`/admin/user/profile`);
// };
// const logout = () => {
//   storage.clearToken();
// };
// export const userService = {
//   login,
//   logout,
//   getProfile
// };


import { axios } from '@/lib/axios';
import storage from '@/utils/storage';

const login = (data: { Email: string; Password: string }) => {
  return axios.post('/admin/adminLogin', data); // No need for full URL due to baseURL in axios
};

const getProfile = () => {
  return axios.get('/admin/user/profile');
};

const logout = () => {
  storage.clearToken();
};

export const userService = {
  login,
  logout,
  getProfile,
};
