import React, { Component } from 'react';
import { render } from 'react-dom';

import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';


import Layout from '@components/Layout';

// pages
import Home from './pages/home/Home';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
// 发布
import PostFeed from './pages/post/PostFeed';
// 搜索
import Search from './pages/search/Search';
// 我的动态
import MyFeed from './pages/feed/MyFeed';
// 动态详情
import FeedDetail from './pages/feed/FeedDtail';
// 用户主页
import UserDetail from './pages/user/UserDetail';


// 404页面

// 自定义布局参数
const layoutArgs = {
  bodyMaxWidth: 425,
  designWidth: 750,
};


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Router>
        <Layout {...layoutArgs}>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {/* 发布 */}
          <Route path="/postfeed/:type" component={PostFeed} />
          <Route path="/search" component={Search} />
          {/* 我的 */}
          <Route path="/myfeed" component={MyFeed} />
          {/* 详情 */}
          <Route path="/feed/:id" component={FeedDetail} />
          {/* 用户主页 */}
          <Route path="/user/:uid" component={UserDetail} />

          {/* <Route path="*" component={NotFind} /> */}
        </Layout>
      </Router>
    );
  }
}

render(
  <Main />,
  document.getElementById('root'),
);
