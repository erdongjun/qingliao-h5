import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './index.scss';
class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.jumpEdit = this.jumpEdit.bind(this)
    this.focus = this.focus.bind(this)
  }
  jumpEdit(uid){
    if(useclick){
      this.props.history.push(`/edit/${uid}`);
    }
  }
  focus(uid,targetUid){
    
  }
  render() {
    const {info, play=0} = this.props
    console.log('info',info)
    return (
      <div className="user-info">
          <div className="top">
            <img className="avator" src={info.avatar} alt="" />
            <div className="user-content">
              <div className="user-name">{info.nick_name}</div>
              <div className="user-desc">{info.des}</div>
            </div>
            {info.isMe ? (<div className="user-edit">编辑</div>) : ''}
          </div>
          <div className="mid">
            <div className="mid-item">
              <p className='num'>99</p>
              <p className='desc'>获赞</p>
            </div>
            <div className="mid-item">
              <p className='num'>100</p>
              <p className='desc'>粉丝</p>
            </div>
            <div className="mid-item">
              <p className='num'>999</p>
              <p className='desc'>关注</p>
            </div>
            <div className="mid-item">
              <p className='num'>92</p>
              <p className='desc'>积分</p>
            </div>
          </div>
          {!info.isMe ? ( <div className="user-focus-btn">{info.isFocus ? '已关注' : '关注' }</div>) : ''}
        </div>
    )
  }
}

export default withRouter(UserInfo);

