import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
  NavBar, Icon, Popover, Modal, Toast,
} from 'antd-mobile';

import signOut from '@utils/signOut';
import Cookie from '@utils/cookie';

const { Item } = Popover;
const { operation } = Modal;

class MyNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverShow: false,
      isLogin: false,
    };
    this.popoverSelect = this.popoverSelect.bind(this);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
  }

  componentDidMount() {
    // 判断用户是否已登录
    if (Cookie.get('uid')) {
      // 已登录
      this.setState({
        isLogin: true,
      });
    }
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
      signOut();
    }
    if (opt.props.value === 'login') {
      that.props.history.push('/login');
    }
  }

  handleVisibleChange(visible) {
    this.setState({
      popoverShow: visible,
    });
  }


  render() {
    const { isLogin } = this.state;
    const { title, back } = this.props;
    // console.log(isLogin);
    const icon = {};
    if (back) {
      return (
        <NavBar
          className="nav-bar"
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
          rightContent={[
            <Popover
              mask
              visible={this.state.popoverShow}
              overlay={[
                (<Item key="1" value="search" icon={<i className="iconfont icon--fangdajing" />}>搜索</Item>),
                (<Item key="2" value="add" icon={<i className="iconfont icon--jiahao" />}>发布</Item>),
                !isLogin ? (<Item key="4" value="login" icon={<i className="iconfont icon-icontouxiang" />}>登录</Item>) : (<Item key="3" value="quit" icon={<i className="iconfont icon-icontouxiang" />}>退出</Item>),
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
      );
    }
    return (
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
              !isLogin ? (<Item key="4" value="login" icon={<i className="iconfont icon-icontouxiang" />}>登录</Item>) : (<Item key="3" value="quit" icon={<i className="iconfont icon-icontouxiang" />}>退出</Item>),
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
    );
  }
}

export default withRouter(MyNavBar);
