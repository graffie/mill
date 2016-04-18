/*
 * mill - src/app.js
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

/**
 * Module dependencies.
 */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import Client from './lib/client';
import Index from './index';
import Detail from './detail';
import Sidebar from './components/Sidebar';

class App extends React.Component {

  static propTypes = {
    config: React.PropTypes.object,
    children: React.PropTypes.object,
  };

  static defaultProps = {
    config: window.MillConfig,
    theme: __webpack_require__(`themes/${window.MillConfig.theme}`)
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
      this.setState({ appLogo: user.avatar_url });
    }).catch(err => {
      console.error(err.stack);
    });
    this.listPosts();
  }

  listPosts() {
    const res = this.client.listPosts();
    res.then(posts => {
      this.setState({ error: false, loading: false, posts });
    }).catch(err => {
      this.setState({ error: true, loading: false });
      console.error(err.stack);
    });
  }

  render() {
    const props = Object.assign({}, this.state, { config: this.props.config, theme: this.props.theme});
    return (
      <div id="mill-app">
        <Sidebar {...this.props} appLogo={this.state.appLogo} />
        <main>{React.cloneElement(this.props.children, props)}</main>
      </div>
    );
  }
}

render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="/post/:id" component={Detail} />
    </Route>
  </Router>
), document.getElementById('mill'));
