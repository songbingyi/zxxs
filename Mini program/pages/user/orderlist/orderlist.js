// pages/user/orderlist/orderlist.js
const app = getApp()
const orderHttp = require('../../../service/order-http.service.js')
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
    orderHttp.getMemberOrderList(1,(d,p)=>{//首次载入页面获取page1数据
      console.log(d,p)
      if(p.total == 0){//如果数据总数为0

      }else{
        this.setData({
          hisOrderList: d.member_order_list
        })
      }

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