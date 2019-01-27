/*
 * @Author: chenweizhi
 * @Date: 2018-06-14 13:27:44
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2018-12-17 15:59:35
 */

// 基础框架demo
import React, { Component } from 'react'
import { render } from 'react-dom'

// 公共组件和函数
import Layout from '@components/Layout'

// api接口

import { reqHome } from './service'

// 页面组件

// scss
import './index.scss'

const { CONFIG } = window

// 自定义布局参数
const layoutArgs = {
  bodyMaxWidth: 425,
  designWidth: 750,
}

class Main extends Component {
  constructor() {
    super()
    this.state = {
      config: CONFIG,
    }
  }

  render () {
    const { config } = this.state
    return (
      <Layout {...layoutArgs}>
        demo
        {config.lan}
      </Layout>
    )
  }
}
export default Main

render(
  <Main />,
  document.getElementById('root')
)
