import React, { Component } from 'react'
import { render } from 'react-dom'
import Layout from '@components/Layout'

// 多语言包的数据
import explain from './data'
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
      explainList: explain[window.CONFIG.lan] || explain.cn,

    }
  }

  render () {
    const { explainList } = this.state
    return (
      <Layout {...layoutArgs}>
        <div className='faq-wrap'>
          <div className='faq-bottom'>
            {explainList.map((item, index) => (
              <div className='faq-bottom-part' key={index}>
                <div className='faq-bottom-part-title'>{item.title}</div>
                {item.content.map((contentItem, contentIndex) => (
                  <div className='faq-bottom-part-content' key={contentIndex}>{contentItem}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Layout>
    )
  }
}

render(<Main />, document.querySelector('main'))
