//index.js
//获取应用实例
let app = getApp()
let util = require('../../utils/util.js')
let getMemberAuthInfo = require('../../service/getMemberAuthInfo-http-service.js')

Page({
  data: {
    userInfo: {},
    hasUserInfo: true,
    indexLogo: "http://218.244.158.175/static/zuoxiang/images/logo_indexbg.png",
  },
  onLoad: function() {
    //判断用户是否已经同意获取信息


    wx.getSetting({
      success: (res) => {
        let userInfo = util.storageMethod.get( 'userInfo')
        if (res.authSetting['scope.userInfo']) { //如果已经同意过授权
          if (userInfo) { //如果缓存里有userInfo，读取userInfo，设置到view层

            this.setData({
              hasUserInfo: true,
              userInfo: userInfo
            })
          } else { //如果缓存里没有userInfo，调用getUserInfoAPI获取数据,设置到view层，存入缓存
            wx.getUserInfo({
              success: (res) => {
                this.setData({
                  userInfo: res.userInfo,
                  hasUserInfo: true
                });
                wx.setStorageSync('userInfo', res.userInfo)
              }
            })
          }
        } else { //如果没有同意授权,拉起授权按钮
          this.setData({
            hasUserInfo: false
          })
        }
      }
    })


  },
  onShow: function() {


  },
  onReady: function() {
    wx.hideLoading()

  },
  //首页扫码功能
  goAuthorize: function() {
    //getMemberAuthInfo.getMemberAuthInfo((d))
    if (app.globalData.userPayStatus) {
      wx.scanCode({
        onlyFromCamera: true,
        success: (result) => {
          console.log(result)
          // wx.navigateTo({
          //   url: '../orders/orders'
          // })
        },
        fail: (res) => {
          // wx.navigateTo({
          //   url: '../orders/orders'
          // })
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '请扫描正确的二维码',
            success: function(res) {
              if (res.confirm) {
                console.log('点击了确定')
              }
            }
          })
        }
      })
    } else {
      wx.navigateTo({
        url: '../authorize/authorize'
      })
    }
  },
  goUser: function() {
    wx.navigateTo({
      url: '../user/user'
    })
  },



  agreeGetUser(e) { //点击授权按钮
    if (e.detail.userInfo) { //用户点击同意授权
      this.setData({
        hasUserInfo: true,
        userInfo: e.detail.userInfo
      })
      wx.showLoading({
        title: '加载中...',
        duration: 600,
      })
      app.globalData.userInfo = e.detail.userInfo
      wx.setStorage({
        key: 'userInfo',
        data: e.detail.userInfo,
      })
    }
  }
})

// data: {
//   motto: 'Hello World',
//   userInfo: {},
//   hasUserInfo: false,
//   canIUse: wx.canIUse('button.open-type.getUserInfo')
// },
// //事件处理函数
// bindViewTap: function() {
//   wx.navigateTo({
//     url: '../logs/logs'
//   })
// },
// onLoad: function () {
//   if (app.globalData.userInfo) {
//     this.setData({
//       userInfo: app.globalData.userInfo,
//       hasUserInfo: true
//     })
//   } else if (this.data.canIUse){
//     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//     // 所以此处加入 callback 以防止这种情况
//     app.userInfoReadyCallback = res => {
//       this.setData({
//         userInfo: res.userInfo,
//         hasUserInfo: true
//       })
//     }
//   } else {
//     // 在没有 open-type=getUserInfo 版本的兼容处理
//     wx.getUserInfo({
//       success: res => {
//         app.globalData.userInfo = res.userInfo
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     })
//   }
// },