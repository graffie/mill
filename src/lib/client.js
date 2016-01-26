/*
 * mill - src/client.js
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

/**
 * Module dependencies.
 */
const qs = require('qs');

export default class Client {

  static API_ROOT = 'https://api.github.com';
  static VERSION = '0.1';

  constructor(options = {}) {
    this.owner = options.owner;
    this.repo = options.repo;
  }

  static getUrl(path, query) {
    let result = Client.API_ROOT + path;
    if (query) {
      result = result + '?' + qs.stringify(query);
    }
    return result;
  }

  static request(url, requestArgs = {}) {
    const args = requestArgs;
    args.headers = Object.assign({}, args.headers, {
      'User-Agent': 'mill',
      Accept: 'application/vnd.github.v3.html+json',
    });
    return fetch(url, args)
      .then(res => {
        if (res.status < 200 || res.status >= 300) {
          const err = new Error(res.statusText);
          err.name = 'GitHubReqError';
          err.response = res;
          throw err;
        }
        return res;
      }).then(res => {
        return res.json();
      });
  }

  static convertPost(post = {}) {
    return {
      id: post.id,
      number: post.number,
      html: post.body_html,
      title: post.title,
      createdAt: new Date(post.created_at),
      updatedAt: new Date(post.updated_at),
      user: {
        id: post.user.id,
        avatar: post.user.avatar_url,
        login: post.user.login,
      },
    };
  }

  listPosts(args) {
    const url = Client.getUrl(`/repos/${this.owner}/${this.repo}/issues`);
    return Client.request(url, args).then(data => {
      return data.map(item => Client.convertPost(item));
    });
  }

  getUser() {
    const url = Client.getUrl(`/users/${this.owner}`);
    return Client.request(url);
  }

}
