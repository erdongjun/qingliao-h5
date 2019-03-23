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
import PostArticle from './pages/post/PostArticle';
import PostVideo from './pages/post/PostVideo';
import Search from './pages/search/Search';
// 我的动态
import MyFeed from './pages/feed/MyFeed';
// 我的文章
import MyArticle from './pages/article/MyArticle';
// 我的视频
import MyVideo from './pages/video/MyVideo';
// 文章详情
import ArticleDetail from './pages/article/ArticleDetail';
// 动态详情
import FeedDetail from './pages/feed/FeedDtail';
// 视频详情
import VideoDtail from './pages/video/VideoDtail';



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
          <Route path="/postfeed" component={PostFeed} />
          <Route path="/postarticle" component={PostArticle} />
          <Route path="/postvideo" component={PostVideo} />
          <Route path="/search" component={Search} />
          {/* 我的 */}
          <Route path="/myfeed" component={MyFeed} />
          <Route path="/myarticle" component={MyArticle} />
          <Route path="/myvideo" component={MyVideo} />
          {/* 详情 */}
          <Route path="/article/:id" component={ArticleDetail} />
          <Route path="/feed/:id" component={FeedDetail} />
          <Route path="/video/:id" component={VideoDtail} />
          

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
