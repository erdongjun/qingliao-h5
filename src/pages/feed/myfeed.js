import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MyNavBar from '@components/MyNavBar';
import './index.scss';
import Feed from './index';

class MyFeed extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="myfeed-wrap">
        <MyNavBar title="我的文章" back />
        <Feed type="myfeed" />
      </div>
    );
  }
}

export default withRouter(MyFeed);
