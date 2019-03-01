import React, { Component } from 'react';
import {
  NavBar, TabBar, Icon, Popover, Modal, Toast,
} from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import MyNavBar from '@components/MyNavBar';


import signOut from '@utils/signOut';
import Cookie from '@utils/cookie';

import Feed from '../feed/index';
import Article from '../article/index';
import Video from '../video/index';
import User from '../user/index';

import './index.scss';


const { Item } = Popover;
const { operation } = Modal;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'feed',
      isLogin: false,
      cates: {
        feed: '动态',
        artcle: '文章',
        video: '视频',
        user: '我的',
      },
      title: '动态',
    };
    this.handelPress = this.handelPress.bind(this);
  }


  // 选择分类
  handelPress(type) {
    const { cates } = this.state;
    this.setState({
      selectedTab: type,
      title: cates[type],
    });
  }

  render() {
    const { title, isLogin } = this.state;
    console.log(isLogin);
    return (
      <div
        className="home-wrap"
        style={{
          position: 'fixed', height: '100%', width: '100%', top: 0,
        }}
      >
        <MyNavBar title={title} />
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="bottom"
          prefixCls="home-wrap am-tab-bar"
        >
          <TabBar.Item
            title="动态"
            key="feed"
            icon={(<i className="iconfont-md iconfont icon--redu" />)}
            selectedIcon={(<i className="iconfont-md iconfont icon--redu" />)}
            selected={this.state.selectedTab === 'feed'}
            onPress={() => {
              this.handelPress('feed');
            }}
          >
            <Feed />
          </TabBar.Item>
          <TabBar.Item
            icon={(<i className="iconfont-md iconfont icon-wenzhang2" />)}
            selectedIcon={(<i className="iconfont-md iconfont icon-wenzhang2" />)}
            title="文章"
            key="artcle"
            selected={this.state.selectedTab === 'artcle'}
            onPress={() => {
              this.handelPress('artcle');
            }}
          >
            <Article />
          </TabBar.Item>
          <TabBar.Item
            icon={(<i className="iconfont-md iconfont icon-video" />)}
            selectedIcon={(<i className="iconfont-md iconfont icon-video" />)}
            title="视频"
            key="video"
            selected={this.state.selectedTab === 'video'}
            onPress={() => {
              this.handelPress('video');
            }}
          >
            <Video />
          </TabBar.Item>
          <TabBar.Item
            icon={(<i className="iconfont-md iconfont icon-icontouxiang" />)}
            selectedIcon={(<i className="iconfont-md iconfont icon-icontouxiang" />)}
            title="我的"
            key="user"
            selected={this.state.selectedTab === 'user'}
            onPress={() => {
              this.handelPress('user');
            }}
          >
            <User />
          </TabBar.Item>
        </TabBar>
      </div>

    );
  }
}

export default withRouter(Home);
