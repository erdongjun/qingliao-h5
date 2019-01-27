/*
 * @Author: chenweizhi
 * @Date: 2018-12-01 16:02:44
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-27 19:22:32
 */

// es6-promise
import 'es6-promise/auto'
// Fetch Polyfill
import 'whatwg-fetch'

// Fastclick
import FastClick from 'fastclick'

// 基础布局组件
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './reset.scss'
import './font.scss'

// eslint-disable-next-line no-underscore-dangle
if (!global._babelPolyfill) {
  require('babel-polyfill')
}
require('viewport-units-buggyfill').init()

FastClick.attach(document.body)

class Layout extends Component {
  static propTypes = {
    // 页面最大宽度
    bodyMaxWidth: PropTypes.number.isRequired,
    // 设计稿宽度
    designWidth: PropTypes.number.isRequired,
  }

  constructor ({ bodyMaxWidth = 425, designWidth = 750 }) {
    super()
    // 设置页面最大宽度
    document.body.style.maxWidth = `${bodyMaxWidth}px`
    if (designWidth) {
      const docElement = document.documentElement
      let screenWidth = docElement.clientWidth
      const htmlElement = document.getElementsByTagName('html')[0]
      if (screenWidth > bodyMaxWidth) {
        screenWidth = bodyMaxWidth
      }
      docElement.style.fontSize = `${screenWidth / designWidth * 100}px`
      const fz = docElement.style.fontSize.replace('px', '')
      const realfz = Number(+window.getComputedStyle(htmlElement).fontSize.replace('px', '') * 10000) / 10000
      if (fz !== realfz) {
        htmlElement.style.cssText = `font-size: ${fz * (fz / realfz)}px`
      }
    }
  }

  render() {
    const { children } = this.props
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    )
  }
}

export default Layout

