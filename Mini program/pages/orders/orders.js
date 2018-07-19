// page/component/new-pages/cart/cart.js
let app = getApp()
let orderHttp = require('../../service/order-http.service.js')
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
    //获取仓库商品列表
    wx.showLoading({
      title: '载入中',
    })
    orderHttp.getWareHouseProductList(1, (d, p) => { //首次载入，请求第一页数据;p:分页信息
      //   var productList = d.product_list,
      //     pLL = productList.length;
      //   for (let i = 0; i < pLL; i++) { //设置每个商品对象的初始数量设置为0
      //     productList[i].defNum = 0
      //   }
      //   productList[0].defNum = 1; //设置第一个商品的初始化数量为1；
      //   console.log(productList)
      //   this.setData({
      //     productList: productList,
      //     totalPrice: productList[0].price //设置首次载入的应支付为第一个商品的单价。
      //   })
      //拼装首次载入的订单结算参数，第一个商品的数量改为1
      let productList = d.product_list,
        product_list = [],
        pLL = productList.length;
      for (let i = 0; i < pLL; i++) { //把货柜详情的商品ID和商品数量推入新数组 
        let oProductInfo = {
          product_id: productList[i].product_id,
          quantity: 0
        }
        product_list.push(oProductInfo)
      }
      let order_info = {
        product_list: product_list,
        payment_code_info: app.globalData.payment_code_info
      }
      order_info.product_list[0].quantity = 1 //设置第一个商品的数量为1
      orderHttp.checkoutProductOrder(order_info, (d) => { //发起订单结算
        console.log(d)
        orderHttp.getProductOrderDetail((d) => { //向后端查询订单详情
          this.setData({
            productList: d.product_order_info.order_product_list, //V层渲染第一个商品数量为1的商品列表
            totalPrice: d.product_order_info.total
          })
          wx.hideLoading()
        })
      })
    })
  },

  //点击支付按钮后发起支付行为
  clickPayBtn() {
    //拼装结算接口入参product_list
    let productList = this.data.productList,
      product_list = [],
      pLL = productList.length;
    for (let i = 0; i < pLL; i++) { //把product_id和quantity推入数组
      let oProductInfo = {
        product_id: productList[i].product_id,
        quantity: productList[i].quantity
      }
      product_list.push(oProductInfo)
    }
    let order_info = {
      product_list: product_list,
      payment_code_info: app.globalData.payment_code_info
    }

    //发起支付

    orderHttp.payProductOrder((d) => { //向后端请求支付所需参数
      console.log(d)
      let paymentParam = JSON.parse(d.payment_order_info.payment_order_param);
      console.log(paymentParam)
      wx.requestPayment( //向微信发起支付求情
        {
          'timeStamp': paymentParam.timeStamp,
          'nonceStr': paymentParam.nonceStr,
          'package': paymentParam.package,
          'signType': paymentParam.signType,
          'paySign': paymentParam.paySign,
          'success': function(res) {},
          'fail': function(res) {},
          'complete': function(res) {}
        })
    })
    //支付结束
  },

  addCount: function(e) { //点击加号
    let productId = e.currentTarget.dataset.productId;
    orderHttp.getProductOrderDetail((d)=>{//查询订单详情
      console.log(d)
      //拼装订单结算参数
      let productList = d.product_order_info.order_product_list,
        product_list = [],
        pLL = productList.length;
      for (let i = 0; i < pLL; i++) { //把货柜详情的商品ID和商品数量推入新数组 
        let oProductInfo = {
          product_id: productList[i].product_id,
          quantity: productList[i].quantity
        }
       // console.log(productList[i].product_id, productId)
        if (productList[i].product_id == productId){//被点击的商品数量加1
          //productList[i].quantity++;
          productList[i].quantity = 5
        }
        console.log(productList[i])
        product_list.push(oProductInfo)
      }
      let order_info = {
        product_list: product_list,
        payment_code_info: app.globalData.payment_code_info
      };

      orderHttp.checkoutProductOrder(order_info, (d) => {//发起订单结算，选中商品quantity增加1
       // console.log(d)
      })
    })//向后端查询订单详情




    // let productList = this.data.productList;
    // let defNum = productList[index].defNum; //获取当前点击商品的数量值
    // if (defNum >= productList[index].quantity) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '没有那么多库存，不能再添加啦',
    //     showCancel: false
    //   })
    //   return false;
    // }
    // defNum = defNum + 1;
    // if (this.data.disabled) { //只要点击加号，如果支付按钮是disabled:true状态，则改为disabled:false
    //   this.setData({
    //     disabled: false,
    //     orderPayBtn: '确认支付'
    //   })
    // }
    // productList[index].defNum = defNum;
    // this.setData({
    //   productList: productList
    // });
    // this.getTotalPrice() //获取显示的总价
  },

  minusCount(e) { //点击减号
    const index = e.currentTarget.dataset.index;
    let productList = this.data.productList;
    //初始化list里的num总数
    let totalNum = 0;

    //选择数量num减少1，并传回data
    productList[index].defNum = productList[index].defNum - 1;
    this.setData({
      productList: productList
    });

    //获取list里的num总数
    for (var i = 0; i < productList.length; i++) {
      totalNum = productList[i].defNum + totalNum
    }
    //如果总数为0，按钮disabled
    if (totalNum == 0) {
      this.setData({
        disabled: true,
        orderPayBtn: '请至少选择一份'
      })
    }

    //this.checkoutProductOrder();
    this.getTotalPrice() //获取应显示的总价
  },
  //订单结算
  // checkoutProductOrder() { //拼装order_info参数，发送后端，获得结算结果，不包括支付
  //   let productList = this.data.productList,
  //     product_list = [],
  //     pLL = productList.length;
  //   for (let i = 0; i < pLL; i++) { //把product_id和quantity推入数组
  //     let oProductInfo = {
  //       product_id: productList[i].product_id,
  //       quantity: productList[i].defNum
  //     }
  //     product_list.push(oProductInfo)
  //   }
  //   let order_info = {
  //     product_list: product_list,
  //     payment_code_info: app.globalData.payment_code_info
  //   }
  //   orderHttp.checkoutProductOrder(order_info, (d) => { //
  //     console.log(d)
  //     if (d.product_order_info.total) {
  //       this.setData({
  //         totalPrice: d.product_order_info.total
  //       })
  //     }
  //   })
  // },

  //获取当前总价
  //   getTotalPrice() { //计算应支付总价，只显示，不发送后端
  //     let productList = this.data.productList;
  //     let total = 0;
  //     for (let i = 0; i < productList.length; i++) {
  //       total += productList[i].defNum * productList[i].price;
  //     }
  //     this.setData({
  //       productList: productList,
  //       totalPrice: total.toFixed(2)
  //     });
  //   },

})