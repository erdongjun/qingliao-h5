import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MyNavBar from '@components/MyNavBar';
import req from '@utils/req';

import { Toast } from 'antd-mobile';


import ArticleItem from './ArticleItem';
import './index.scss';

class ArticleDetail extends Component {
  constructor() {
    super();
    this.state = {
      info : {}
    }
  }

  componentDidMount() {
    const {id} = this.props.match.params
    req({
      endpoint: `home/article/${id}`,
    })
      .then((res) => {
        if (res.code !== 200) {
          Toast.fail(res.msg, 1);
        } else {
          this.setState({
            info: res.data,
          });
        }
      });
  }

  render() {
    const {info} = this.state
    return (
      <div className="myfeed-wrap">
        <MyNavBar title="文章详情" back />
        <div className="feed-wrap">
          {info.id ? (<ArticleItem item={info} useclick={false} />) : '' }
        </div>
      </div>
    );
  }
}

export default withRouter(ArticleDetail);
