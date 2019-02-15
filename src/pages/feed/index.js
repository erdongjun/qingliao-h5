import React, { Component } from 'react';
import { Card, Toast,NavBar,Popover,Modal,Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

import req from '@utils/req';
import getElementScrollBottom from '@utils/getElementScrollBottom';
import getScrollBottom from '@utils/getScrollBottom';

import './index.scss';


class Feed extends Component {
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
    const { type } = this.props
    this.onLoad();
    if (type === 'myfeed') {
      window.addEventListener('scroll', this.handleScroll);
    } else {
      this.el.parentNode.parentNode.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    const { type } = this.props

    if (type === 'myfeed') {
      window.removeEventListener('scroll', this.handleScroll);
    } else {
      this.el.parentNode.parentNode.removeEventListener('scroll', this.handleScroll);
    }
  }


  // 加载更多
  onLoad() {
    const { type } = this.props
    const { pn, list, limit } = this.state;
    // 添加操作且不超过10
    const data = {
      pn,
      limit,
      type,
    };
   
    req({
      endpoint: 'home/feed/list',
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
    const { type } = this.props

    if (type === 'myfeed' && getScrollBottom() === 0) {
      this.onLoad();
    } else if (getElementScrollBottom(e.target) === 0) {
      this.onLoad();
    } else {
      console.log('滚动中');
    }
  }


  render() {
    const { list } = this.state;
    return (
      <div className="feed-wrap" ref={(el) => { this.el = el; }} onScroll={this.onScroll}>
      
        {list.map(item => (
          <Card full key={item.id}>
            <Card.Header
              title={item.nick_name}
              thumb={item.avatar}
              extra={<span>{item.create_time}</span>}
            />
            <Card.Body>
              <div className="feed-content">
                {item.content}
              </div>
              <div className="feed-imgs">
                {item.imgs.map((img, index) => (
                  <i className="img-wrap" key={`index${index}`} style={{ background: `url(${img}) no-repeat center`, backgroundSize: 'contain' }} />
                ))}
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

export default withRouter(Feed);
