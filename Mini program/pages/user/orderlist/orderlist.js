// pages/user/orderlist/orderlist.js
const app = getApp()
const orderHttp = require('../../../service/order-http.service.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hisOrderList: null,
    height:'',
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //获取windowHeight 
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          height: res.windowHeight * 2-160
        })
      },
    })
    orderHttp.getMemberOrderList(1,(d,p)=>{//每次载入页面获取page1数据
      console.log(d,p)
      if(!p.more){//如果paginated.more为0，"加载更多"不显示
        this.setData({
          hisOrderList: null
        })
      }else{
        this.setData({
          hisOrderList: d.member_order_list,
        })
      }
    })
  },

  lower(){
    var page = this.data.page+1;//触发一次滑动到底，page页数+1
    orderHttp.getMemberOrderList(page,(d) => {
      this.setData({
        hisOrderList: d.member_order_list.concat(this.data.hisOrderList)
      })
    })
    this.setData({
      page:page
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})