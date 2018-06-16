//index.js
//获取应用实例
let app = getApp()
var orderService = require('../../service/order-http.service.js')

Page({
  data: {
    userInfo: {},
    hasUserInfo: true,
    indexLogo: "http://218.244.158.175/static/zuoxiang/images/logo_indexbg.png",
  },
  onLoad: function() {
    wx.showLoading({
      title: '加载中..',
    })
    //判断用户是否已经同意获取信息
    wx.getSetting({
      success:(res) => {
        wx.hideLoading()
        if (res.authSetting['scope.userInfo']){ //如果已经同意过授权
          wx.getStorage({
            key: 'userInfo',
            success: (res) => {
              this.setData({ //从缓存里读取userInfo
                hasUserInfo:true,
                userInfo:res.data
              })
            },
          })
        }else{
          this.setData({
            hasUserInfo:false
          })
        }
        
      }
    })    

    //微信登录
    wx.login({
      success: (res) => {
        var code = res.code;
        if (code) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session' + '?appid=wx8bf90b8b9fbcf28e' + '&secret=e5bd94eb0ba0e5a99304fac78a3f065e' + '&js_code=' + code + '&grant_type=authorization_code',
            success: (e) => {
               console.log(e)

            }
          })
        }
      }
    })
  },
  onShow: function() {
    //console.log(app.globalData)
    // if (app.globalData.userPayStatus) {

    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true,
    //   })
    // } else {
    //   // wx.showLoading({
    //   //   title: '加载中',
    //   // });
    //   wx.redirectTo({
    //     url: '../authorize/authorize'
    //   })
    // }

  },
  onReady: function() {
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 1000)
    // wx.getUserInfo({
    //   success: res => {
    //     app.globalData.userInfo = res.userInfo
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // })
  },
  //首页扫码功能
  goAuthorize: function() {
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
    console.log(e.detail)
    if (e.detail.userInfo) { //用户点击同意授权
      this.setData({
        hasUserInfo: true,
        userInfo: e.detail.userInfo
      })
      wx.showLoading({
        title: '加载中...',
        duration: 600,
      })

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
// getUserInfo: function(e) {
//   console.log(e)
//   app.globalData.userInfo = e.detail.userInfo
//   this.setData({
//     userInfo: e.detail.userInfo,
//     hasUserInfo: true
//   })
// }
// getinfo:function(e){
//   orderService.getMemberDetail((d) => {

//   });
// }