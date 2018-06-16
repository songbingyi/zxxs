// pages/user/user.js
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
  },
  getPhoneNumber: function () {
    wx.makePhoneCall({
      // phoneNumber: '02968201798'
      phoneNumber: '02968201798'
    })
  },
  onLoad: function () {
   var userInfo = app.globalData.userInfo;//从全局变量获取userinfo
   this.setData({
     userInfo: userInfo
   })
  }
})