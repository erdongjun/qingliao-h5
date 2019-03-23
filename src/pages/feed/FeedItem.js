import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card } from 'antd-mobile';

import './index.scss';

class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.jump = this.jump.bind(this)
  }
  jump(id){
    const {useclick = true} = this.props
    if(useclick){
      this.props.history.push(`/feed/${id}`);
    }
  }
  render() {
    const {item} = this.props
    return (
      <Card full key={item.id}  onClick={()=> this.jump(item.id)}>
        <Card.Header
          title={item.nick_name}
          thumb={item.avatar}
          extra={<span>{item.create_time}</span>}
        />
        <Card.Body>
          <div className="feed-content">{item.content}</div>
          <div className="feed-imgs">
            {item.imgs.map((img, index) => (
              <i className="img-wrap" key={`index${index}`} style={{ background: `url(${img}) no-repeat center`, backgroundSize: 'contain' }} />
            ))}
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

export default withRouter(FeedItem);

