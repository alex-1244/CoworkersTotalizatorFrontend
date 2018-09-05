export default {
  get: function get(url) {
    return new Promise((resolve) => {
      const req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.onreadystatechange = function onready() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          resolve(JSON.parse(this.response));
        }
      };
      req.send();
    });
  },
  post: function post(url, data) {
    return new Promise((resolve) => {
      const req = new XMLHttpRequest();
      req.open('POST', url, true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.onreadystatechange = function onready() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          resolve();
        }
      };
      req.send(data);
    });
  },
};
