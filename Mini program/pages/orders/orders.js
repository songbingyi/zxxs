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
    // wx.showLoading({
    //   title: '载入中',
    // })
    orderHttp.getWareHouseProductList(1, (d, p) => { //首次载入，查询仓库商品列表,请求第一页数据;p:分页信息
      //拼装首次载入的订单结算参数，第一个商品的数量改为1
      //let productList = d.product_list,

      //this.setData({//把仓库商品列表渲染到V层,此时商品数量都为0
      let productList = d.product_list;
      console.log("1", productList)
      for (let i = 0; i < productList.length; i++) {
        productList[i].quantity = '0'
      }


      //  })
      let oProductInfo = { //设置第一个商品的ID和数量，数量为1
        product_id: productList[0].product_id,
        //product_id: '1',
        quantity: '1'
      }
      let order_info = { //拼装商结算的参数
        product_list: [oProductInfo],
        payment_code_info: app.globalData.payment_code_info
      }
      console.log("order_info",order_info)
      orderHttp.checkoutProductOrder(order_info, (d, status) => {
      })
      // orderHttp.checkoutProductOrder(order_info, (d, status) => { //把仓库商品列表的内容第一个商品数量设置为1，进行商品结算
      //   // orderHttp.getProductOrderDetail((d) => { //向后端查询订单详情
      //   //   let changedProduct = d.product_order_info.order_product_list; //服务器传回来的商品订单详情

      //   //   console.log("111", productList)
      //   //   console.log('changedProduct:', changedProduct)
      //   //   for (let i = 0; i < productList.length; i++) { //更新对比服务器传回来的订单详情
      //   //     if (productList[i].product_id == changedProduct[0].product_id) {
      //   //       productList[i].quantity = changedProduct[0].quantity
      //   //     }
      //   //   }
      //   //   this.setData({
      //   //     productList: productList, //V层渲染第一个商品数量为1的商品列表
      //   //     totalPrice: d.product_order_info.total
      //   //   })
      //   //   wx.hideLoading()
      //   // })
      // })
    })
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
          'success': function(res) {},
          'fail': function(res) {},
          'complete': function(res) {}
        })
    })
    //支付结束
  },
  //点击加减号之后的方法
  addCount: function(e) {
    let productId = e.currentTarget.dataset.productId,
      count = e.currentTarget.dataset.count; //用来判断是加法还是减法
    orderHttp.getProductOrderDetail((d) => { //查询订单详情
      //拼装订单结算参数
      let productList = d.product_order_info.order_product_list,
        pLL = productList.length;
      for (let i = 0; i < pLL; i++) {
        if (productList[i].product_id == productId) { //如果点击商品的ID和订单详情里有ID相同
          if (count == '1') {
            productList[i].quantity++
          } else if (count == '0') {
            productList[i].quantity--
          }
        } else {
          productList.push({
            product_id: productId,
            quantity: '1'
          })
        }
      }
      var order_info = {
        product_list: productList,
        payment_code_info: app.globalData.payment_code_info
      }

      console.log(order_info)
      orderHttp.checkoutProductOrder(order_info, (d, status) => { //发起订单结算，选中商品quantity+-1
        if (status) {
          orderHttp.getProductOrderDetail((d) => { //结算完成后发起订单详情查询
            let vProductList = this.data.productList, //V层的数组
              sProductList = d.product_order_info.order_product_list //后端返回的订单详情数组
            for (let i = 0; i < vProductList.length; i++) {
              let vId = vProductList[i].product_id;
              for (let j = 0; j < sProductList.length; j++) {
                if (vId == sProductList[j].product_id) {
                  vProductList[i].quantity = sProductList[j].quantity
                }
              }
            }
            this.setData({ //设置新的商品列表到页面
              productList: vProductList, //商品名称和商品单价和商品数量
              totalPrice: d.product_order_info.total //应支付总价
            })
          })
        } else {
          wx.showModal({
            title: '提示',
            content: d.status.error_desc,
            showCancel: false
          })
        }
      })


    
    }) //查询订单详情结束

  
  },

  // minusCount(e) { //点击减号
  //   const index = e.currentTarget.dataset.index;
  //   let productList = this.data.productList;
  //   //初始化list里的num总数
  //   let totalNum = 0;

  //   //选择数量num减少1，并传回data
  //   productList[index].defNum = productList[index].defNum - 1;
  //   this.setData({
  //     productList: productList
  //   });

  //   //获取list里的num总数
  //   for (var i = 0; i < productList.length; i++) {
  //     totalNum = productList[i].defNum + totalNum
  //   }
  //   //如果总数为0，按钮disabled
  //   if (totalNum == 0) {
  //     this.setData({
  //       disabled: true,
  //       orderPayBtn: '请至少选择一份'
  //     })
  //   }

  //   //this.checkoutProductOrder();
  //   this.getTotalPrice() //获取应显示的总价
  // },
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