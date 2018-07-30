// pages/user/orderlist/orderlist.js
const app = getApp()
const orderHttp = require('../../../service/order-http.service.js')
const memberHttp = require('../../../service/member-http.service.js')
const util = require('../../../utils/util.js')
const wxPay = require('../../../utils/wx.pay.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hisOrderList: [],
    page: 1,
    hasMore: false,//是否隐藏底部的加载更多
    hasTouched: false,
    scrollHeight: '',//滚动区域的高度
    isHideLoadMore:true,//是否隐藏顶部的刷新
    topHeight:'',
    showOrder:true //是否显示空空如也
  },
  // onPullDownRefresh: function () {
  //  console.log('123')
  // },
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
            scrollHeight: res.windowHeight - rect.height, //设置滚动区域的高度，单位px
            topHeight:rect.height
          })
        }).exec()
      }
    })
    orderHttp.getProductOrderList(1, (d, p) => { //初次加载页面获取page1数据
      if (p.total > 0) { //如果条目总数为真
        this.setData({
          hisOrderList: d.product_order_list, //渲染后台数据

        })
        if (p.more == '1') { //如果总条目为真，还有更多条目，底部的“记载更多”显示
          this.setData({
            hasMore: true
          })
        }
      } else { //如果条目总数为0,底部的‘加载更多’不显示
        this.setData({
          showOrder: false
        })
      }
    })
  },
  lower() {
    if (this.data.hasMore == true) { //如果更多订单为1
      if (!this.data.hasTouched) { //如果没有在请求中，发送请求
        util.hasTouched(500, this) //间隔时间内不能再次出发
        let page = this.data.page + 1; //触发一次滑动到底，page页数+1
        orderHttp.getProductOrderList(page, (d, p) => { //获取订单列表
          this.setData({
            hisOrderList: this.data.hisOrderList.concat(d.product_order_list), //把新得到的订单推到现有数组里
            page: page,
            hasMore: p.more == '1' ? true : false
          })
        })
      } else {
        console.log('刷新过于频繁，请求不发送')
      }
    } else {
      console.log('没有更多订单，不发起请求')
    }
  },
  toper() {//下拉刷新
    if (!this.data.hasTouched) { //如果没有在请求中，发送请求
      util.hasTouched(1000, this) //间隔时间内不能再次出发
      this.setData({
        isHideLoadMore: false
      })
      console.log('11')
      orderHttp.getProductOrderList(1, (d, p) => { //初次加载页面获取page1数据
        if (p.total > 0) { //如果条目总数为真
          this.setData({

            hisOrderList: d.product_order_list, //渲染后台数据
            isHideLoadMore: true
          })
          if (p.more == '1') { //如果总条目为真，还有更多条目，底部的“记载更多”显示
            this.setData({
              hasMore: true
            })
          }
        } 
      })
    }else{
      console.log('刷新过于频繁，请求不发送')
    }
  },
  clickPayBtn: (e) => {
    let cProductId = e.currentTarget.dataset.productId; //获取点击订单的ID
    util.storageMethod.set('productOrderId', cProductId) //订单编号ID存到缓存
    memberHttp.getMemberAuthInfo((d) => { //检测授权状态
      if (d.member_auth_info.member_deduct_contract_auth_status == '0') { //如果签约状态为否

        let failCallback = () => { //用户关闭支付的回调:重新打开orderlist页面
          // wx.redirectTo({
          //   url: 'orderlist'
          // })
        };
        wxPay(failCallback)
      }
    })
  },
  //下拉刷新
  onPullDownRefresh: function(){
      wx.stopPullDownRefresh()
    orderHttp.getProductOrderList(1, (d, p) => { //页面获取page1数据
      if (p.total > 0) { //如果条目总数为真
      console.log("123")
          this.setData({
          hisOrderList: d.product_order_list //渲染后台数据
        })

        if (p.more == '1') { //如果总条目为真，还有更多条目，底部的“记载更多”显示
          this.setData({
            hasMore: true
          })
        }
      } else { //如果条目总数为0,底部的‘加载更多’不显示
        this.setData({
          showOrder: false
        })
      }
    })
   
  },
  onReachBottom: function () {
    if (this.data.hasMore == true) { //如果更多订单为1
      if (!this.data.hasTouched) { //如果没有在请求中，发送请求
        util.hasTouched(500, this) //间隔时间内不能再次出发
        let page = this.data.page + 1; //触发一次滑动到底，page页数+1
        orderHttp.getProductOrderList(page, (d, p) => { //获取订单列表
          this.setData({
            hisOrderList: this.data.hisOrderList.concat(d.product_order_list), //把新得到的订单推到现有数组里
            page: page,
            hasMore: p.more == '1' ? true : false
          })
        })
      } else {
        console.log('刷新过于频繁，请求不发送')
      }
    } else {
      console.log('没有更多订单，不发起请求')
    }
  },
})