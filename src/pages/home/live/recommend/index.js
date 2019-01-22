/*
 * @Author: chenweizhi
 * @Date: 2018-06-14 13:27:44
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2018-12-17 14:27:42
 */

// 直播推荐
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Toast } from 'antd-mobile'

// 公共组件和函数
import Layout from '@components/Layout'
import PullToRefresh from '@components/PullToRefresh'
import setPoint from '@utils/setPoint'

// api接口

import { reqHome } from './service'

// 页面组件
import TopCate from './components/TopCate'
import CardBox from './components/CardBox'

// scss
import './index.scss'

const { CONFIG } = window
const { liveData, gameList, lanText, uid, type } = CONFIG

// 自定义布局参数
const layoutArgs = {
  bodyMaxWidth: 425,
  designWidth: 750,
}
// 自定义下拉上拉加载文案
const lan = { refreshing: lanText.refresh, refresh: lanText.rerefresh, nomore: lanText.nomore, loading: 'loading...' }

class Main extends Component {
  constructor() {
    super()
    this.state = {
      gameList: gameList || [],
      page: 2,
      isFirst: 1,
      liveList: this.distinct(liveData.liveList || []),
      loading: 0,
    }
    // 当前绘制埋点的最大距顶高度
    this.maxTop = 0
    // 绘制埋点的起始位置
    this.darwIndex = 0
    // 单行高度
    this.domHeight = 200
    this.bodyHeight = 200
    this.handleRefresh = this.handleRefresh.bind(this)
    this.handlePromise = this.handlePromise.bind(this)
    this.distinct = this.distinct.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.drawPoint = this.drawPoint.bind(this)
    this.handlePoint = this.handlePoint.bind(this)
  }

  componentDidMount() {
    // 初始化绘制埋点数据
    // 获取单行节点高度
    this.domHeight = parseInt((document.querySelector('.recommend-item') && document.querySelector('.recommend-item').offsetHeight || 0), 10)
    // 游戏区域高度
    const gameHeight = parseInt((document.querySelector('.game-wrap') && document.querySelector('.game-wrap').offsetHeight || 0), 10)
    // 推荐直播头部的高度
    const recommendTitle = parseInt((document.querySelector('.recommend-title') && document.querySelector('.recommend-title').offsetHeight || 0), 10)
    // 视图高度
    this.bodyHeight = parseInt((document.documentElement.clientHeight || 0), 10)
    // 更新maxTop的初始位置
    this.maxTop = gameHeight + recommendTitle
    // 初始化绘制
    this.drawPoint(top)
  }

  // 列表去重
  distinct(arr) {
    const newArr = []
    for (let index = 0; index < arr.length; index++) {
      const item = arr[index]
      let has = false
      for (let sub = 0; sub < newArr.length; sub++) {
        const subItem = newArr[sub]
        if (subItem.uid === item.uid) {
          has = true
        }
      }
      if (!has) {
        newArr.push(item)
      }
    }
    const filterArr = newArr.filter(item => item)
    return filterArr
  }

  // 绘制埋点
  drawPoint(top) {
    // 当前距离顶部距离 + 窗口高度 减去 上次绘制时距离顶部距离，如果大于单行高度，那么进行一次绘制埋点并更新绘制距离 以及绘制位置的下标 。否则认为是已绘制过埋点不做任何处理
    // 当前绘制距离  =  上次绘制距离 + （差值 / 单行高度 * 2 ）
    // 当前高度与历史最大高度的差值
    const diffValue = top + this.bodyHeight - this.maxTop
    if (diffValue >= this.domHeight) {
      // 计算应绘制长度
      const drawLen = parseInt(Number(diffValue / this.domHeight), 10) * 2
      // 当前的截止绘制位置 绘制长度
      const newIndex = this.darwIndex + drawLen
      this.handlePoint(this.darwIndex, newIndex)
      // 更新当前的绘制最大高度以及绘制位置
      this.maxTop = this.maxTop + (drawLen / 2) * this.domHeight
      this.darwIndex = newIndex
    }
  }

  handlePoint(index, newIndex) {
    // 获取需要绘制的数据
    const { liveList } = this.state
    // 绘制埋点
    liveList.slice(index, newIndex).forEach(info => {
      setPoint(`recommend-view-${type}-${uid}-${info.uid}-${info.lid}`)
    })
  }

  handleRefresh(isPull) {
    let { loading, page } = this.state
    if (isPull) {
      page = 1
    }
    if (loading) {
      // 正在加载中不要重复请求数据
      return false
    }
    return new Promise(resolve => {
      this.setState({
        loading: 1,
      })
      reqHome({ uid, page }).then(res => {
        if (res.code === 200) {
          if (page === 1) {
            // 下拉刷新
            this.setState({
              liveList: this.distinct(res.data.liveData.liveList),
              gameList: res.data.gameList,
              page: page + 1,
              loading: 0,
              isFirst: 0,
            })
          } else {
            const { liveList } = this.state
            const newList = liveList.concat(res.data.liveData.liveList)
            // 上拉加载
            this.setState({
              liveList: this.distinct(newList),
              page: page + 1,
              loading: 0,
              isFirst: 0,
            })
          }
          resolve(res.data.liveData.hasmore)
        } else {
          // 请求出错
          Toast.fail(lanText.errnet, 2)
          this.setState({
            loading: 0,
            isFirst: 0,
          })
          resolve(true)
        }
      }).catch(() => {
        Toast.fail(lanText.errnet, 2)
        this.setState({
          loading: 0,
          isFirst: 0,
        })
        resolve(false)
      })
    })
  }

  handlePromise() {
    console.log('开始请求数据')
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('请求数据完毕')
        resolve({ code: 200 })
      }, 2000)
    })
  }

  handleScroll(top) {
    this.drawPoint(top)
  }

  render () {
    const { gameList, liveList, isFirst } = this.state
    liveList.splice(-(liveList.length % 2), (liveList.length % 2))
    return (
      <Layout {...layoutArgs}>
        <PullToRefresh onRefresh={() => this.handleRefresh(1)} onLoadData={() => this.handleRefresh()} onScroll={this.handleScroll} lan={lan}>
          {(!isFirst && gameList.length === 0 && liveList.length === 0) ? (<div className='no-content'>
            <img src='https://web.bldimg.com/cblued/static/nocontent@3x.1cnocjnlfgbamf.png' alt='' />
            <p>{lanText.nocontent}</p>
                                                                           </div>
          ) : ''}
          {gameList && gameList.length > 0 ? (<TopCate gameList={gameList} />) : ''}
          <CardBox liveList={liveList} gameLen={gameList.length} />
        </PullToRefresh>
      </Layout>
    )
  }
}
export default Main

render(
  <Main />,
  document.getElementById('root')
)
