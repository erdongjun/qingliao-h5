/*
 * @Author: chenweizhi
 * @Date: 2018-09-05 18:01:45
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2018-12-12 11:37:02
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import getScrollTop from '@utils/getScrollTop'
import getScrollBottom from '@utils/getScrollBottom'

import './index.scss'

function fun(e) {
  // console.log(e)
  e.preventDefault()
}
const args = { passive: false }

export default class PullToRefresh extends Component {
  static propTypes = {
    // 文案
    lan: PropTypes.object,
    // 上拉加载触发的回调
    onLoadData: PropTypes.func,
    // 监听滚动的回调
    onScroll: PropTypes.func,
    // 下拉刷新的回调
    onRefresh: PropTypes.func,
  }

  constructor (props) {
    super(props)
    let { lan } = this.props
    lan = lan || {}
    this.state = {
      // 下拉刷新
      refreshing: 0,
      translateY: 0,
      // 上拉加载
      loading: 0,
      hasmore: 1,
      lan: {
        ...{ refreshing: '正在刷新', refresh: '松手即刷新', nomore: '没有更多了', loading: '努力加载中...' },
        ...lan,
      },
    }
    // 触摸起始点x轴坐标默认为0
    this.startx = 0
    // 触摸起始点y轴坐标默认为0
    this.starty = 0
    // 当scrolltop 为0时 y的起始位置 默认为0
    this.scrollTopY = 0

    this.touchStart = this.touchStart.bind(this)
    this.touchEnd = this.touchEnd.bind(this)
    this.touchMove = this.touchMove.bind(this)
    this.getAngle = this.getAngle.bind(this)
    this.getDirection = this.getDirection.bind(this)
    this.setWxPullTop = this.setWxPullTop.bind(this)
    this.cancleWxPullTop = this.cancleWxPullTop.bind(this)
  }

  componentDidMount () {
    this.setWxPullTop()
    const { onLoadData, onScroll } = this.props
    if (!onLoadData || !onScroll) return false
    // 监听页面滚动事件
    // 利用 debounce 控制触发频率 100ms 内只触发一次
    window.addEventListener('scroll', debounce(() => {
      const { hasmore } = this.state
      if (getScrollTop() < 2) {
        this.setWxPullTop()
      } else {
        this.cancleWxPullTop()
      }
      // 滚动回调函数
      if (onScroll) {
        onScroll(getScrollTop())
      }
      // 当页面滚动到底部 加载下一页数据
      if (getScrollBottom() === 0 && hasmore) {
        // console.log('开始加载下页数据')
        this.setState({
          loading: 1,
        }, () => {
          if (onLoadData) {
            onLoadData().then(r => {
              this.setState({
                loading: 0,
                hasmore: r ? 1 : 0,
              })
            })
          } else {
            setTimeout(() => {
              this.setState({
                loading: 0,
                hasmore: 0,
              })
            }, 2000)
          }
        })
      }
    }, 30))
  }

  componentWillUnmount () {
    window.removeEventListener('scroll')
    this.cancleWxPullTop()
  }

  // 禁止微信下拉效果
  setWxPullTop() {
    this.cancleWxPullTop()
    document.body.addEventListener('touchmove', fun, args)
  }

  // 移除监听
  cancleWxPullTop() {
    document.body.removeEventListener('touchmove', fun, args)
  }

  // 接触屏幕
  touchStart(e) {
    this.startx = e.touches[0].pageX
    this.starty = e.touches[0].pageY
  }

  // 离开屏幕（[e.changedTouches][2]）
  touchEnd(e) {
    const { onRefresh } = this.props
    if (!onRefresh) return false
    this.setWxPullTop()

    const endx = e.changedTouches[0].pageX
    const endy = e.changedTouches[0].pageY
    const direction = this.getDirection(this.startx, this.starty, endx, endy)
    const { translateY } = this.state
    switch (Number(direction)) {
    case 0:
      // console.log('未滑动！')
      break
    case 1:
      this.cancleWxPullTop()
      // console.log('向上！')
      break
    case 2:
      // console.log('向下！')
      if (getScrollTop() < 10 && translateY > 40) {
        // console.log('触发下拉刷新')
        this.setState({
          translateY: 40,
          refreshing: 1,
        }, () => {
          if (onRefresh) {
            onRefresh().then(() => {
              this.setState({
                refreshing: 0,
                translateY: 0,
              })
            })
          } else {
            setTimeout(() => {
              this.setState({
                refreshing: 0,
                translateY: 0,
              })
            }, 2000)
          }
        })
      } else {
        this.setState({
          translateY: 0,
          refreshing: 0,
        })
      }
      break
    case 3:
      // console.log('向左！')
      break
    case 4:
      // console.log('向右！')
      break
    default:
    }
  }

  touchMove(e) {
    const { onRefresh } = this.props
    if (!onRefresh) return false
    const { translateY } = this.state
    // 获取滑动屏幕时的X,Y
    const endY = e.changedTouches[0].pageY
    const endX = e.changedTouches[0].pageX

    const direction = this.getDirection(this.startx, this.starty, endX, endY)
    // console.log('方向', direction)
    if (Number(direction) === 1) {
      // 向上
      this.cancleWxPullTop()
    }

    // 获取上下滑动距离
    const distanceY = parseInt((Number(endY - this.starty) / 3), 10)

    const maxdistanceY = Math.abs(distanceY) > 50 ? (distanceY > 0 ? 50 : -50) : distanceY

    if (translateY === maxdistanceY) return false

    // 下拉刷新
    if (getScrollTop() === 0 && Number(direction) === 2) {
      this.setWxPullTop()
      this.setState({
        translateY: maxdistanceY,
      })
    } else {
      this.cancleWxPullTop()
    }
    // 上拉加载
    // if (getScrollBottom() === 0) {
    //   this.setState({
    //     translateY: maxdistanceY,
    //   })
    // }
  }

  // 触摸点和离开点连线与[x轴角度][3]
  getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI
  }

  // 根据接触和离开判断方向 1向上 2向下 3向左 4向右 0未发生滑动（[Math.abs][4]）
  getDirection(startx, starty, endx, endy) {
    const angx = endx - startx
    const angy = endy - starty
    let result = 0
    // 如果滑动距离太短
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
      return result
    }
    const angle = this.getAngle(angx, angy)
    if (angle >= -135 && angle <= -45) {
      result = 1
    } else if (angle > 45 && angle < 135) {
      result = 2
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3
    } else if (angle >= -45 && angle <= 45) {
      result = 4
    }
    return result
  }

  render () {
    const { translateY, refreshing, hasmore, loading, lan } = this.state
    const { children } = this.props
    return (
      <div className='wz-pulltorefresh' style={{ transform: `translateY(${translateY}px)` }}>
        <div className='wz-pullrefresh'>{refreshing ? lan.refreshing : lan.refresh}</div>
        <div className='wz-pulltorefresh-main' onTouchMove={this.touchMove} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
          {children}
        </div>
        <div className='wz-bottomload' style={{ visibility: (loading || !hasmore) ? 'visible' : 'hidden' }}>{ hasmore ? lan.loading : lan.nomore}</div>
      </div>
    )
  }
}
