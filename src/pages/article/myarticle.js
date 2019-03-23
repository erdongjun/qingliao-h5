import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MyNavBar from '@components/MyNavBar';


import './index.scss';
import Article from './Article';

class ArticleMe extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="myfeed-wrap">
        <MyNavBar title="我的文章" back />
        <Article my={1} />
      </div>
    );
  }
}

export default withRouter(ArticleMe);
