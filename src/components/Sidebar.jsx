/*
 * mill - src/components/Sidebar.jsx
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

/**
 * Module dependencies.
 */
import React from 'react';

export default class Sidebar extends React.Component {

  static propTypes = {
    appLogo: React.PropTypes.string,
    config: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {theme} = this.props;
    const currentYear = new Date().getUTCFullYear();
    const copyright = `${currentYear} ${this.props.config.title}`;
    const logo = this.props.appLogo;
    const title = this.props.config.title;
    return theme.sideBar(React, {logo, title, copyright})
  }
}
