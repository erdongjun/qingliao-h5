/**
 * 兼容获取 scrollTop
 * document.body.scrollTop | document.documentElement.scrollTop 必有一个能取到 top 值，另一个则为 0
 */
import getScrollTop from './getScrollTop'

export default () => {
  const num = document.documentElement.scrollHeight - getScrollTop() - document.documentElement.clientHeight
  return parseInt(num, 10)
}
