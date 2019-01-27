
import React, { PureComponent } from 'react'

import './index.scss'

export default class VipDataList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  getImg(defaultPannel, item) {
    if (defaultPannel === 1) {
      return item.selecticon
    } else if (item.svip === 0) {
      return item.selecticon
    } else {
      return item.icon
    }
  }

  // 点击特权触发的事件
  openInfoPage(item) {
    const { handleClick } = this.props
    handleClick(item)
  }

  render () {
    const { vipData, defaultPannel } = this.props
    return (
      <div>
        <div className="sub-title">{ defaultPannel === 1 ? '小布SVIP特权' : '小布VIP特权'}</div>
        <div className="vip-data-wrapper">
          {vipData.map((item, index) => (
            <div className='wrapper-item' key={index} onClick={() => this.openInfoPage(item)}>
              <div className='wrapper-item-icon'>
                <img alt='img' width='40' height='40' src={this.getImg(defaultPannel, item)} />
              </div>
              <div className='wrapper-item-font'>{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
