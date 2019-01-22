import React, { PureComponent } from 'react'

import './index.scss'

export default class PrivilegeDataList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  showModal (item) {
    const { handleClick } = this.props
    handleClick(item)
  }

  render () {
    const { privilegeData } = this.props
    return (
      <div>
        <div className="privilege-data-wrapper">
          {privilegeData.map((item, index) => (
            <div key={index} className='privilege-data-item-bar clearfix' onClick={() => this.showModal(item)}>
              <div className={`${item.new === 1 ? 'privilege-data-item-new' : 'privilege-data-item-new-hide'}`}>
                <img src='https://web.bldimg.com/cblued/static/new.1cs3g3rid2h77ir.png' alt='new' />
              </div>
              <div className='privilege-data-item-bar-iconWrap'>
                <img src={item.introimg} alt='' />
              </div>
              <div className='privilege-data-item-bar-contentWrap'>
                <div className='privilege-data-item-bar-content-title'>
                  <span>{item.name}</span>
                  <span className='privilege-data-item-bar-content-tip'>
                    <img src={item.typeimg} alt='' />
                  </span>
                </div>
                <div className='privilege-data-item-bar-content-info'>{item.intro}</div>
              </div>
              <div className='privilege-data-item-bar-btnWrap'>
                <div className='privilege-data-item-bar-btn'>
                  <div className='privilege-data-item-bar-priceWrap'>
                    <span className='privilege-data-item-bar-priceIcon'>￥</span>
                    <span className='privilege-data-item-bar-price'>{item.money}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
