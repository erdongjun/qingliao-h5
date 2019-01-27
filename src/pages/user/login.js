import React, { Component } from 'react';
import {
  InputItem, Button, Toast,
  NavBar, Icon,
} from 'antd-mobile';

import { createForm } from 'rc-form';

import req from '@utils/req';
import cookie from '@utils/cookie';

import './scss/register.scss';
import { Link, withRouter } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    // 账号已登陆无法进入登录页
    console.log(cookie.get('uid'));
    if (cookie.get('uid')) {
      this.props.history.push('/');
    }
  }

  submit() {
    const that = this;
    this.props.form.validateFields((error, value) => {
      const Rex = /^[a-zA-Z0-9]{6,20}$/;
      // 验证用户名
      if (!Rex.test(value.name.trim())) {
        Toast.fail('用户名有误', 1);
        return false;
      }
      // 验证密码
      if (!Rex.test(value.password.trim())) {
        Toast.fail('密码有误', 1);
        return false;
      }
      const data = {
        name: value.name.trim(),
        password: value.password.trim(),
      };
      req({
        endpoint: 'home/user/login',
        method: 'POST',
        data,
      }).then((res) => {
        if (res.code !== 200) {
          Toast.fail(res.msg, 1);
        } else {
          cookie.set('uid', res.data.uid, 30);
          cookie.set('nick_name', res.data.nick_name, 30);
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
    const { getFieldProps } = this.props.form;
    return (
      <div className="register">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => { window.history.go(-1); }}
          rightContent={<Link className="register-btn" to="/register">注册</Link>}
        >
          用户登录
        </NavBar>
        <h2>轻聊社区</h2>
        <InputItem
          {...getFieldProps('name')}
          type="text"
          placeholder="英文或者数字，6位数以上"
        >
          用户名
        </InputItem>

        <InputItem
          {...getFieldProps('password')}
          type="password"
          placeholder="6-12位密码"
        >
          密码
        </InputItem>
        <Button className="submit" onClick={this.submit} type="primary">登录</Button>
      </div>
    );
  }
}

const LoginWrapper = createForm()(Login);

export default withRouter(LoginWrapper);
