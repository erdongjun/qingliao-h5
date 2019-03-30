import React, { Component } from 'react';
import { Toast, List } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import UserInfo from '@components/UserInfo';
import Feed from '../feed/Feed';



import req from '@utils/req';
import cookie from '@utils/cookie';

import './scss/index.scss';

const { Item } = List;


class User extends Component {
  constructor() {
    super();
    this.state = {
      info: {
        isMe: 1,
        isFocus: 0,
      },
      currentUid: 0,
    };
    this.onLoad = this.onLoad.bind(this);
    this.handleJump = this.handleJump.bind(this);
  }

  componentDidMount() {
    const uid = cookie.get('uid');
    this.setState({
      currentUid: uid,
    })
    this.onLoad();
  }

  onLoad() {
    const {uid} = this.props.match.params
    req({
      endpoint: `home/user/data?uid=${uid}`,
    })
    .then((res) => {
      if (res.code !== 200) {
        Toast.fail(res.msg, 1);
      } else {
        const info = this.state.info
        const data = res.data
        this.setState({
          info: {
            info,
            ...data,
          } 
        });
      }
    });
  }

  handleJump(path) {
    this.props.history.push(`/${path}`);
  }

  render() {
    const {uid} = this.props.match.params
    const { info,currentUid } = this.state;
    if(currentUid == uid){
      info.isMe = 1
    }
    return (
      <div className="myfeed-wrap">
        <UserInfo info={info}/>
        <Feed my={1} tid={uid} />
      </div>
    );
  }
}


export default withRouter(User);
