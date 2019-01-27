import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { createForm } from 'rc-form';

import {
  InputItem, Button, Toast,
  NavBar, Icon,
} from 'antd-mobile';
import req from '@utils/req';

import './scss/register.scss';

class Register extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  submit() {
    const that = this;
    this.props.form.validateFields((error, value) => {
      const Rex = /^[a-zA-Z0-9]{6,20}$/;
      const nickRex = /^[\s\S]*.*[^\s][\s\S]*$/;
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
      // 验证昵称
      if (!nickRex.test(value.nick_name.trim())) {
        Toast.fail('昵称有误', 1);
        return false;
      }
      const data = {
        name: value.name.trim(),
        password: value.password.trim(),
        nick_name: value.nick_name.trim(),
      };

      req({
        endpoint: 'home/user/register',
        method: 'POST',
        data,
      }).then((res) => {
        console.log(res);
        if (Number(res.code) !== 200) {
          Toast.fail(res.msg, 1);
        } else {
          Toast.success(res.msg, 1);
          // 跳转登录页
          that.props.history.push('/login');
        }
      }).catch((err) => {
        console.log(err);
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
          rightContent={<Link className="register-btn" to="/login">登录</Link>}
        >
          用户注册
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
        <InputItem
          {...getFieldProps('nick_name')}
          type="text"
          placeholder="昵称"
        >
          昵称
        </InputItem>
        <Button className="submit" onClick={this.submit} type="primary">注册</Button>
      </div>
    );
  }
}

const RegisterWrapper = createForm()(Register);

export default withRouter(RegisterWrapper);
