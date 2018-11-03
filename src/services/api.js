import store from '@/store';
import router from '@/router';

const defaultApiUrl = 'https://localhost:44364';

export default {
  get: function get(url) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', defaultApiUrl + url, true);
      req.setRequestHeader('Authorization', store.state.token);
      req.onreadystatechange = function onready() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          resolve(JSON.parse(this.response));
        } else if (this.readyState === XMLHttpRequest.DONE && this.status === 403) {
          store.commit('logout');
          router.push({ name: 'login' });
        } else if (this.readyState === XMLHttpRequest.DONE && this.status !== 200) {
          reject(req.response);
        }
      };
      req.send();
    });
  },
  post: function post(url, data) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('POST', defaultApiUrl + url, true);
      req.setRequestHeader('Authorization', store.state.token);
      req.setRequestHeader('Content-Type', 'application/json');
      req.onreadystatechange = function onready() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          resolve(req.response);
        } else if (this.readyState === XMLHttpRequest.DONE && this.status === 403) {
          store.commit('logout');
          router.push({ name: 'login' });
        } else if (this.readyState === XMLHttpRequest.DONE && this.status !== 200) {
          reject(req.response);
        }
      };

      if (data !== null && typeof data === 'object') {
        req.send(JSON.stringify(data));
      } else {
        req.send(data);
      }
    });
  },
  deleteApi: function deleteApi(url) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('DELETE', defaultApiUrl + url, true);
      req.setRequestHeader('Authorization', store.state.token);
      req.setRequestHeader('Content-Type', 'application/json');
      req.onreadystatechange = function onready() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          resolve(req.response);
        } else if (this.readyState === XMLHttpRequest.DONE && this.status === 403) {
          store.commit('logout');
          router.push({ name: 'login' });
        } else if (this.readyState === XMLHttpRequest.DONE && this.status !== 200) {
          reject(req.response);
        }
      };

      req.send();
    });
  },
};
