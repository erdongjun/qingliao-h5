import React, { Component } from 'react'
import { render } from 'react-dom'
import Layout from '@components/Layout'

import './index.scss'
import { Carousel, WingBlank, Tabs } from 'antd-mobile'
// 自定义布局参数
const layoutArgs = {
  bodyMaxWidth: 425,
  designWidth: 750,
}

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // 默认的slide的index值
      slideIndex: 0,
      infoList: window.CONFIG.vipList || [],
      version: window.CONFIG.vipList[0].version || '',
    }
  }

  componentDidMount () {
    const { infoList } = this.state
    const parameters = this.getParameter()
    // 获取URL上面的ID的参数
    const parameterid = parameters.id
    const index = infoList.findIndex(item => item.id === Number(parameterid))
    this.setState({
      slideIndex: index,
      version: infoList[index].version,
    })
  }

  // 滑动导航tab的时候触发的事件
  tabChange (index) {
    const { infoList } = this.state
    this.setState({
      slideIndex: index,
      version: infoList[index].version,
    })
  }

  // 点击tab的时候触发的事件
  tabClick (index) {
    const { infoList } = this.state
    this.setState({
      slideIndex: index,
      version: infoList[index].version,
    })
  }

  // 滑动slide的时候触发的事件
  afterChange (index) {
    const { infoList } = this.state
    this.setState({
      slideIndex: index,
      version: infoList[index].version,
    })
  }

  // 获取URL上面的参数
  getParameter () {
    // 获取url中"?"符后的字串
    const url = location.search
    const theRequest = {}
    if (url.indexOf('?') !== -1) {
      const str = url.substr(1)
      const strs = str.split('&')
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
      }
    }
    return theRequest
  }

  // 点击购买按钮进行的
  handleBuy () {
    window.location.href = `https://common.blued.com/?action=vip_pay_page&app=1&from=viplist&vip_grade=2`
  }

  render () {
    const { slideIndex, infoList, version } = this.state
    return (
      <Layout {...layoutArgs}>
        <Tabs
          tabs={infoList} swipeable={true}
          tabBarActiveTextColor='#F1BE5A'
          tabBarInactiveTextColor='#2A2A2E'
          tabBarTextStyle={{ fontFamily: 'PingFangSC-Light, sans-serif' }}
          renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3.5} activeTab={slideIndex} />}
          onChange={(tab, index) => this.tabChange(index)}
          onTabClick={(tab, index) => this.tabChange(index)}>
          {this.renderContent}
        </Tabs>
        <WingBlank style={{ marginLeft: '0', marginRight: '0' }}>
          <Carousel
            className='space-carousel'
            frameOverflow='hidden'
            cellSpacing={20}
            slideWidth={0.83}
            dots={false}
            selectedIndex={slideIndex}
            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={index => this.afterChange(index)}
          >
            {infoList.map((item, index) => (
              <div
                key={index}
                className={`list-item ${slideIndex === index ? 'selected' : 'notSelected'} `}
                style={{
                  top: slideIndex === index ? 0 : 15,
                }}
              >
                <div className='list-top'>
                  <div className='list-top-info-font'>{item.intro}</div>
                </div>
                <div className={`list-bottom ${slideIndex === index ? 'selected-padding' : 'notSelected-padding'} `}>
                  <div className='list-bottom-img-wrap'>
                    <img alt='img' className='list-bottom-img' src={item.img} />
                  </div>
                  <div className={item.after ? 'list-bottom-font' : 'list-botton-font-display'}>{item.after}</div>
                </div>
              </div>
            ))}
          </Carousel>
        </WingBlank>
        <div className='app-version'>
          此功能需要Blued国内版
          {version}
          以上版本支持
        </div>
        <div className='app-button' onClick={this.handleBuy.bind(this)}>
          <div className='app-btn-font'>购买</div>
        </div>
      </Layout>
    )
  }
}

render(<Main />, document.querySelector('main'))
