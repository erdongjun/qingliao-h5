
import req from '@utils/req'

/**
 * 首页数据
 *
 * @param {String} uid
 * @return {Promise}
 */

export const reqHome = ({ uid, page }) => req({
  endpoint: `recommend/data/${uid}/${page}`,
})

export const foo = 'foo'

