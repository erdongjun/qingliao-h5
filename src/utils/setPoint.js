/*
 * @Author: chenweizhi
 * @Date: 2018-09-11 11:34:03
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-10 13:35:41
 */

// 埋点

/**
 * 埋点统计
 * @param {String} log
 */

export default log => {
  let that = new Image()
  that.src = `/redirect?url=${log}`
  that = null
}