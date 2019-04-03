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
    this.toggleFocus = this.toggleFocus.bind(this);
    
  }

  componentDidMount() {
    this.onLoad();
    this.el.parentNode.parentNode.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.el.parentNode.parentNode.removeEventListener('scroll', this.handleScroll);
  }
  toggleFocus(cid,focus){
    const {list} = this.state
    const url = focus ? `home/cate/delfocus/${cid}` : `home/cate/focus/${cid}`

    req({
      endpoint: `${url}`,
    }).then((res)=>{
      if (res.code !== 200) {
        Toast.fail(res.msg, 1);
      }else{
        let tmp = list.map(item=>{
          if(item.id ==cid){
            item.focus = focus ? 0 : 1
          }
          return item
        })
        this.setState({
          list:tmp
        })
      }
    })
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
    console.log(list)
    return (
        <div className="feed-wrap" ref={(el) => { this.el = el; }} onScroll={this.onScroll}>
          {list.map(item => (
            <div className='cate-item' key={item.id}>
              <img className="left" src={item.icon} alt="" />
              <div className='mid'>
                <p  className='mid-name'>{item.name}</p>
                <p  className='mid-des'>{item.des}</p>
              </div>
              <div className='right' onClick={()=>this.toggleFocus(item.id,item.focus)} >{item.focus ? '已关注':'关注' }</div>
            </div>
          ))}
        </div>
    );
  }
}

export default withRouter(Cate);
