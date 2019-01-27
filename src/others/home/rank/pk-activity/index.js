import React, { Component } from 'react'
import { render } from 'react-dom'
import Layout from '@components/Layout'

// 多语言包的数据
import './index.scss'

// 自定义布局参数
const layoutArgs = {
  bodyMaxWidth: 425,
  designWidth: 750,
}
class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <Layout {...layoutArgs}>
        <div className='pk-activity-wrap'>
          <div className='pk-activity-head'>
            <div className='test-pk'>pk榜的title</div>
          </div>
          <div className='pk-activity-content'>
            <div className='test-pk'>pk榜的内容区域</div>
          </div>
        </div>
      </Layout>
    )
  }
}

render(<Main />, document.querySelector('main'))
