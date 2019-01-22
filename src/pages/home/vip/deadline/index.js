import React, { Component } from 'react'
import { render } from 'react-dom'
import Layout from '@components/Layout'

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
      useList: window.CONFIG.res.use || {},
      giveList: window.CONFIG.res.give || {},
      privilegesList: window.CONFIG.res.privileges || [],
    }
  }

  render () {
    const { useList, giveList, privilegesList } = this.state
    return (
      <Layout {...layoutArgs}>
        <div className='deadline-warp'>
          <div className={!useList.period ? 'deadline-hide' : 'use-wrap'}>
            <div className='deadline-item'>
              <div className='deadline-item-top'>
                <div className='deadline-item-top-time'>
                  <span>会员有效期至：</span>
                  <span>{useList.period}</span>
                </div>
              </div>
              <div className='deadline-item-bottom'>
                {useList.timeArr.map((item, index) => (
                  <div className='deadline-item-bottom-item' key={index}>
                    <div className='deadline-item-bottom-item-icon'>
                      <img className='deadline-item-bottom-item-img' src={item.img} alt='img' />
                    </div>
                    <div className='deadline-item-bottom-item-process clearfix'>
                      <div className='deadline-item-bottom-item-shape' style={{ width: `${Number(item.width) * 0.73 * 100}%` }} />
                      <div className='deadline-item-bottom-item-date'>
                        {item.endTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={!giveList.period ? 'deadline-hide' : 'give-wrap'}>
            <div className='deadline-item'>
              <div className='deadline-item-top'>
                <div className='deadline-item-top-time'>
                  <span>获赠时长：</span>
                  <span>{`${giveList.period}天`}</span>
                </div>
              </div>
              <div className='deadline-item-bottom'>
                {giveList.timeArr.map((item, index) => (
                  <div className='deadline-item-bottom-item' key={index}>
                    <div className='deadline-item-bottom-item-icon'>
                      <img className='deadline-item-bottom-item-img' src={item.img} alt='' />
                    </div>
                    <div className='deadline-item-bottom-item-process clearfix'>
                      <div className='deadline-item-bottom-item-shape' style={{ width: `${Number(item.value) / 365 * 0.73 * 100}%` }} />
                      <div className='deadline-item-bottom-item-date'>
                        {`${Number(item.value)}天`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={privilegesList.length === 0 ? 'deadline-hide' : 'privilege-wrap'}>
            <div className='deadline-item'>
              <div className='deadline-item-top'>
                <div className='deadline-item-top-time'>
                  <span>特权时长</span>
                </div>
              </div>
              <div className='deadline-item-bottom'>
                {privilegesList.map((item, index) => (
                  <div className='deadline-item-bottom-item' key={index}>
                    <div className='deadline-item-bottom-item-icon'>
                      <div className='deadline-item-bottom-privilege-item-font'>{item.name}</div>
                    </div>
                    <div className='deadline-item-bottom-item-process clearfix'>
                      <div className='deadline-item-bottom-item-shape' style={{ width: `${Number(item.width) * 0.73 * 100}%` }} />
                      <div className='deadline-item-bottom-item-date'>
                        {item.endTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

render(<Main />, document.querySelector('main'))
