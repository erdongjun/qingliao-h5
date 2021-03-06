import React, { Component } from 'react';

import './index.scss';
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list:[]
    }
  }
  
  
  render() {
    return (
      <div className='comment-wrap'>
          <div className='comment-item'>
            <div  className='comment-item-avator'>
              <img src='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=105401705,3073581821&fm=27&gp=0.jpg' />
            </div>
            <div className='item-content'>
              <div className='item-top'>top</div>
              <div className='item-mid'>mid</div>
              <div className='item-btm'>btm</div>
            </div>
            <div className='item-reply'>
              <div className='item-top'>top</div>
              <div className='item-mid'>mid</div>
              <div className='item-btm'>btm</div>
            </div>
          </div>
      </div>
    )
  }
}

export default withRouter(FeedItem);

