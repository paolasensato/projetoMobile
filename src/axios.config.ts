import axios from 'axios';
import useUserStore from './stores/userStore';

const instance = axios.create({
  baseURL: 'https://tamagochiapi-clpsampedro.b4a.run',
});

axios.interceptors.request.use(
  request => {
    const {token} = useUserStore();

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  error => Promise.reject(error),
);

export default instance;
