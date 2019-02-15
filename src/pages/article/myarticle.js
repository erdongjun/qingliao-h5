import React, { Component } from 'react';
import {
  Toast, NavBar, Popover, Modal, Icon,
} from 'antd-mobile';
import { withRouter } from 'react-router-dom';

import './index.scss';
import Article from './index';

const { Item } = Popover;
const { operation } = Modal;


class MyArticle extends Component {
  constructor() {
    super();
    this.state = {
      popoverShow: false,
    };
    this.popoverSelect = this.popoverSelect.bind(this);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
  }

  handleVisibleChange(visible) {
    this.setState({
      popoverShow: visible,
    });
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

  render() {
    return (
      <div className="myfeed-wrap">
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
          我的文章
        </NavBar>
        <Article type="myarticle" />
      </div>
    );
  }
}

export default withRouter(MyArticle);
