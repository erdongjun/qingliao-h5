import React, { Component } from 'react';
import { render } from 'react-dom';

import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';


import Layout from '@components/Layout';

// pages
import Home from './pages/home/home';
import Login from './pages/user/login';
import Register from './pages/user/register';


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

  componentDidMount() {
    console.log('最外层组件更新');
  }

  render() {
    return (
      <Router>
        <Layout {...layoutArgs}>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Layout>
      </Router>
    );
  }
}

render(
  <Main />,
  document.getElementById('root'),
);
