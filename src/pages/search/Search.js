import React, { Component } from 'react';
import {
  NavBar, SearchBar,Icon
} from 'antd-mobile';
import { Link, withRouter } from 'react-router-dom';


import { createForm } from 'rc-form';

import req from '@utils/req';
import reqForm from '@utils/reqForm';

import './index.scss';

// 搜索页
class Search extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clear = this.clear.bind(this);
  }
  onChange (value){
    this.setState({ value });
  }
  clear () {
    this.setState({ value: '' });
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
      };
      req({
        endpoint: 'home/article/add',
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
    const { value } = this.state;
    console.log(' this.state', this.state);
    return (
      <div className="post-wrap">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => { window.history.go(-1); }}
        >
          搜索
        </NavBar>
        <SearchBar
          value={value}
          placeholder="输入要搜索的关键词 eg：故事"
          showCancelButton
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onClear={this.clear}
        />
      </div>
    );
  }
}
export default withRouter(Search);
