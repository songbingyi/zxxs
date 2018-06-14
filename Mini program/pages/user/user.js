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
    // wx.getUserInfo({
    //   success: res => {
    //     app.globalData.userInfo = res.userInfo
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // })
  }
})