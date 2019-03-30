import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import MyNavBar from '@components/MyNavBar';
import getQueryStringArgs from '@utils/getQueryStringArgs';
import obj2qs from '@utils/obj2qs';




import Feed from '../feed/Feed';
import Find from '../find/Find';
import Video from '../feed/Feed';
import User from '../user/User';

import './index.scss';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'feed',
      isLogin: false,
      cates: {
        feed: '动态',
        find: '发现',
        msg: '消息',
        user: '我的',
      },
      title: '动态',
    };
    this.handelPress = this.handelPress.bind(this);
    this.replaceParamVal = this.replaceParamVal.bind(this);
  }
  componentDidMount(){
    const {cates} = this.state
    const args = getQueryStringArgs(this.props.location.search)
    let argStr = 'type=feed'
    if(args.type){
      this.setState({
        selectedTab: args.type,
        title: cates[args.type],
      })
      const argStr = obj2qs(args)
      this.props.history.replace(`/?${argStr}`)
    }else{
      this.props.history.replace(`/?${argStr}`)
    }
  }
  // 选择分类
  handelPress(type) {
    const { cates } = this.state;
    this.setState({
      selectedTab: type,
      title: cates[type],
    });
    this.replaceParamVal('type',type)
  }

  replaceParamVal(paramName,replaceWith) {
    const oUrl = window.location.href.toString();
    const re=eval('/('+ paramName+'=)([^&]*)/gi');
    let url = oUrl
    if(re.test(oUrl)){
      url = oUrl.replace(re,paramName+'='+replaceWith)
    }else{
      url = oUrl + '?' +paramName+'='+replaceWith
    }
    window.location.href = url;
  }
  render() {
    const { title, isLogin } = this.state;
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
            icon={(<i className="iconfont-md iconfont icon-find" />)}
            selectedIcon={(<i className="iconfont-md iconfont icon-find" />)}
            title="发现"
            key="find"
            selected={this.state.selectedTab === 'find'}
            onPress={() => {
              this.handelPress('find');
            }}
          >
            <Find />
          </TabBar.Item>
          <TabBar.Item
            icon={(<i className="iconfont-md iconfont icon--sixin" />)}
            selectedIcon={(<i className="iconfont-md iconfont icon--sixin" />)}
            title="消息"
            key="msg"
            selected={this.state.selectedTab === 'msg'}
            onPress={() => {
              this.handelPress('msg');
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
