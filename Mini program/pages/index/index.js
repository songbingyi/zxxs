//index.js
//获取应用实例
const app = getApp();
let util = require('../../utils/util.js');
let memberHttp = require('../../service/member-http.service.js');
let orderHttp = require('../../service/order-http.service.js');
let containerHttp = require('../../service/container-http.service.js');
let baseHttp = require('../../service/base-http.service.js.js');

Page({
  data: {
    avatarUrl: '',
    hasUserInfo: true,
    indexLogo: "http://218.244.158.175/static/zuoxiang/images/logo_indexbg.png",
    //albumDisabled: true,
    //bindDisabled: false
  },
  onLoad: function(res) {

      //缓存里查看是否有异常订单,如果有跳转至orderlist
    // wx.getStorage({
    //   key: 'wrongOrder',
    //   success: function (res) {
    //     wx.showLoading({
    //       title: '载入中',
    //     })
    //     if (res.data == true) {
    //       wx.navigateTo({
    //         url: '/pages/user/orderlist/orderlist?wrongorder=1',
    //       })
    //     }
    //   },
    // })

    //判断用户是否已经同意获取头像信息
    let that = this;
    wx.getSetting({
      success: (res) => {
        //let userInfo = util.storageMethod.get('userInfo')
        if (res.authSetting['scope.userInfo']) { //如果已经授权,从微信获取加密信息,发送给后端
          wx.getUserInfo({
            success: (e) => {
              let submitInfo = {
                iv: e.iv,
                encrypted_data: e.encryptedData,
                signature: e.rawData,
                raw_data: e.rawData
              }

              //JS运行到index页面，如果requestOK==true 直接发起用户信息请求，如果为false，在APP注册一个用户信息请求函数，在APP运行到请求时可以进行
              if (app.globalData.requestOK == true) {
                console.log('requestOK == true，直接发起请求')
                memberHttp.setWechatMiniProgramMemberInfo(submitInfo, () => { //加密信息发给后端
                  memberHttp.getMemberDetail((d) => { //从后端获取头像
                    that.setData({
                      avatarUrl: d.member_info.icon_image.thumb,
                    })
                  })
                })
              } else { //如果缓存没有member_id，在APP里注册函数，等待APP执行
                console.log('equestOK == false，注册APP函数')
                app.syncallback = () => {
                  memberHttp.setWechatMiniProgramMemberInfo(submitInfo, () => { //加密信息发给后端
                    memberHttp.getMemberDetail((d) => { //从后端获取头像
                      this.setData({
                        avatarUrl: d.member_info.icon_image.thumb,
                      })
                    })
                  })
                }
              }
            }
          })
        } else { //如果没有同意授权,拉起授权按钮
          this.setData({
            hasUserInfo: false
          })
        }
      }
    })


    //请求base类接口
    //基本-货柜类型
    // baseHttp.getWarehouseCategoryList((d) => {
    // })
    //基本-支付类型
    baseHttp.getPaymentCodeList((d) => {
      this.setData({
        payment_code_list: d.payment_code_list
      })
    })
    //基本-订单状态
    baseHttp.getProductOrderStatusList((d) => {
    })
    //请求base类接口结束

  },
  onShow: function() { //从其他界面返回index界面时，检测如果全局变量里有头像信息，并且this.data没有头像信息，就从全局变量里更新头像
    if (app.globalData.avatarUrl && this.data.avatarUrl == '') {
      this.setData({
        avatarUrl: app.globalData.avatarUrl
      })
      console.log('从全局变量获取头像')
      console.log(app.globalData.avatarUrl)
    }
  },
  onReady: function() {
    wx.hideLoading()

  },
  //首页点击扫码
  goAuthorize: function() {
      wx.showToast({
          title: '开门中...',
          icon: 'loading',
          mask: true
      })
    memberHttp.getMemberAuthInfo((d) => { //从后台获取授权信息
      //模拟电商流程开始

      if (d.member_auth_info.member_auth_status === "1") { //如果授权总状态为1，进入结算页面
        if (d.member_auth_info.member_deduct_contract_auth_status == '0') { //如果没有签约代扣，支付方式全局变量设置为微信支付
          app.globalData.payment_code_info = this.data.payment_code_list[0]
        }
        var containerNo = 'CH8NMWNW4'; //保存货柜编号 TODO：后期改为硬件动态获取
        orderHttp.addProductOrder(containerNo, (d, status) => { //给后端传递货柜编号，获取订单编号ID，申请开门

          if (status) { //判断是否开门成功————如果开门

            util.storageMethod.set('productOrderId', d.product_order_id) //订单编号ID存到缓存
            containerHttp.getContainerDetail(containerNo, (d) => { //获取仓库分类
              let categoryId = d.container_info.warehouse_info.warehouse_category_info.warehouse_category_id
              if (categoryId == "2001") { //判断仓库类型————如果是普通仓库，跳转order页面TODO
                //  wx.hideToast()
                wx.navigateTo({
                  url: '../orders/orders'
                })
              } else if (categoryId == "2002") { //判断仓库类型————如果是重力感应仓库，跳转####页面TODO
                //  wx.hideToast()
              }else{
                  wx.hideToast()
              }
            }) //获取仓库分类结束
          } else { //判断是否开门成功————如果开门失败
              wx.hideToast()
            let errorMsg = d.status.error_desc, //错误提示
              errorCode = d.status.error_code; //错误代码
            switch (errorCode) {
              case '3005':
                wx.showModal({
                  title: '提示',
                  content: '货柜已无商品，请联系客服补货',
                  showCancel: true,
                  confirmText: '联系客服',
                  success: function(res) {
                    if (res.confirm) { //用户点击确定
                      wx.makePhoneCall({ //拨打客服电话
                        phoneNumber: app.globalData.CSNumber
                      })
                    }
                  }
                });
                break;

              case '3004':
                wx.showModal({
                  title: '提示',
                  content: errorMsg,
                  showCancel: false,
                  success: function(res) {
                    wx.navigateTo({
                      url: '../user/orderlist/orderlist'
                    })
                  }
                });
                break;
              default:
                wx.showModal({
                  title: '提示',
                  content: errorMsg,
                  showCancel: false
                });
                break;
            }
          }
        })
      } else { //总授权状态不为1
          wx.hideToast()
        app.globalData.memberAuthStatus = d.member_auth_info; //授权信息传给全局变量，给跳转页面使用
        wx.navigateTo({
          url: '../authorize/authorize'
        })
      }
    })
  },
  goUser: function() {
    wx.navigateTo({
      url: '../user/user'
    })
  },
  agreeGetUser(e) { //点击授权按钮

    if (e.detail.userInfo) { //用户点击同意授权之后，先渲染授权返回的头像，然后给后端发送加密信息，然后从后端拉取头像,点击拒绝后授权弹窗消失
    wx.showToast({
        title:"加载中...",
        icon:"loading",
        duration:600
    })
      this.setData({
        avatarUrl: e.detail.userInfo.avatarUrl
      })
      var submitInfo = {
        iv: e.detail.iv,
        encrypted_data: e.detail.encryptedData,
        signature: e.detail.rawData,
        raw_data: e.detail.rawData
      }
      memberHttp.setWechatMiniProgramMemberInfo(submitInfo, () => {
        memberHttp.getMemberDetail((d) => {
          if (d.member_info.icon_image.thumb) {
            this.setData({
              avatarUrl: d.member_info.icon_image.thumb,
            })
          }
        })
      })
    } else {}
  },
  hideUserInfo() { //点击授权的同时，去掉授权弹窗
    this.setData({
      hasUserInfo: true,
    })
  },
  //转发事件
  onShareAppMessage: function (res) {
    return {
      title: '坐享小食',
      path: '/pages/index/index'
    }
  }
})