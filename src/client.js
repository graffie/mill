/**!
 * mill - src/client.js
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */
const qs = require('qs');

const API_ROOT = 'https://api.github.com';

function Client(options) {
  if (!(this instanceof Client)) {
    return new Client(options);
  }

  options = options || {};
  this.owner = options.owner;
  this.repo = options.repo;
}

Client.prototype.getUrl = function(path, query) {
  let result = API_ROOT + path;
  if (query) {
    result = result + '?' + qs.stringify(query);
  }
  return result;
};

Client.prototype.request = function(url, args) {
  args = args || {};
  args.headers = args.headers || {};
  args.headers['User-Agent'] = 'mill';
  args.headers['Accept'] = 'application/vnd.github.v3.html+json';

  return fetch(url, args)
    .then(res => {
      if (res.status < 200 || res.status >= 300) {
        let err = new Error(res.statusText);
        err.response = res;
        throw err;
      }
      return res;
    }).then(res => {
      return res.json();
    }).catch(err => {
      throw err;
    });
};

const convertPost = post => {
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
};

Client.prototype.listPosts = function(args) {
  let url = this.getUrl(`/repos/${this.owner}/${this.repo}/issues`);
  return this.request(url, args).then(data => {
    let posts = data.map(item => convertPost(item));
    return posts;
  });
};

/**
 * Expose `Client`
 */

export default Client;
