// pages/user/orderlist/orderlist.js
const app = getApp()
const orderHttp = require('../../../service/order-http.service.js')
const util = require('../../../utils/util.js')
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
    scrollHeight: 0,

  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {

    // 获取当前设备windowHeight 
    wx.getSystemInfo({
      success: (res) => {

        wx.createSelectorQuery().select('#page-title').boundingClientRect((rect) => {
          // 获取page-title盒子的高度，单位px
          console.log(rect)
          this.setData({
            scrollHeight: res.windowHeight - rect.height //设置滚动区域的高度，单位px
          })

        }).exec()

      }
    })

    orderHttp.getProductOrderList(1, (d, p) => { //初次加载页面获取page1数据
      if (p.total) { //如果条目总数为真
        this.setData({
          hisOrderList: d.product_order_list //渲染后台数据
        })
      } else { //如果条目总数为0
      }
      this.setData({
        hasMore: p.more ? true : false //如果paginated.more为0，底部"加载更多"不显示,反之则显示
      })
    })
  },

  onReady: function() {


  },
  lower() {
    if (!this.data.hasTouched) { //如果没有在请求中，发送请求
      util.hasTouched(500, this) //间隔时间内不能再次出发

      var page = this.data.page + 1; //触发一次滑动到底，page页数+1
      orderHttp.getProductOrderList(page, (d) => {

        this.setData({
          hisOrderList: d.product_order_list.concat(this.data.hisOrderList), //把新得到的订单推到现有数组里
          page: page,
        })
      })
    } else {
      console.log('刷新过于频繁，请求不发送')
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})