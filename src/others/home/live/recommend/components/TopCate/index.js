/*
 * @Author: chenweizhi
 * @Date: 2018-09-05 18:01:45
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2018-12-10 17:37:11
 */
import React, { Component } from 'react'

import setPoint from '@utils/setPoint'

import './index.scss'

const { lanText, uid, titleUrl } = window.CONFIG

export default class TopCate extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleClick(info) {
    // 游戏直播区域的入场人数/次数
    setPoint(`recommend-game-live-${uid}`)
    window.location = `https://app.blued.cn?action=liveplay&lid=${info.lid}&enc=1&uid=${info.uid}`
  }

  jumpGameCate() {
    setPoint(`recommend-game-title-${uid}`)
    window.location = titleUrl
  }

  render () {
    const { gameList = [] } = this.props
    return (
      <div className='game-wrap'>
        <div className='game-title' onClick={this.jumpGameCate}>
          {lanText.gamelive}
          <img className='more' src='https://web.bldimg.com/cblued/static/moreicon@3x.1cnj757v11ok7h9.png' alt='' />
        </div>
        <div className='game-list'>
          {gameList.map(item => {
            // 标识
            const liveicon = Number(item.type) === 1 ? 'https://web.bldimg.com/cblued/static/gameicon@3x.1cms5ltce12tsd.png' : 'https://web.bldimg.com/cblued/static/LIVEtag@3x.1cms5ltcq54082.png'
            return (
              <div className='game-item' key={item.lid} onClick={() => this.handleClick(item)}>
                <div className='item-pic' style={{ background: `#E2E4E7 url(${item.pic_url || item.avatar}) no-repeat center center`, backgroundSize: 'cover' }}>
                  <img className='live-type' src={liveicon} alt='' />
                  <div className='watch-num'>
                    <img className='live-watch' src='https://web.bldimg.com/cblued/static/iconline@3x.1cnbuqhne1dh89m.png' alt='' />
                    229
                  </div>
                </div>
                <div className='anchor-name'>
                  <div className='anchor-des'>{item.name}</div>
                  <div className='game-name'>{item.game_name}</div>
                </div>
              </div>
            )
          })
          }
        </div>
      </div>
    )
  }
}
