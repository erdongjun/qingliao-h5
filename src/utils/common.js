const checkType = require('./checkType.js')

// 加入千分分隔符
const numFormat = num => {
  let res = num.toString().replace(/\d+/, function (n) {
      return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
          return $1 + ','
        })
    })
  return res
}

// 处理银行卡号隐藏的问题
const cardNumHide = num => {
  let res = num.toString().replace(/^(\d*)(\d{4})/, function ($1, $2, $3) {
      return $2.replace(/\d/g, '*') + $3
    })
  return res
}
// 日期处理 YYYY-MM
const dateFormat = num => {
  let res = num.toString().replace(/^(\d*)(\d{2})/, function ($1, $2, $3) {
      return $2 + '-' + $3
    })
  return res
}
// 获取上个月   YYYY-MM
const getPreMonth = num => {
  return num.toString().replace(/^(\d*)(\d{2})/, function ($1, $2, $3) {
      let m = (parseFloat($3) - 1) ? (parseFloat($3) - 1) : 12 
        let y = (parseFloat($3) - 1) ? $2 : ($2 - 1) 
         m = m > 9 ? m : ('0' + m)
         console.log(y + '' + m)
      return y + '' + m
    })
}
// 格式化时间为 小时 分钟
// s 秒数  type 1 ：返回小时， 2： 返回分钟，
const timeFormat = (s, type) => {
  let res = 0
  switch (type) {
    case 1:
      res = Math.floor(s / 3600)
      break
    case 2:
      res = Math.floor((s / 60) % 60)
      break
    default:
  }
  return res
}
const verifyChinese = (text) => {
  return /[\u4e00-\u9fa5]/gm.test(text.toString())
}
const replaceChinese = (text) => {
  return  text.toString().replace(/[\u4e00-\u9fa5]/gm,'')
}

const CloseWebPage = () => {
  window.location = `https://common.blued.com/?action=close`
}
// 获取数组平均数
const getAverage = (array) => {
  if (!array || checkType(array) !== 'array') return
}

export default {
  numFormat,
  cardNumHide,
  dateFormat,
  getPreMonth,
  timeFormat,
  verifyChinese,
  replaceChinese,
  CloseWebPage,
  getAverage
}
