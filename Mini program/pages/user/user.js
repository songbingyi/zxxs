// pages/user/user.js
const app = getApp()
Page({
  data: {
    userInfo: {},
  },
  getPhoneNumber: function () {
    wx.makePhoneCall({
      // phoneNumber: '02968201798'
      phoneNumber: '02968201798'
    })
  },
  onLoad: function () {
   var userInfo = wx.getStorageSync('userInfo');//从缓存获取userinfo
   if(userInfo){//如果缓存里有userinfo
     this.setData({
       userInfo: userInfo
     })
   }else{//如果换村里没有userInfo，使用api获取数据
     wx.getUserInfo({
       success:(res) => {
         this.setData({
           userInfoL: res.userInfo
         });
         wx.setStorageSync('userInfo', res.userInfo)
       }
     })
   }
   this.setData({
     userInfo: userInfo
   })
  }
})