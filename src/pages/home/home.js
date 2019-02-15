import React, { Component } from 'react';
import {
  NavBar, TabBar, Icon, Popover, Modal, Toast,
} from 'antd-mobile';
import { withRouter } from 'react-router-dom';


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
      popoverShow: false,
      cates: {
        feed: '动态',
        artcle: '文章',
        video: '视频',
        user: '我的',
      },
      title: '动态',
    };
    this.popoverSelect = this.popoverSelect.bind(this);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.handelPress = this.handelPress.bind(this);
  }

  popoverSelect(opt) {
    console.log(opt.props.value);
    const that = this;
    that.setState({
      popoverShow: false,
    });
    if (opt.props.value === 'add') {
      operation([
        {
          text: '动态',
          onPress: () => {
            that.props.history.push('/postfeed');
          },
          style: {
            textAlign: 'center',
            padding: '0 10px',
          },
        },
        {
          text: '文章',
          onPress: () => {
            that.props.history.push('/postarticle');
          },
          style: {
            textAlign: 'center',
            padding: '0 10px',
          },
        },
        {
          text: '视频',
          onPress: () => {
            that.props.history.push('/postvideo');
          },
          style: {
            textAlign: 'center',
            padding: '0 10px',
          },
        },
      ]);
    }
    if (opt.props.value === 'search') {
      that.props.history.push('/search');
    }
    if (opt.props.value === 'quit') {
      Toast.info('退出账号');
    }
  }

  handleVisibleChange(visible) {
    this.setState({
      popoverShow: visible,
    });
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
    const { title } = this.state;
    return (
      <div
        className="home-wrap"
        style={{
          position: 'fixed', height: '100%', width: '100%', top: 0,
        }}
      >
        <NavBar
          className="nav-bar"
          mode="light"
          icon={<i className="iconfont-lg iconfont icon-dongwutubiao-xianxing-daxiang" />}
          rightContent={[
            <Popover
              mask
              visible={this.state.popoverShow}
              overlay={[
                (<Item key="1" value="search" icon={<i className="iconfont icon--fangdajing" />}>搜索</Item>),
                (<Item key="2" value="add" icon={<i className="iconfont icon--jiahao" />}>发布</Item>),
                (<Item key="3" value="quit" icon={<i className="iconfont icon-icontouxiang" />}>退出</Item>),
              ]}
              onVisibleChange={this.handleVisibleChange}
              onSelect={this.popoverSelect}
              key="ellipsis"
            >
              <Icon type="ellipsis" />
            </Popover>,
          ]}
        >
          {title}
        </NavBar>
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
