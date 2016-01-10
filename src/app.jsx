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

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
  }

  renderAppLogo() {
    if (!this.props.appLogo) {
      return '';
    }
    const alt = this.props.config.title || '';
    return (
      <a className='app-logo' href='/#/'>
        <img src={this.props.appLogo} alt='{alt}' />
      </a>
    );
  }

  render() {
    return (
      <div id='sidebar'>
        <div id='sidebar-content'>
          {this.renderAppLogo()}
          <h2 className='app-title'>
            <a href='/#/'>{this.props.config.title}</a>
          </h2>
        </div>
      </div>
    );
  }
};

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
    }).catch(err => {
      console.error(err.stack);
    });
    this.listPosts();
  }

  listPosts() {
    let res = this.client.listPosts();
    res.then(posts => {
      this.setState({error: false, loading: false, posts: posts});
    }).catch(err => {
      this.setState({error: true, loading: false});
      console.error(err.stack);
    });
  }

  render() {
    let props = Object.assign({}, this.state, {config: this.props.config});
    return (
      <div id='mill-app'>
        <Sidebar {...this.props} appLogo={this.state.appLogo} />
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
