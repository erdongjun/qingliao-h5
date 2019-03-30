import React, { Component } from 'react';
import {
  Button, Toast,
  NavBar, Icon, TextareaItem, InputItem, ImagePicker,
} from 'antd-mobile';
import { withRouter } from 'react-router-dom';


import { createForm } from 'rc-form';

import req from '@utils/req';
import reqForm from '@utils/reqForm';

import './index.scss';


class PostFeed extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      multiple: true,
      titles:{
        1:'动态',
        2:'文章',
        3:'视频',
      },
      title:'动态',
      type:1,
      
    };
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onAddImageClick = this.onAddImageClick.bind(this);
  }
  componentDidMount(){
    const {type=1} = this.props.match.params
    const {titles} = this.state
    this.setState({
      type,
      title: titles[type],
    })
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
    const { files, type } = that.state;
    this.props.form.validateFields((error, value) => {
      let data = {}
      if(type == 1) {
        // 验证动态内容
        if (!(value.content.trim().length > 3)) {
          Toast.fail('内容太少了', 1);
          return false;
        }
        let imgs = '';
        files.forEach((item, index) => {
          if (index) {
            imgs = `${imgs}|${item.url}`;
          } else {
            imgs = `${item.url}`;
          }
        });
         data = {
          content: value.content,
          imgs,
          type,
        };
      }
      if(type == 2) {
        // 验证文章内容
        if (!(value.content.trim().length > 30)) {
          Toast.fail('内容太少了', 1);
          return false;
        }
        if (!(value.title.trim().length > 0)) {
          Toast.fail('请输入标题', 1);
          return false;
        }
        data = {
          content: value.content,
          title: value.title,
          type,
        };
      }
      if(type == 3) {
        // 验证视频地址
        if (!(value.video.trim().length > 5)) {
          Toast.fail('视频地址非法', 1);
          return false;
        }
        // 验证视频封面
        if (!(value.pic.trim().length > 5)) {
          Toast.fail('视频封面地址非法', 1);
          return false;
        }
        if (!(value.content.trim().length > 0)) {
          Toast.fail('请输入标题', 1);
          return false;
        }
      
        data = {
          video: value.video,
          content: value.content,
          video_pic:value.pic,
          type,
        };
      }
      
      req({
        endpoint: 'home/feed/add',
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
    const { files, multiple, title, type } = this.state;
    const { getFieldProps } = this.props.form;
    console.log(' this.state', this.state);
    return (
      <div className="post-wrap">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => { window.history.go(-1); }}
        >
          发布{title}
        </NavBar>
        {/* 动态 */}
        {type == 1 ? (
          <React.Fragment>
            <TextareaItem
              className='article-content'
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
          </React.Fragment>
        ) : ''}
        {/* 文章 */}
        {type == 2 ? (
          <React.Fragment>
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
          </React.Fragment>
        ) : ''}
        {/* 视频 */}
        {type == 3 ? (
          <React.Fragment>
            <InputItem
              className='article-title'
              {...getFieldProps('content')}
              placeholder="视频标题"
            />
            <InputItem
              className='article-title'
              {...getFieldProps('pic')}
              placeholder="视频封面图地址"
            />
            <TextareaItem
              className='article-content'
              {...getFieldProps('video')}
              placeholder="视频地址 mp4"
              rows={5}
              count={1000}
            />
          </React.Fragment>
        ) : ''}

        

        <Button className="submit" onClick={this.submit} type="primary">发布</Button>
      </div>
    );
  }
}

const PostFeedWrapper = createForm()(PostFeed);

export default withRouter(PostFeedWrapper);
