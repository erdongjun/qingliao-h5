import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card } from 'antd-mobile';

import './index.scss';

class VideoItem extends Component {
  constructor(props) {
    super(props);
    this.jump = this.jump.bind(this)
  }
  jump(id){
    const {useclick = true} = this.props
    if(useclick){
      this.props.history.push(`/video/${id}`);
    }
  }
  render() {
    const {item,isVideo = false} = this.props
    return (
      <Card full key={item.id} onClick={()=> this.jump(item.id)}>
        <Card.Header
          title={item.nick_name}
          thumb={item.avatar}
          extra={<span>{item.create_time}</span>}
        />
        <Card.Body>
          <div className='article-title video-title'>{item.title}</div>
          <div className="article-centent">
            {isVideo ? (<video className='video-poster'  controls="controls" poster={item.video_pic} src={item.video} />) : (<img className='video-poster' src={item.video_pic} />)}
            {isVideo ? '': ( <i className="iconfont-md iconfont icon-icon_video video-open" />)}
          </div>
        </Card.Body>
        <Card.Footer
          content={(<i className="iconfont icon--redu">&nbsp;{item.rank}</i>)}
          extra={(<div><i className="iconfont icon--zan">&nbsp;{item.zan}</i>&nbsp;&nbsp;<i className="iconfont icon--pinglun">&nbsp;{item.comment}</i></div>)}
        />
      </Card>
    );
  }
}

export default withRouter(VideoItem);

