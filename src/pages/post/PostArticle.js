import React, { Component } from 'react';
import {
  Button, Toast,
  NavBar, Icon, TextareaItem, InputItem,
} from 'antd-mobile';
import { Link, withRouter } from 'react-router-dom';


import { createForm } from 'rc-form';

import req from '@utils/req';
import reqForm from '@utils/reqForm';

import './index.scss';


class PostArticle extends Component {
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
      // 验证文章内容
      if (!(value.content.trim().length > 30)) {
        Toast.fail('内容太少了', 1);
        return false;
      }
       if (!(value.title.trim().length > 0)) {
        Toast.fail('请输入标题', 1);
        return false;
      }
     
      const data = {
        content: value.content,
        title: value.title,
        type: 2,
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
          发布文章
        </NavBar>
        <InputItem
          className='article-title'
          {...getFieldProps('title')}
          placeholder="文章标题"
        />
        <TextareaItem
          className='article-content'
          {...getFieldProps('content')}
          placeholder="文章内容"
          rows={12}
          count={10000}
        />
        <Button className="submit" onClick={this.submit} type="primary">发布</Button>
      </div>
    );
  }
}

const PostArticleWrapper = createForm()(PostArticle);

export default withRouter(PostArticleWrapper);
