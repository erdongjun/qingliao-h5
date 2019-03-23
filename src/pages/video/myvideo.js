import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MyNavBar from '@components/MyNavBar';

import './index.scss';
import Video from './Video';

class MyVideo extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="myfeed-wrap">
        <MyNavBar title="我的视频" back />
        <Video my={1} />
      </div>
    );
  }
}

export default withRouter(MyVideo);
