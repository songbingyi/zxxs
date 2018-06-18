// pages/user/orderlist/orderlist.js
const app = getApp()
const datas = require('../../../assets/datas/mock.js')
const orderListService = require('../../../service/user-order-http.service.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderPayList: [],
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
        console.log(d)
    })
    //载入订单数据
    this.setData({
      orderPayList: datas.orderListPage1
    })
  },

  lower(){
   
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})