import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import req from '@utils/req';

import './index.scss';
class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.jump = this.jump.bind(this)
    this.jumpUser = this.jumpUser.bind(this)
    this.handleZan = this.handleZan.bind(this)
  }
  
  jump(id){
    const {useclick = true} = this.props
    if(useclick){
      this.props.history.push(`/feed/${id}`);
    }
  }
  jumpUser(uid){
    const {useclick = true} = this.props
    if(useclick){
      this.props.history.push(`/user/${uid}`);
    }
  }
  handleZan(fid,isZan){
    if(isZan) return false
    req({
      endpoint: `/home/feed/zan/${fid}`,
    }).then(res=>{
      if(res.code==200){
        this.props.updateList(fid)
      }
    })
  }
  render() {
    const {item, play=0} = this.props
    return (
      <div className='feed-item-wrap'>
        <div className='top'  onClick={()=>this.jumpUser(item.uid)}>
          <div className='head-wrap'>
            <img className='head-img' src={item.avatar}/>
          </div>
          <div className='nick-name' >
            <p className='name' >{item.nick_name}</p>
            <p className='des'>{item.des}</p>
          </div>
        </div>
        <div className='mid'  onClick={()=>this.jump(item.id)}>
          {/* 文章标题 */}
          {item.title ? (<div className='title'>{item.title}</div>) : ''}
          
          {/* 动态内容/文章内容 */}
          {item.content ? (<div className='content'>{item.content}</div>) : ''}

          {/* 单张图片 */}
          {item.imgs.length == 1 ? (<div className='mid-one-img'>
            <img src={item.imgs[0]}/>
          </div>) : ''}

          {/* 多张图片 */}
          {item.imgs.length > 1 ? (
            <div className="mid-imgs">
              {item.imgs.map((img, index) => (
                <i className="img-wrap" key={`index${index}`} style={{ background: `url(${img}) no-repeat center`, backgroundSize: 'contain' }} />
              ))}
            </div>
          ):''}
          
          {/* 视频封面图/播放视频 */}
          {item.video ? (
            <div className="video-content">
              {play ? (<video className='video-poster'  controls="controls" poster={item.video_pic} src={item.video} />) : (<img className='video-poster' src={item.video_pic} />)}
              {play ? '': ( <i className="iconfont-md iconfont icon-icon_video video-open" />)}
            </div>
          )
          : ''}
        </div>
        <div className='btm' >
          <div className='btm-item' onClick={()=>this.handleZan(item.id,item.isZan)}><i className={item.isZan ? "iconfont icon--zan active" : "iconfont icon--zan"} >&nbsp;{item.zan}</i></div>
          <div className='btm-item' onClick={()=>this.jump(item.id)}><i className="iconfont icon--pinglun" >&nbsp;{item.comment}</i></div>
          <div className='btm-item'><i className="iconfont icon--fenxiang">&nbsp;{item.share}</i></div>
        </div>
      </div>
    )
  }
}

export default withRouter(FeedItem);

