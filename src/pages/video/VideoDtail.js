import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MyNavBar from '@components/MyNavBar';
import req from '@utils/req';

import { Toast } from 'antd-mobile';


import VideoItem from './VideoItem';
import './index.scss';

class VideoDtail extends Component {
  constructor() {
    super();
    this.state = {
      info : {}
    }
  }

  componentDidMount() {
    const {id} = this.props.match.params
    req({
      endpoint: `home/feeds/${id}`,
    })
      .then((res) => {
        if (res.code !== 200) {
          Toast.fail(res.msg, 1);
        } else {
          this.setState({
            info: res.data,
          });
        }
      });
  }

  render() {
    const {info} = this.state
    return (
      <div className="myfeed-wrap ">
        <MyNavBar title="视频详情" back />
        <div className="feed-wrap video-wrap">
          {info.id ? (<VideoItem item={info} useclick={false} isVideo={true} />) : '' }
        </div>
      </div>
    );
  }
}

export default withRouter(VideoDtail);
