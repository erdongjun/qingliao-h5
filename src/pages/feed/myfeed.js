import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MyNavBar from '@components/MyNavBar';
import './index.scss';
import Feed from './Feed';

class MyFeed extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="myfeed-wrap">
        <MyNavBar title="我的动态" back />
        <Feed my={1} />
      </div>
    );
  }
}

export default withRouter(MyFeed);
