import req from '@utils/req'

export const changeNewStatus = ({ uid, key }) => req({
  endpoint: `/vip/setPrivileges?uid=${uid}&key=${key}`,
})
// 获取vip信息
export const getVipInfo = ({ uid }) => req({
  endpoint: `/vip/vip/data/${uid}`,
})
