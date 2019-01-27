import React, { Component } from 'react';
import {
  NavBar, TabBar, Icon, Popover, Modal,
} from 'antd-mobile';
import { withRouter } from 'react-router-dom';

import './index.scss';

const { Item } = Popover;
const { operation } = Modal;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'feed',
      popoverShow: false,
      popoverSelected: '',
    };
    this.popoverSelect = this.popoverSelect.bind(this);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
  }

  popoverSelect(opt) {
    console.log(opt.props.value);
    const that = this;
    that.setState({
      popoverShow: false,
    });
    if (opt.props.value === 'add') {
      console.log('添加动态');
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
      ]);
    }
    if (opt.props.value === 'search') {
      console.log('搜索');
    }
  }

  handleVisibleChange(visible) {
    this.setState({
      popoverShow: visible,
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="home-wrap">
        <NavBar
          mode="light"
          icon={<i className="iconfont-lg iconfont icon-dongwutubiao-xianxing-daxiang" />}
          rightContent={[
            <Popover
              mask
              visible={this.state.popoverShow}
              overlay={[
                (<Item key="1" value="search" icon={<i className="iconfont icon--fangdajing" />}>搜索</Item>),
                (<Item key="2" value="add" icon={<i className="iconfont icon--jiahao" />}>发布</Item>),
              ]}
              onVisibleChange={this.handleVisibleChange}
              onSelect={this.popoverSelect}
              key="ellipsis"
            >
              <Icon type="ellipsis" />
            </Popover>,
          ]}
        >

          轻聊
        </NavBar>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          prefixCls="home-wrap am-tab-bar"
        >
          <TabBar.Item
            title="热门"
            key="feed"
            icon={(<i className="iconfont-md iconfont icon--redu" />)}
            selectedIcon={(<i className="iconfont-md iconfont icon--redu" />)}
            selected={this.state.selectedTab === 'feed'}
            onPress={() => {
              this.setState({
                selectedTab: 'feed',
              });
            }}
          >
          feed动态
          </TabBar.Item>
          <TabBar.Item
            icon={(<i className="iconfont-md iconfont icon-wenzhang2" />)}
            selectedIcon={(<i className="iconfont-md iconfont icon-wenzhang2" />)}
            title="故事"
            key="artcle"
            selected={this.state.selectedTab === 'artcle'}
            onPress={() => {
              this.setState({
                selectedTab: 'artcle',
              });
            }}
          >
            artcle故事
          </TabBar.Item>
          <TabBar.Item
            icon={(<i className="iconfont-md iconfont icon-icon_video" />)}
            selectedIcon={(<i className="iconfont-md iconfont icon-icon_video" />)}
            title="视频"
            key="video"
            selected={this.state.selectedTab === 'video'}
            onPress={() => {
              this.setState({
                selectedTab: 'video',
              });
            }}
          >
          video视频
          </TabBar.Item>
          <TabBar.Item
            icon={(<i className="iconfont-md iconfont icon--chengyuan" />)}
            selectedIcon={(<i className="iconfont-md iconfont icon--chengyuan" />)}
            title="我的"
            key="user"
            selected={this.state.selectedTab === 'user'}
            onPress={() => {
              this.setState({
                selectedTab: 'user',
              });
            }}
          >
        user我的
          </TabBar.Item>
        </TabBar>
      </div>

    );
  }
}

export default withRouter(Home);