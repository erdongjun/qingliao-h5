/*
 * @Author: chenweizhi
 * @Date: 2018-09-05 18:01:45
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2018-12-10 17:29:30
 */
import React, { Component } from 'react'
import { Icon } from 'antd-mobile'
import setPoint from '@utils/setPoint'
// scss
import './index.scss'

const { lanText, uid, type } = window.CONFIG

export default class CardBox extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  shouldComponentUpdate(nextProps) {
    if (this.props === nextProps) {
      return false
    }
    return true
  }

  handleClick(info) {
    // 推荐直播区域的入场人数/次数
    // console.log(info)
    setPoint(`recommend-live-${type}-${uid}-${info.uid}-${info.lid}`)
    window.location = `https://app.blued.cn?action=liveplay&lid=${info.lid}&enc=1&uid=${info.uid}`
  }

  render () {
    const { liveList, gameLen } = this.props
    return (
      <div className='recommend-contain'>
        {gameLen > 0 ? (<div className='recommend-title'>{lanText.recommendedlive}</div>) : ''}
        <div className='recommend-wrap'>
          {liveList.map(item => {
            // 标识
            const liveicon = Number(item.type) === 1 ? 'https://web.bldimg.com/cblued/static/gameicon@3x.1cms5ltce12tsd.png' : 'https://web.bldimg.com/cblued/static/LIVEtag@3x.1cms5ltcq54082.png'
            // 直播间或者是个人主页
            const liveurl = item.lid ? `https://app.blued.cn?action=liveplay&lid=${item.lid}&enc=1&uid=${item.uid}` : `https://app.blued.cn?action=profile&uid=${item.uid}&enc=1`
            // vip标识
            const vip = item.vipInfo && item.vipInfo.vip_grade ? (Number(item.vipInfo.vip_grade) === 1 ? 'https://web.bldimg.com/cblued/static/vip_24@3x.1cn1iatug2kkptn.png' : 'https://web.bldimg.com/cblued/static/svip_24@3x.1cn1in9al144md.png') : ''
            return (
              <div key={item.lid} className='recommend-item'>
                <div className='item-live' onClick={() => this.handleClick(item, liveurl)} href={liveurl} style={{ background: `#e2e4e7 url(${item.pic_url || item.avatar}) no-repeat `, backgroundSize: 'cover' }}>
                  <img className='live-type' src={liveicon} alt='' />
                  {item.hb ? (<img className='card-hb' alt='' src='https://web.bldimg.com/cblued/static/hb@3x.1cn45pj5iubgg3.png' />) : ''}
                  <div className='watch-num'>
                    <img className='live-watch' src='https://web.bldimg.com/cblued/static/iconline@3x.1cnbuqhne1dh89m.png' alt='' />
                    {item.count || 0}
                  </div>
                </div>
                <a className='live-info' href={`https://app.blued.cn?action=profile&uid=${item.uid}&enc=1`}>
                  <div className='anchor-name'>{item.name}</div>
                  <div className='live-des'>{item.des ? item.des : `${item.name} 正在直播哦`}</div>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
