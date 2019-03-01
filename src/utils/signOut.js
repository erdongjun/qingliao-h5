/*
 * @Author: chenweizhi
 * @Date: 2019-02-23 17:14:37
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-02-23 17:20:41
 */

// 退出登录 删除cookies

import cookie from '@utils/cookie';

export default () => {
  cookie.delete('uid');
  cookie.delete('nick_name');
  window.location.href = '/';
};
