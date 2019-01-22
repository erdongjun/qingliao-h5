import React, { Component } from 'react'
import { render } from 'react-dom'
import Layout from '@components/Layout'

import './index.scss'
import setPoint from '../../../../utils/setPoint'

// 自定义布局参数
const layoutArgs = {
  bodyMaxWidth: 425,
  designWidth: 750,
}

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      itemInfo: window.CONFIG.privilegeArr || [],
    }
  }

  handleBuy (id) {
    // 点击购买按钮的埋点
    setPoint(`vip-detail-buyClicked`)
    window.location.href = `http://native.blued.cn/?action=vip_pay_direct&id=${id}&from=detail`
  }

  render () {
    const { itemInfo } = this.state
    return (
      <Layout {...layoutArgs}>
        <div className='detail-warp'>
          <div className='detail-bg'>
            <img src='https://web.bldimg.com/cblued/static/modal.1cs3g5tk120gk65.png' alt='' />
          </div>
          {itemInfo && itemInfo.map((item, index) => (
            <div key={index}>
              <div className='detail-icon'>
                <img src={item.desimg} alt='' />
              </div>
              <div className='detail-name'>
                <div className='detail-name-font'>
                  <span>{`特权包详情-${item.name}`}</span>
                  <span className='detail-name-font-tip'>
                    <img src={item.typeimg} alt='img' />
                  </span>
                </div>
              </div>
              <div className='detail-line' />
              <div className='detail-info'>
                {item.des.map((item, index) => (<div className='detail-info-item' key={index}>{item}</div>))}
              </div>
              <div className='detail-btn' onClick={this.handleBuy.bind(this, item.id)}>
                <span className='detail-btn-price'>￥</span>
                <span className='detail-btn-number'>{item.money}</span>
                <span className='detail-btn-buy'>立即购买</span>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    )
  }
}

render(<Main />, document.querySelector('main'))
