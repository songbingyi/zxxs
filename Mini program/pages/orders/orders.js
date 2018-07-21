// page/component/new-pages/cart/cart.js
let app = getApp()
let orderHttp = require('../../service/order-http.service.js')
let memberHttp = require('../../service/member-http.service.js')
let baseHttp = require('../../service/base-http.service.js.js');
Page({
  data: {
    productList: [],
    minusNum: false,
    totalPrice: 0,
    disabled: false,
    orderPayBtn: '确认支付'
  },

  //onReady navigate返回后可以继续保持数据 TODO 应该不存在返回状态 暂时改为lunch
  onLoad() {
    wx.showLoading({
      title: '载入中',
    })
    orderHttp.getWareHouseProductList(1, (d, p) => { //首次载入，查询仓库商品列表,请求第一页数据;p:分页信息
      //获取仓库列表返回的商品列表

      let productList = d.product_list;
      let plength = productList.length,
        order_info = { //拼装商结算的参数
          product_list: [{
            product_id: productList[0].product_id, //id是第一件商品的ID
            //product_id: '2',
            quantity: '1' //数量为1
          }],
          payment_code_info: app.globalData.payment_code_info
        };
      console.log(app.globalData.payment_code_info)
      for (let i = 0; i < plength; i++) {
        productList[i].quantity = '0' //每个仓库商品数量设置为0
      }
      let numList = [];

      this.setData({
        productList: productList, //设置商品名称
      })

      orderHttp.checkoutProductOrder(order_info, (d, status) => {
        if (status) {
          orderHttp.getProductOrderDetail((d) => {
            let changedProduct = d.product_order_info.order_product_list[0];
            this.setData({
              'productList[0].quantity': changedProduct.quantity,
              totalPrice: d.product_order_info.total
            })
          })
        }
      })
      wx.hideLoading()
    })
    //根据授权状态决定支付方式
  },

  //点击支付按钮后发起支付行为
  clickPayBtn() {
    //拼装结算接口入参product_list
    let productList = this.data.productList,
      product_list = [],
      pLL = productList.length;
    for (let i = 0; i < pLL; i++) { //把product_id和quantity推入数组
      // let oProductInfo = {
      //   product_id: productList[i].product_id,
      //   quantity: productList[i].quantity
      // }
      product_list.push({
        product_id: productList[i].product_id,
        quantity: productList[i].quantity
      })
    }
    let order_info = {
      product_list: product_list,
      payment_code_info: app.globalData.payment_code_info
    }
    memberHttp.getMemberAuthInfo((d) => {//检查支付授权状态
      if (d.member_auth_info.member_deduct_contract_auth_status == '0') {
        //发起支付
        orderHttp.payProductOrder((d) => { //向后端请求支付所需参数
          let paymentParam = JSON.parse(d.payment_order_info.payment_order_param);
          console.log(paymentParam)
          wx.requestPayment( //向微信发起支付求情
            {
              'timeStamp': paymentParam.timeStamp,
              'nonceStr': paymentParam.nonceStr,
              'package': paymentParam.package,
              'signType': paymentParam.signType,
              'paySign': paymentParam.paySign,
              'success': function (res) { 
                console.log('支付成功')
                wx.redirectTo({
                  url: '../index/index'
                })
              },
              'fail': function (res) {
                console.log('支付失败')
                wx.redirectTo({
                  url: '../index/index'
                })
              },
              'complete': function (res) {
                console.log('支付完成')
                wx.redirectTo({
                  url: '../index/index'
                })
              }
            })
        })
    //支付结束
      }
    })

  },
  //点击加减号之后的方法
  addCount: function(e) {
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
    //发起点击加减号后的checkout
    orderHttp.checkoutProductOrder(order_info, (d, status) => {
      if (status) {
        orderHttp.getProductOrderDetail((d) => {
          let cIndex = '',
            dIndex = '',
            dProductList = d.product_order_info.order_product_list,
            dLL = d.product_order_info.order_product_list.length,
            newQuantity = '';
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
              disabled: false //如果返回的detail有内容，支付按钮亮
            })
          } else { //如果返回的detail没有商品内容，对比ID，点击的商品为0,支付按钮灭
            newQuantity = '0'
            this.setData({
              disabled: true
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
  },

})