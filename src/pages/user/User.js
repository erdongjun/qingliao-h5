import React, { Component } from 'react';
import { Toast, List } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import UserInfo from '@components/UserInfo';


import req from '@utils/req';

import './scss/index.scss';

const { Item } = List;


class User extends Component {
  constructor() {
    super();
    this.state = {
      info: {},
    };
    this.onLoad = this.onLoad.bind(this);
    this.handleJump = this.handleJump.bind(this);
  }

  componentDidMount() {
    this.onLoad();
  }

  onLoad() {
    req({
      endpoint: 'home/user/data',
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

  handleJump(path) {
    this.props.history.push(`/${path}`);
  }

  render() {
    const { info } = this.state;
    info.isMe = 1
    return (
      <div className="user-wrap">
        <UserInfo info={info}/>
        <List className="user-list">
          <Item
            thumb={(<i className="iconfont-md iconfont icon-dongtaiquan" />)}
            arrow="horizontal"
            onClick={() => { this.handleJump('myfeed'); }}
          >
          动态
          </Item>
          <Item
            thumb={(<i className="iconfont-md iconfont icon--pinglun" />)}
            arrow="horizontal"
            onClick={() => { this.handleJump('mycomment'); }}
          >
          评论
          </Item>
          <Item
            thumb={(<i className="iconfont-md iconfont icon--zan" />)}
            arrow="horizontal"
            onClick={() => { this.handleJump('myzan'); }}
          >
          点赞
          </Item>
          <Item
            thumb={(<i className="iconfont-md iconfont icon-moban" />)}
            arrow="horizontal"
            onClick={() => { this.handleJump('visitor'); }}
          >
          访客
          </Item>
          <Item
            thumb={(<i className="iconfont-md iconfont icon-guanyuwomen" />)}
            arrow="horizontal"
            onClick={() => { this.handleJump('about'); }}
          >
          关于
          </Item>
          <Item
            thumb={(<i className="iconfont-md iconfont icon--shezhi" />)}
            onClick={() => { this.handleJump('setting'); }}
            arrow="horizontal"
          >
          设置
          </Item>
        </List>

      </div>
    );
  }
}


export default withRouter(User);
