import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button } from 'antd-mobile';

import Layout from '@components/Layout';

import logo from './1.png';

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
      <Layout {...layoutArgs}>
        <img src={logo} alt="logo" />
        <img src={logo} alt="logo" />
        <Button>都是</Button>
      </Layout>
    );
  }
}
export default Main;

render(
  <Main />,
  document.getElementById('root'),
);
