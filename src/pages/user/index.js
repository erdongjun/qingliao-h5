import React, { Component } from 'react';
import { Toast, List } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

import req from '@utils/req';

import './scss/index.scss';

const { Item } = List;


class User extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      pn: 1,
      limit: 10,
    };
    this.onLoad = this.onLoad.bind(this);
  }

  componentDidMount() {
    this.onLoad();
  }


  // 加载更多
  onLoad() {
    const { pn, list, limit } = this.state;
    // 添加操作且不超过10
    const data = {
      pn,
      limit,
    };
    req({
      endpoint: 'home/video/list',
      data,
    })
      .then((res) => {
        if (res.code !== 200) {
          Toast.fail(res.msg, 1);
        } else if (res.data.length === 0) {
          Toast.info('数据加载完毕', 1);
        } else {
          this.setState({
            list: list.concat(res.data),
            pn: (pn + 1),
          });
        }
      });
  }

  render() {
    return (
      <div className="user-wrap">
        <div className="user-avator">
          <img className="avator" src="https://img2.woyaogexing.com/2019/01/21/ae7d319e9d0107ae!360x360_big.jpg" alt="" />
          <p>我的昵称</p>
          <p>个性签名</p>
          <p>
            <span>192 点赞</span>
            <span>192 关注</span>
            <span>192 粉丝</span>
          </p>
        </div>
        <List>
          <Item
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            arrow="horizontal"
            onClick={() => {}}
          >
          我的动态
          </Item>
          <Item
            thumb={(<i className="iconfont-md iconfont icon--chengyuan" />)}
            onClick={() => {}}
            arrow="horizontal"
          >
          我的故事
          </Item>
          <Item
            thumb={(<i className="iconfont-md iconfont icon--chengyuan" />)}
            onClick={() => {}}
            arrow="horizontal"
          >
          我的视频
          </Item>
          <Item
            thumb={(<i className="iconfont-md iconfont icon--chengyuan" />)}
            onClick={() => {}}
            arrow="horizontal"
          >
          我的评论
          </Item>
          <Item
            thumb={(<i className="iconfont-md iconfont icon--chengyuan" />)}
            onClick={() => {}}
            arrow="horizontal"
          >
          我的点赞
          </Item>
          <Item
            thumb={(<i className="iconfont-md iconfont icon--chengyuan" />)}
            onClick={() => {}}
            arrow="horizontal"
          >
          我的访客
          </Item>
          <Item
            thumb={(<i className="iconfont-md iconfont icon--chengyuan" />)}
            onClick={() => {}}
            arrow="horizontal"
          >
          关于轻聊
          </Item>
          <Item
            thumb={(<i className="iconfont-md iconfont icon--chengyuan" />)}
            onClick={() => {}}
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
