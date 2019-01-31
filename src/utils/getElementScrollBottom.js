/**
 * 兼容获取 元素scrollTop
 * document.body.scrollTop | document.documentElement.scrollTop 必有一个能取到 top 值，另一个则为 0
 */
import getScrollTop from './getElementScrollTop'

export default (el) => {
  const num = el.scrollHeight - getScrollTop(el) - el.clientHeight
  return parseInt(num, 10)
}
