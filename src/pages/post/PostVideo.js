import React, { Component } from 'react';
import {
  Button, Toast,
  NavBar, Icon, TextareaItem, InputItem,
} from 'antd-mobile';
import { Link, withRouter } from 'react-router-dom';


import { createForm } from 'rc-form';

import req from '@utils/req';

import './index.scss';


class PostVideo extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      multiple: true,
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    const that = this;
    const { files } = that.state;
    this.props.form.validateFields((error, value) => {
      // 验证视频地址
      if (!(value.content.trim().length > 5)) {
        Toast.fail('视频地址非法', 1);
        return false;
      }
      // 验证视频封面
      if (!(value.pic.trim().length > 5)) {
        Toast.fail('视频封面地址非法', 1);
        return false;
      }
      if (!(value.title.trim().length > 0)) {
        Toast.fail('请输入标题', 1);
        return false;
      }
     
      const data = {
        video: value.content,
        title: value.title,
        video_pic:value.pic,
        type: 3,
      };
      req({
        endpoint: 'home/feeds/add',
        method: 'POST',
        data,
      }).then((res) => {
        if (res.code !== 200) {
          Toast.fail(res.msg, 1);
        } else {
          Toast.success(res.msg, 1, () => {
            // 跳转首页
          // that.props.history.push('/');
          });
        }
      }).catch(() => {
        Toast.fail('请求错误', 1);
      });
    });
  }


  render() {
    const { files, multiple } = this.state;
    const { getFieldProps } = this.props.form;
    console.log(' this.state', this.state);
    return (
      <div className="post-wrap">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => { window.history.go(-1); }}
        >
          发布视频
        </NavBar>
        <InputItem
          className='article-title'
          {...getFieldProps('title')}
          placeholder="视频标题"
        />
        <InputItem
          className='article-title'
          {...getFieldProps('pic')}
          placeholder="视频封面图地址"
        />
        <TextareaItem
          className='article-content'
          {...getFieldProps('content')}
          placeholder="视频地址 mp4"
          rows={5}
          count={1000}
        />
        <Button className="submit" onClick={this.submit} type="primary">发布</Button>
      </div>
    );
  }
}

const PostVideoWrapper = createForm()(PostVideo);

export default withRouter(PostVideoWrapper);
