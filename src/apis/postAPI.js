import api from './api';

export default {
  postGet(postId) {
    return api({ method: 'GET', url: `/post/${postId}` });
  },
  postGetAll() {
    return api({ method: 'GET', url: '/post/all' });
  },
  postCreate(data) {
    return api({ method: 'POST', url: '/post/create', data });
  },
  postDelete(postId) {
    return api({ method: 'DELETE', url: `/post/${postId}` });
  },
};
