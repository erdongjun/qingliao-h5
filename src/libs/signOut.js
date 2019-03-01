/*
 * @Author: chenweizhi
 * @Date: 2019-02-23 17:14:37
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-02-23 17:18:03
 */

// 退出登录 删除cookies

import cookie from '@utils/cookie';

module.exports = () => {
  cookie.delete('uid');
  cookie.delete('nick_name');
  window.location.href = '/';
};
