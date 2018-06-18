// pages/user/orderlist/orderlist.js
const app = getApp()
const orderListService = require('../../../service/user-order-http.service.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hisOrderList: [],
    height:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //获取windowHeight 
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight * 2-160
        })
      },
    })
    orderListService.getUserOrderList((d) => {
        
        this.setData({
          hisOrderList:d.orderList
        })
    })
  },

  lower(){
    orderListService.getUserOrderList((d) => {
      console.log(d.orderList.concat(d.orderList))
      this.setData({
        hisOrderList: d.orderList.concat(d.orderList)
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})