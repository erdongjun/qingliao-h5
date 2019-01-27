import React, { Component } from 'react';
import {
  Button, Toast,
  NavBar, Icon, TextareaItem, ImagePicker,
} from 'antd-mobile';
import { Link, withRouter } from 'react-router-dom';


import { createForm } from 'rc-form';

import req from '@utils/req';
import reqForm from '@utils/reqForm';
import cookie from '@utils/cookie';

import './scss/register.scss';


class PostFeed extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      multiple: true,
    };
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onAddImageClick = this.onAddImageClick.bind(this);
  }

  onChange(files, type, index) {
    console.log(files, type, index);
    this.setState({
      files: files.slice(0, 9),
    });
    // 添加操作且不超过10
    if (type === 'add' && files.length < 10 && files.length > 0) {
      const data = {
        files,
        index: Number(files.length - 1),
      };
      reqForm({
        endpoint: 'common/file/upload',
        data,
      }).then((res) => {
        if (res.code !== 200) {
          Toast.fail(res.msg, 1);
        } else {
          console.log('上传成功');
          files[res.data.index].url = res.data.url;
          this.setState({
            files,
          });
        }
      });
    }
  }

  onAddImageClick(e) {
    const { files } = this.setState;
    e.preventDefault();
    this.setState({
      files: files.concat({
        url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
        id: '3',
      }),
    });
  }

  submit() {
    const that = this;
    const { files } = that.state;
    this.props.form.validateFields((error, value) => {
      // 验证动态内容
      if (!(value.content.trim().length > 3)) {
        Toast.fail('内容太少了', 1);
        return false;
      }
      console.log(files);
      let imgs = '';
      files.forEach((item, index) => {
        if (index) {
          imgs = `${imgs}|${item.url}`;
        } else {
          imgs = `${item.url}`;
        }
      });
      const data = {
        content: value.content.trim(),
        imgs,
      };
      req({
        endpoint: 'home/post/feed',
        method: 'POST',
        data,
      }).then((res) => {
        if (res.code !== 200) {
          Toast.fail(res.msg, 1);
        } else {
          Toast.success(res.msg, 1);
          // 跳转首页
          that.props.history.push('/');
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
      <div className="register">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => { window.history.go(-1); }}
          rightContent={<Link className="register-btn" to="/register">注册</Link>}
        >
          发布动态
        </NavBar>
        <TextareaItem
          {...getFieldProps('content')}
          placeholder="这一刻的想法"
          rows={6}
          count={300}
        />
        <ImagePicker
          files={files}
          length="3"
          onChange={this.onChange}
          selectable={files.length < 9}
          multiple={multiple}
        />

        <Button className="submit" onClick={this.submit} type="primary">发布</Button>
      </div>
    );
  }
}

const PostFeedWrapper = createForm()(PostFeed);

export default withRouter(PostFeedWrapper);
