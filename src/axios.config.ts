import axios from 'axios';
import useUserStore from './stores/userStore';

const instance = axios.create({
  baseURL: 'https://tamagochiapi-clpsampedro.b4a.run',
});

instance.interceptors.request.use(request => {
  const {token} = useUserStore.getState();

  if (token) {
    request.headers['x-access-token'] = token;
  }
  return request;
});

export default instance;
