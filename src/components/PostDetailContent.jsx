/*
 * mill - components/PostDetailContent.jsx
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

/**
 * Module dependencies.
 */
import React from 'react';
import { Link } from 'react-router';
import ShareButton from './ShareButton';
import Tag from './Tag';

export default class Detail extends React.Component {

  static propTypes = {
    post: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const createdAt = this.props.post.createdAt;
    const user = this.props.post.user || {};
    const imgStyle = {
      backgroundImage: `url(${user.avatar}&s=120)`
    };
    return (
      <div className="mill-detail-content">
        <section className="post-meta">
          <span className="post-time">
            <i className="fa fa-calendar"></i>
            <time dateTime="{createdAt ? createdAt.toJSON() : ''}" className="fulldate">{createdAt ? createdAt.toDateString() : ''}</time>
          </span>
          <Tag tags={this.props.post.tags}></Tag>
        </section>
        <div dangerouslySetInnerHTML={{ __html: this.props.post.html }} />
        <footer className="post-footer">
          <figure className="author-image">
            <a className="img" href={user.ghLink} style={imgStyle}><span className="hidden">{user.login}</span></a>
          </figure>
          <section className="author">
            <h4><Link to='/' query={{author: user.login}}>{user.login}</Link></h4>
            <p>Read <Link to='/' query={{author: user.login}}>more posts</Link> by this author.</p>
            <div className="author-meta">
            <i className="fa fa-link"><a href={this.props.post.ghLink}>{this.props.post.ghLink}</a></i>
          </div>
          </section>
          <section className="share">
            <h4>Share this post</h4>
            <div className="share-icons">
              {
                ['twitter',
                  'facebook',
                  'google-plus',
                  'weibo'
                ].map((i, j) => <ShareButton key={j} publisher={i} url={location.href} content={this.props.post.title}/>)
              }
            </div>
          </section>
        </footer>
      </div>
    );
  }
}
