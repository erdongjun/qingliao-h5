

import React, { Component } from 'react';
import {
  Card,Toast
} from 'antd-mobile';
import { withRouter } from 'react-router-dom';


import req from '@utils/req';

import './index.scss';


class Article extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.onChange();
  }


  onChange() {
    // 添加操作且不超过10
    const data = {
      pn: 1,
      limit: 7,
    };
    req({
      endpoint: 'home/article/list',
      data,
    })
      .then((res) => {
        if (res.code !== 200) {
          Toast.fail(res.msg, 1);
        } else {
          this.setState({
            list: res.data,
          });
        }
      });
  }


  render() {
    const { list } = this.state;
    return (
      <div className="feed-wrap">
        {list.map(item => (
          <Card full key={item.id}>
            <Card.Header
              title={item.nick_name}
              thumb={item.avatar}
              extra={<span>{item.create_time}</span>}
            />
            <Card.Body>
              <h2 className='article-title'>{item.title}</h2>
              <div className="article-centent">{item.content}</div>
            </Card.Body>
            <Card.Footer content={(<i className="iconfont icon--redu" >&nbsp;{item.rank}</i>)} extra={(<div><i className="iconfont icon--zan" >&nbsp;{item.zan}</i>&nbsp;&nbsp;<i className="iconfont icon--pinglun" >&nbsp;{item.comment}</i></div>)} />
          </Card>

        ))}
      </div>
    );
  }
}


export default withRouter(Article);
