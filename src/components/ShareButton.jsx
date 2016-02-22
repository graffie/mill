/*
 * mill - components/ShareButton.jsx
 *
 * Authors:
 *   xeodou <xeodou@gmail.com>
 */

/**
 * Module dependencies.
 */
import React from 'react';

export default class ShareButton extends React.Component {
  static propTypes = {
    publisher: React.PropTypes.string,
    url: React.PropTypes.string,
    content: React.PropTypes.string
  };

  static defaultProps = {
    publisher: 'twitter',
    url: 'https://github.com/graffie/mill'
  };

  link() {
    const con = encodeURIComponent(this.props.content);
    switch(this.props.publisher) {
      case 'google-plus':
        return `https://plus.google.com/share?url=${this.props.url}`
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${this.props.url}`
      case 'weibo':
        return `http://v.t.sina.com.cn/share/share.php?url=${this.props.url}&title={con}`
      default:
        return `https://twitter.com/share?text=${con}&url=${this.props.url}`;
    }
  }

  className() {
    if (this.props.publisher === 'weibo') return `fa fa-${this.props.publisher}`;
    return `fa fa-${this.props.publisher}-square`
  }

  size() {
    switch(this.props.publisher) {
      case 'google-plus':
        return 'width=490,height=530';
      case 'facebook':
        return 'width=580,height=296';
      default:
        return 'width=550,height=235';
    }
  }

  onClick(e) {
    window.open(this.link(), `${this.props.publisher}-share`, this.size());
    e.preventDefault();
  }

  render() {
    return (
      <a className={this.className()} href={this.link()} onClick={this.onClick.bind(this)}>
        <span className="hidden">{this.props.publisher}</span>
      </a>
    )
  }

}
