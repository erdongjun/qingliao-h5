import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

import req from '@utils/req';
import getElementScrollBottom from '@utils/getElementScrollBottom';


import ArticleItem from './ArticleItem';

import './index.scss';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pn: 1,
      limit: 10,
    };
    this.onLoad = this.onLoad.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    const { my } = this.props;
    this.onLoad();
    if (my) {
      this.el.addEventListener('scroll', this.handleScroll);
    } else {
      this.el.parentNode.parentNode.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    const { my } = this.props;
    if (my) {
      this.el.removeEventListener('scroll', this.handleScroll);
    } else {
      this.el.parentNode.parentNode.removeEventListener('scroll', this.handleScroll);
    }
  }

  // 加载更多
  onLoad() {
    const { my } = this.props;
    const { pn, list, limit } = this.state;
    // 添加操作且不超过10
    const data = {
      pn,
      limit,
      type: 2,
      private: my ? 1 : 0,
    };
    req({
      endpoint: 'home/feeds/list',
      data,
    })
      .then((res) => {
        if (res.code !== 200) {
          Toast.fail(res.msg, 1);
        } else if (res.data.length === 0) {
          Toast.info('数据加载完毕', 1);
        } else {
          this.setState({
            list: list.concat(res.data),
            pn: (pn + 1),
          });
        }
      });
  }
  handleScroll(e) {
    if (getElementScrollBottom(e.target) === 0) {
      this.onLoad();
    }
  }

  render() {
    const { list } = this.state;
    return (
      <div className="feed-wrap" ref={(el) => { this.el = el; }}>
        {list.map(item => (
          <ArticleItem item={item}  key={item.id}/>
        ))}
      </div>
    );
  }
}


export default withRouter(Article);
