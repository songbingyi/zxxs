// page/component/new-pages/cart/cart.js
let app = getApp()
let orderHttp = require('../../service/order-http.service.js')
let memberHttp = require('../../service/member-http.service.js')
let wxPay = require('../../utils/wx.pay.js')
let util = require('../../utils/util.js')

Page({

  data: {
    productList: [],
    totalPrice: 0,
    disabled: false,
    orderPayBtn: '确认支付',
    page: 1,
    hasMore: false,
    hasTouched: false,
    scrollHeight: '',
    topHeight:''
  },

  //onReady navigate返回后可以继续保持数据 TODO 应该不存在返回状态 暂时改为onload
  onLoad() {
    wx.showLoading({
      title: '载入中',
    })
    //获取设备的高度
    wx.getSystemInfo({
      success: (res) => {
        wx.createSelectorQuery().select('#page-title').boundingClientRect((rect) => {
          // 获取page-title盒子的高度，单位px
          let topheight = rect.height; //顶部高度
          //获取底部高度,单位px
          wx.createSelectorQuery().select('#payBox').boundingClientRect((rect) => {
            this.setData({
              scrollHeight: res.windowHeight - topheight - rect.height, //设置滚动区域的高度，单位px
              topHeight: topheight
            })
          }).exec()
        }).exec()
      }
    })

    orderHttp.getWareHouseProductList(1, (d, p) => { //首次载入，查询仓库商品列表,请求第一页数据;p:分页信息
      //获取仓库列表返回的商品列表
      let productList = d.product_list;
      let plength = productList.length,
        order_info = { //拼装商结算的参数
          product_list: [{
            product_id: productList[0].product_id, //id是第一件商品的ID
            quantity: '1' //数量为1
          }],
          payment_code_info: app.globalData.payment_code_info //支付方式参数来自全局变量
        };
      for (let i = 0; i < plength; i++) {
        productList[i].quantity = '0' //每个仓库商品数量设置为0
      }

      this.setData({
        productList: productList, //设置商品名称
        hasMore: p.more == '1' ? true : false
      })

      orderHttp.checkoutProductOrder(order_info, (d, status) => { //发起订单结算请求，首次载入页面第一个商品为1
        if (status) {
          orderHttp.getProductOrderDetail((d) => { //查询订单详情，更改数量和应支付总价
            let changedProduct = d.product_order_info.order_product_list[0];
            this.setData({
              'productList[0].quantity': changedProduct.quantity,
              totalPrice: d.product_order_info.total
            })
          })
        }
      })
    })
    //根据授权状态决定支付方式
  },
onShow:function(){
wx.hideLoading()
},
  //点击支付按钮后发起支付行为
  clickPayBtn() {
    if (this.data.hasTouched == false) {
      util.hasTouched(1000,this)
      memberHttp.getMemberAuthInfo((d) => { //检查支付授权状态
        if (d.member_auth_info.member_deduct_contract_auth_status == '0') { //如果签约状态为否,发起微信支付
          let failCallback = () => {
              wx.redirectTo({ //支付失败 跳转userlist
                url: '../user/orderlist/orderlist'
              })
            };
          wxPay( failCallback)
        }
      })
    }
  },
  //点击加减号之后的方法
  addCount: function(e) {
    if (this.data.hasTouched == false) {
      util.hasTouched(500, this)
    let clickProductId = e.currentTarget.dataset.productId, //被点击商品的ID
      count = e.currentTarget.dataset.count, //用来判断是加法还是减法
      productList = this.data.productList, //点击前的商品列表，有0
      pLL = productList.length, //点击前商品列表的length
      param_product_list = [], //结算参数 [{product_id:'1',quantity:'1'}]
      productObj = {};
    console.log('productList', productList)
    for (let i = 0; i < pLL; i++) {
      productObj = { //仓库里所有商品的ID和对应数量
        product_id: productList[i].product_id,
        quantity: productList[i].quantity
      }
      if (productObj.product_id == clickProductId) { //点击商品增减1
        if (count == '1') {
          let tempNum = parseInt(productObj.quantity) + 1;
          productObj.quantity = tempNum.toString()
        } else if (count == '0') {
          let tempNum = parseInt(productObj.quantity) - 1;
          productObj.quantity = tempNum.toString()
        }
      }
      if (productObj.quantity !== '0') { //把不为0的商品ID和数量推入数组
        param_product_list.push(productObj)
      }
    }
    console.log('checkout的参数:', param_product_list)
    let order_info = { //checkout的参数拼装完成
      product_list: param_product_list,
      payment_code_info: app.globalData.payment_code_info
    }
    //发起点击加减号后的checkout请求
    orderHttp.checkoutProductOrder(order_info, (d, status) => {
      if (status) { //如果结算成功，发起查询订单详情请求，用渲染商品数量和总价
        orderHttp.getProductOrderDetail((d) => {
          let cIndex = '', //被点击商品的下标
            dIndex = '', //返回商品的下标
            dProductList = d.product_order_info.order_product_list, //返回商品详情列表
            dLL = d.product_order_info.order_product_list.length, //返回商品详情的length
            newQuantity = ''; //新的商品数量
          for (let i = 0; i < pLL; i++) {
            if (productList[i].product_id == clickProductId) { //获取仓库商品列表被点击ID的下标
              cIndex = i
            }
          }
          if (dLL > 0) { //如果返回的detail有商品内容，对比ID，确定数量
            for (let i = 0; i < dLL; i++) {
              if (dProductList[i].product_id == clickProductId) { //获取订单详情被点击商品的ID的下标
                dIndex = i;
                newQuantity = dProductList[dIndex].quantity;
                break; //如果匹配到ID 结束循环
              } else {
                newQuantity = '0' //如果没有匹配到ID，数量为0
              }
            }
            this.setData({ //
              disabled: false, //如果返回的detail有内容，支付按钮亮
              orderPayBtn: '确认支付'
            })
          } else { //如果返回的detail没有商品内容，对比ID，点击的商品为0,支付按钮灭
            newQuantity = '0'
            this.setData({
              disabled: true, //支付按钮不可用
              orderPayBtn: '请至少选择一份'
            })
          }
          let tempArrayProduct = 'productList[' + cIndex + '].quantity';
          this.setData({
            [tempArrayProduct]: newQuantity,
            totalPrice: d.product_order_info.total
          })
        })
      } else { //checkout错误提示
        wx.showModal({
          title: '提示',
          content: d.status.error_desc,
          showCancel: false
        })
      }
    })
  }else{
    console.log('禁止连续点击')
  }
  },
  //触发下拉刷新的功能
  lower() {
      if (this.data.hasMore == true) { //如果更多订单为1
        if (!this.data.hasTouched) { //如果没有在请求中，发送请求
          util.hasTouched(500, this) //间隔时间内不能再次出发
          let page = this.data.page + 1; //触发一次滑动到底，page页数+1
          orderHttp.getWareHouseProductList(page, (d, p) => { //获取订单列表
            let oProductListLower = d.product_list,
              oPLL = d.product_list.length;
            for (let i = 0; i < oPLL; i++) {
              oProductListLower[i].quantity = '0' //每个仓库商品数量设置为0
            }

            this.setData({
              productList: this.data.productList.concat(oProductListLower), //把新得到的订单推到现有数组里
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

  }
})