// pages/user/orderlist/orderlist.js
const app = getApp()
const orderHttp = require('../../../service/order-http.service.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hisOrderList: {},
    page: 1,
    hasMore: false,
    hasTouched: 0,
    titleHeight: 0,
    scrollHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */




  onLoad: function(options) {
    var that = this;
    wx.createSelectorQuery().select('#page-title').boundingClientRect(function (rect) {  // title盒子的高度
      that.setData({ titleHeight :rect.height})
 
    }).exec()



    
    orderHttp.getMemberOrderList(1, (d, p) => { //初次加载页面获取page1数据
      if (p.total) { //如果条目总数为真
        this.setData({
          hisOrderList: d.member_order_list //渲染后台数据
        })
      } else { //如果条目总数为0

      }
      this.setData({
        hasMore: p.more ? true : false //如果paginated.more为0，底部"加载更多"不显示,反之则显示
      })

    })
  },

  onReady: function(){
    // 获取windowHeight 
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          scrollHeight: res.windowHeight - this.data.titleHeight
        })
      }
    })
    console.log(this.data.titleHeight)
  },
  lower() {
    if(!this.data.hasTouched){//如果没有在请求中，发送请求
    this.setData({
      hasTouched: 1 //正在请求中，设置为1
    })
      var page = this.data.page + 1; //触发一次滑动到底，page页数+1
      orderHttp.getMemberOrderList(page, (d) => {
        this.setData({
          hisOrderList: d.member_order_list.concat(this.data.hisOrderList),
          page: page,
          hasTouched: 0//设置状态为没有在请求中
        })
      })
  }else{
    console.log('刷新过于频繁，请求不发送')
  }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})