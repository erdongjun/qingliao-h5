/**
 * 兼容获取 元素scrollTop
 * document.body.scrollTop | document.documentElement.scrollTop 必有一个能取到 top 值，另一个则为 0
 */

export default (el) => parseInt(el.scrollTop, 10)
