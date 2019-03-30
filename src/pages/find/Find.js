import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

import req from '@utils/req';
import getElementScrollBottom from '@utils/getElementScrollBottom';

import './index.scss';

class Cate extends Component {
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
    this.onLoad();
    this.el.parentNode.parentNode.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.el.parentNode.parentNode.removeEventListener('scroll', this.handleScroll);
  }

  // 加载更多
  onLoad() {
    const { pn, list, limit } = this.state;
    // 添加操作且不超过10
    const data = {
      pn,
      limit,
    };

    req({
      endpoint: 'home/cate/list',
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
        <div className="feed-wrap" ref={(el) => { this.el = el; }} onScroll={this.onScroll}>
          {list.map(item => (
            <div className='cate-item'>
              <img className="left" src={item.icon} alt="" />
              <div className='mid'>
                <p  className='mid-name'>{item.name}</p>
                <p  className='mid-des'>{item.des}</p>
              </div>
              <div className='right'>关注</div>
            </div>
          ))}
        </div>
    );
  }
}

export default withRouter(Cate);
