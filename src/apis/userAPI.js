import api from './api';

export default {
  login(data) {
    return api({ method: 'POST', url: '/login', data });
  },
  join(data) {
    return api({ method: 'POST', url: '/sign', data });
  },
};
