import React, { Component } from 'react'
import { render } from 'react-dom'
import { Carousel, WingBlank, Modal } from 'antd-mobile'

import Layout from '@components/Layout'
import BuyModal from '@components/Modal'
import VipDataList from './components/VipDataList'
import PrivilegeDataList from './components/PrivilegeDataList'

// api接口
import { changeNewStatus, getVipInfo } from './service'
import setPoint from '../../../../utils/setPoint'
// scss
import './index.scss'

// 自定义布局参数
const layoutArgs = {
  bodyMaxWidth: 425,
  designWidth: 750,
}

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      bgImageList: ['tequan.1cs84i2sn36b8e', 'svip.1cs84i32i2qn8m3', 'vip.1cs84i3352td7uu'],
      iconList: ['tequancard.1cs84nc2j12t97t', 'svipcard.1cs84nc2l2qrpc5', 'vipcard.1cs84nc2229ldlr'],
      defalutHintFont: ['体验小布付费特权', '点亮会员标识，享受尊贵特权'],
      defaultPannel: 0,
      vipData: window.CONFIG.vipList || [],
      privilegeData: window.CONFIG.privilegeArr || [],
      setting: window.CONFIG.setting || [],
      vipInfo: window.CONFIG.vipInfo || {},
      userInfo: window.CONFIG.userInfo || {},
      swiperImgs: window.CONFIG.swiperImgs || [],
      selectedItemInfo: {},
      // 判断App的版本是否小于6.7.4
      issmall: window.CONFIG.issmall || false,
    }
  }

  componentDidMount () {
    const parameters = this.getParameter()
    // 获取URL上面的ID的参数
    const parametertype = parameters.type

    if (parametertype && Number(parametertype) === 1) {
      this.setState({
        defaultPannel: 1,
      })
      setPoint(`vip-vip-svip`)
    } else {
      this.setState({
        defaultPannel: 0,
      })
      setPoint(`vip-vip-privilege`)
    }
    const that = this

    // eslint-disable-next-line func-names
    window.setFun = function () {
      // 支付完成的回调，用来更新vip信息
      getVipInfo({ uid: window.CONFIG.uid }).then(res => {
        if (res.code === 200) {
          that.setState({
            vipInfo: res.data,
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }

  // 获取URL上面的参数
  getParameter () {
    // 获取url中"?"符后的字串
    const url = location.search
    const theRequest = {}
    if (url.indexOf('?') !== -1) {
      const str = url.substr(1)
      const strs = str.split('&')
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
      }
    }
    return theRequest
  }

  // 走马灯的事件
  afterChange (index) {
    this.setState({
      defaultPannel: index,
    })
    // 添加埋点
    let type
    if (index === 0) {
      type = 'privilege'
    } else if (index === 1) {
      type = 'svip'
    } else {
      type = 'vip'
    }
    setPoint(`vip-vip-${type}`)
  }

  // 跳转到vip/info页面
  openInfoPage(item) {
    const jumpUrl = `${location.protocol}//${location.host}`
    const pathname = '/vip/info'
    let url = `${jumpUrl}${pathname}?id=${item.id}`
    if (window.CONFIG.env !== 'website') {
      url = `https://common.blued.com/?action=webbrowse&weburl=${encodeURIComponent(url)}`
    }
    window.location.href = url
  }

  // 点击有效期的跳转有效期
  openDeadlinePage () {
    const jumpUrl = `${location.protocol}//${location.host}`
    const pathname = '/vip/deadline'
    let url = `${jumpUrl}${pathname}`
    if (window.CONFIG.env !== 'website') {
      url = `https://common.blued.com/?action=webbrowse&weburl=${encodeURIComponent(url)}`
    }
    window.location.href = url
  }

  // 将点击的特权包的new字段改变返回新的data
  getNewData (key) {
    const { privilegeData } = this.state
    const data = privilegeData.map(dataItem => {
      if (dataItem.key === key) {
        dataItem.new = 0
      }
      return dataItem
    })
    return data
  }

  // 改变特权包的NewIcon的显示和隐藏
  handlechangeNewStatus (key) {
    // 加载数据
    this.setState({
      privilegeData: this.getNewData(key),
    }, () => {
      changeNewStatus({ uid: window.CONFIG.uid, key }).then(() => {
      }).catch(err => {
        console.log(err)
      })
    })
  }

  // addclass
  addClass () {
    document.getElementsByTagName('body')[0].classList.add('modal-scoll')
    document.getElementsByTagName('html')[0].classList.add('modal-scoll')
  }

  // 移除class
  removeClass () {
    document.getElementsByTagName('body')[0].classList.remove('modal-scoll')
    document.getElementsByTagName('html')[0].classList.remove('modal-scoll')
  }

  // 弹框的显示
  modalShow (item) {
    this.addClass()
    this.setState({
      visible: true,
      selectedItemInfo: item,
    })
  }

  // 弹层的关闭按钮
  hideModal(key) {
    this.removeClass()
    this.setState({
      visible: false,
    }, () => {
      this.handlechangeNewStatus(key)
    })
  }

  // 弹层的购买按钮
  handleModalBuy (id, key) {
    // feat：判断用户身份是否是会员（vip/svip）,若是，则点击[立即购买]时弹出二次确认提示，否则直接购买
    const { vipInfo } = this.state
    const alert = Modal.alert
    if (Number(vipInfo.svip) || Number(vipInfo.vip)) {
      alert('', '您已拥有该特权，确认重复购买？', [
        {
          text: '购买',
          onPress: () => {
            this.setState({
              visible: false,
            }, () => {
              this.removeClass()
              this.handlechangeNewStatus(key)
              window.location.href = `http://native.blued.cn/?action=vip_pay_direct&id=${id}&from=vip`
            })
          },
        },
        { text: '取消', onPress: () => { } },
      ])
    } else {
      this.setState({
        visible: false,
      }, () => {
        this.removeClass()
        this.handlechangeNewStatus(key)
        window.location.href = `http://native.blued.cn/?action=vip_pay_direct&id=${id}&from=vip`
      })
    }
  }

  // pannel的购买，续费，升级按钮的跳转
  handlePannelBtnBuy (type) {
    const vipGrade = (type === 'svip') ? '2' : '1'
    window.location.href = `https://common.blued.com/?action=vip_pay_page&app=1&from=viplist&vip_grade=${vipGrade}`
  }

  // setting按钮的跳转
  handleSettingItem (link, index) {
    // 判断status：vip,svip
    const { vipInfo } = this.state
    let status
    if (vipInfo.svip === 1) {
      status = 'svip'
    } else if (vipInfo.vip === 1) {
      status = 'vip'
    }
    if (index === 0) {
      // 隐私增强的埋点，兼容原来的。。。。
      setPoint(`viper_setting_privacySetting_${status}`)
    } else if (index === 1) {
      // 变更图标入口的埋点，兼容原来的。。。。
      setPoint(`viper_setting_iconSetting_${status}`)
    } else if (index === 2) {
      // 订单记录点击的埋点
      setPoint('viper_options_orderlist_normal')
    }
    window.location.href = link
  }

  render () {
    const { bgImageList, defaultPannel, vipData, privilegeData, visible,
      swiperImgs, setting, selectedItemInfo, iconList, defalutHintFont,
      vipInfo, userInfo, issmall } = this.state
    return (
      <Layout {...layoutArgs}>
        <WingBlank className='bannder'>
          <Carousel
            className="space-carousel"
            autoplay={false}
            afterChange={index => this.afterChange(index)}
            dots={false}
            slideWidth={0.9}
            selectedIndex={defaultPannel}
          >
            <div
              className='card-one'
              style={{
                display: 'inline-block',
                transform: 'scale(1.05)',
                width: '100%',
              }}
            >
              <img
                src={`https://web.bldimg.com/cblued/static/${bgImageList[0]}.png`}
                alt="card-one"
                style={{ verticalAlign: 'top', position: 'relative', paddingTop: '0.1rem' }}
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'))
                }}
              />
              <div>
                <div className='vip-name'>
                  <img alt="iconList" src={`https://web.bldimg.com/cblued/static/${iconList[0]}.png`} />
                </div>
                <div className='vip-content'>{defalutHintFont[0]}</div>
                <div className={Number(vipInfo.privileges) === 0 ? 'vip-link-hide' : 'vip-link'} onClick={this.openDeadlinePage}>
                  <span>查看有效期</span>
                  <a className='vip-link-right'>
                    <img alt="right" src='https://web.bldimg.com/cblued/static/right.1csfquck91f69vp.png' />
                  </a>
                </div>
              </div>
            </div>

            <div
              className='card-two'
              style={{
                display: 'inline-block',
                transform: 'scale(1.05)',
                width: '100%',
              }}
            >
              <img
                src={`https://web.bldimg.com/cblued/static/${bgImageList[1]}.png`}
                alt=""
                style={{ verticalAlign: 'top', position: 'relative', paddingTop: '0.1rem' }}
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'))
                }}
              />
              {(vipInfo.svip === 0) ? (
                <div>
                  <div className='vip-name'>
                    <img alt='iconList-one' src={`https://web.bldimg.com/cblued/static/${iconList[1]}.png`} />
                  </div>
                  <div className='vip-content change-padding svip-color'>{defalutHintFont[1]}</div>
                </div>) : (
                <div className='vip-wrap clearfix'>
                  <div className='vip-icon'>
                    <img
                      src={userInfo.avatar} alt='avatar'
                      onError={e => { e.target.onerror = null; e.target.src = 'https://web.bldimg.com/cblued/static/default.1c2b240hi2sg3rh.png' }} />
                  </div>
                  <div className='svip-info'>
                    <p className='vip-info-name'>{userInfo.name}</p>
                    <div className='vip-info-time' onClick={this.openDeadlinePage}>
                      {vipInfo.sviptime}
                        到期
                      <a className='vip-info-turn'>
                        <img alt='helperGoden' src='https://web.bldimg.com/cblued/static/helperGoden.1cs5f4n8m2svii7.png' />
                      </a>
                    </div>
                  </div>
                </div>
              )}
              <div className='btn-color-yellow vip-button' onClick={this.handlePannelBtnBuy.bind(this, 'svip')}>
                <span>{vipInfo.svip === 0 ? '购买' : '续费'}</span>
              </div>
            </div>

            <div
              className='card-three'
              style={{
                display: 'inline-block',
                transform: 'scale(1.05)',
                width: '100%',
              }}
            >
              <img
                src={`https://web.bldimg.com/cblued/static/${bgImageList[2]}.png`}
                alt=""
                style={{ verticalAlign: 'top', position: 'relative', paddingTop: '0.1rem' }}
              />
              {(vipInfo.vip === 0) ? (
                <div>
                  <div className='vip-name'>
                    <img alt='iconList-two' src={`https://web.bldimg.com/cblued/static/${iconList[2]}.png`} />
                  </div>
                  <div className='vip-content change-padding'>{defalutHintFont[1]}</div>
                </div>
              ) : (
                <div className='vip-wrap clearfix'>
                  <div className='vip-icon'>
                    <img
                      src={userInfo.avatar} alt='avatar'
                      onError={e => { e.target.onerror = null; e.target.src = 'https://web.bldimg.com/cblued/static/default.1c2b240hi2sg3rh.png' }} />
                  </div>
                  <div className='vip-info'>
                    <p className='vip-info-name'>{userInfo.name}</p>
                    <div className='vip-info-time' onClick={this.openDeadlinePage}>
                      {vipInfo.viptime}
                        到期
                      <a className='vip-info-turn'>
                        <img alt='helper' src='https://web.bldimg.com/cblued/static/helper.1cs5f3sqi14la20.png' />
                      </a>
                    </div>
                  </div>
                </div>
              )}
              <div className='btn-color-white vip-button' onClick={this.handlePannelBtnBuy.bind(this, 'vip')}>
                <span>{vipInfo.vip === 0 ? '购买' : '升级'}</span>
              </div>
            </div>

          </Carousel>
        </WingBlank>
        {
          defaultPannel === 0 ? (
            <PrivilegeDataList
              privilegeData={privilegeData} handleClick={this.modalShow.bind(this)} />
          )
            : (
              <VipDataList
                defaultPannel={defaultPannel}
                vipData={vipData}
                handleClick={this.openInfoPage.bind(this)} />)
        }
        <div className={`${defaultPannel === 0 ? 'priviledge-padding' : 'other-padding'} banner-wrap ${swiperImgs.length === 0 ? 'banner-hide' : ''}`}>
          <WingBlank>
            <Carousel
              autoplay={!swiperImgs.length === 1}
              infinite
              dots={!swiperImgs.length === 1}
              autoplayInterval={3000}
            >
              {swiperImgs.map((item, val) => (
                <div key={val} className='vip-banner'>
                  <a href={item.jump}>
                    <img alt='img' src={item.img} />
                  </a>
                </div>
              ))}
            </Carousel>
          </WingBlank>
        </div>
        <div className='banner-line' />
        {issmall
          ? (
            <div>
              <div className='privicy'>
                {setting.slice(0, 2).map((item, index) => (
                  <div className={(vipInfo.svip || vipInfo.vip) ? 'privicy-item' : 'banner-hide'} key={index} onClick={this.handleSettingItem.bind(this, item.link, index)}>
                    <a className='privicy-item-font'>{item.name}</a>
                    <a className='privicy-item-icon'>
                      <img alt='privicy-item-icon' src='https://web.bldimg.com/cblued/static/turn.1cs5qrs091k6376.png' />
                    </a>
                    <div className='privicy-item-line' />
                  </div>
                ))}
              </div>
              <div className={(vipInfo.svip || vipInfo.vip) ? 'banner-line-basic' : 'banner-hide'} />
            </div>
          ) : ''}
        <div className='privicy'>
          {setting.slice(2, 4).map((item, index) => (
            <div className='privicy-item' key={index} onClick={this.handleSettingItem.bind(this, item.link)}>
              <a className='privicy-item-font'>{item.name}</a>
              <a className='privicy-item-icon'>
                <img alt='turn' src='https://web.bldimg.com/cblued/static/turn.1cs5qrs091k6376.png' />
              </a>
              <div className='privicy-item-line' />
            </div>
          ))}
        </div>
        <div className='banner-line-basic' />
        <div className='privicy'>
          <div className='privicy-item' onClick={this.handleSettingItem.bind(this, setting[4].link, 2)}>
            <a className='privicy-item-font'>{setting[4].name}</a>
            <a className='privicy-item-icon'>
              <img alt='turn' src='https://web.bldimg.com/cblued/static/turn.1cs5qrs091k6376.png' />
            </a>
          </div>
        </div>
        <div className='banner-line-end' />
        <BuyModal visible={visible}>
          <div className='privige-modal'>
            <div className='privige-modal-top'>
              <div className='privige-modal-bgIcon'>
                <img src='https://web.bldimg.com/cblued/static/modal.1cs3g5tk120gk65.png' alt='' />
              </div>
              <div className='privige-modal-pic'>
                <img src={selectedItemInfo.desimg} alt='' />
              </div>
              <div className='privige-modal-title'>
                <span>{`特权包详情-${selectedItemInfo.name}`}</span>
                <span className='privige-modal-title-tip'>
                  <img src={selectedItemInfo.typeimg} alt='' />
                </span>
              </div>
              <div className='privige-modal-content'>
                {selectedItemInfo && selectedItemInfo.des && selectedItemInfo.des.map((item, index) => (
                  <div key={index} className='privige-modal-content-item'>{item}</div>
                ))}
              </div>
            </div>
            <div className='privige-modal-bottom'>
              <div className='privige-modal-bottom-font' onClick={this.handleModalBuy.bind(this, selectedItemInfo.id, selectedItemInfo.key)}>
                <span className='privige-modal-bottom-font-ion'>￥</span>
                <span className='privige-modal-bottom-font-price'>{selectedItemInfo.money}</span>
                <span className='privige-modal-bottom-font-tbn'>立即购买</span>
              </div>
            </div>

            <div className='privige-modal-closeIcon' onClick={this.hideModal.bind(this, selectedItemInfo.key)}>
              <img src='https://web.bldimg.com/cblued/static/closeIcon.1cs8aioh117scs0.png' alt='closeIcon' />
            </div>
          </div>
        </BuyModal>
      </Layout>
    )
  }
}
export default Main

render(
  <Main />,
  document.getElementById('root')
)
