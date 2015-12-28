/**!
 * mill - src/app.js
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import Client from './client';
import Index from './index';
import Detail from './detail';

class App extends React.Component {

  static defaultProps = {
    config: window.MillConfig,
  };

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: true,
      posts: [],
      appLogo: '',
    };
  }

  componentWillMount() {
    this.client = new Client(this.props.config.github);
  }

  componentDidMount() {
    this.client.getUser().then(user => {
      this.setState({appLogo: user.avatar_url});
    });
    this.listPosts();
  }

  listPosts() {
    let res = this.client.listPosts();
    res.then(posts => {
      this.setState({error: false, loading: false, posts: posts});
    });
  }

  render() {
    let props = Object.assign({}, this.state, {config: this.props.config});
    return (
      <div id='mill-app'>
        <div id='sidebar'>
          <div id='sidebar-content'>
            <a className='app-logo' href='/#/'>
              <img src={this.state.appLogo} alt='{this.props.config.title}' />
            </a>
            <h2 className='app-title'>
              <a href='/#/'>{this.props.config.title}</a>
            </h2>
          </div>
        </div>
        <main>{React.cloneElement(this.props.children, props)}</main>
      </div>
    );
  }

};

render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="/post/:id" component={Detail} />
    </Route>
  </Router>
), document.getElementById('mill'));
