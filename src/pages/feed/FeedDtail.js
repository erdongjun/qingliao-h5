import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MyNavBar from '@components/MyNavBar';
import FeedItem from '@components/FeedItem';
import req from '@utils/req';

import { Toast } from 'antd-mobile';

import './index.scss';

class FeedDtail extends Component {
  constructor() {
    super();
    this.state = {
      info : {}
    }
    this.updateFeed = this.updateFeed.bind(this)
  }

  componentDidMount() {
    const {id} = this.props.match.params
    req({
      endpoint: `home/feed/${id}`,
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
  updateFeed(fid){
    const {info} = this.state
    info.isZan =  1
    info.zan +=1
    this.setState({
      info
    })
  }

  render() {
    const {info} = this.state
    return (
      <div className="myfeed-wrap">
        <MyNavBar title="详情" back />
        <div className="feed-wrap">
          {info.id ? (<FeedItem item={info} play={1} updateList={this.updateFeed}  useclick={false} />) : '' }
        </div>
      </div>
    );
  }
}

export default withRouter(FeedDtail);
