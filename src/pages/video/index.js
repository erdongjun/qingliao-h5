import React, { Component } from 'react';
import { Card, Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

import req from '@utils/req';
import getElementScrollBottom from '@utils/getElementScrollBottom';

import './index.scss';


class Video extends Component {
  constructor() {
    super();
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
      endpoint: 'home/video/list',
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
      console.log('开始加载数据');
      this.onLoad();
    }
  }

  render() {
    const { list } = this.state;
    return (
      <div className="feed-wrap" ref={(el) => { this.el = el; }}>
        {list.map(item => (
          <Card full key={item.id}>
            <Card.Header
              title={item.nick_name}
              thumb={item.avatar}
              extra={<span>{item.create_time}</span>}
            />
            <Card.Body>
              <h2 className="article-title">{item.title}</h2>
              <div className="article-centent">
                <video controls="controls" poster={item.pic} src={item.content} />
              </div>
            </Card.Body>
            <Card.Footer
              content={(
                <i className="iconfont icon--redu">
&nbsp;
                  {item.rank}
                </i>
)}
              extra={(
                <div>
                  <i className="iconfont icon--zan">
&nbsp;
                    {item.zan}
                  </i>
&nbsp;&nbsp;
                  <i className="iconfont icon--pinglun">
&nbsp;
                    {item.comment}
                  </i>
                </div>
)}
            />
          </Card>

        ))}
      </div>
    );
  }
}


export default withRouter(Video);