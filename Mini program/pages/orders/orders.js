// page/component/new-pages/cart/cart.js
const app = getApp()
const orderHttp = require('../../service/order-http.service.js')
Page({
  data: {
    productList: [],
    minusNum: false,
    totalPrice: 0,
    disabled:false,
    orderPayBtn:'确认支付'
  },
  
  //onReady navigate返回后可以继续保持数据
  onReady() {
    //
    orderHttp.getWareHouseProductList(1,(d,p) => {//首次载入，请求第一页数据;p:分页信息
      var productList = d.product_list,
      pLL = productList.length;
      for (let i = 0; i < pLL;i++){//设置每个商品对象的初始数量设置为0
        productList[i].defNum = 0
      }
      productList[0].defNum = 1;//设置第一个商品的初始化数量为1；
      console.log(productList)
      this.setData({
        productList: productList
      })
    })
  },

  addCount:function(e) {
    const index = e.currentTarget.dataset.index;
    let productList = this.data.productList;
    let defNum = productList[index].defNum;
    let quantity = productList[index].quantity;
    if (defNum >= quantity) {
      wx.showModal({
        title: '提示',
        content: '没有那么多库存，不能再添加啦',
        showCancel: false
      })
      return false;
    }
    defNum = defNum + 1;
    if (this.data.disabled){
      this.setData({
        disabled: false,
        orderPayBtn: '确认支付'
      })
    }
    productList[index].defNum = defNum;
    this.setData({
      productList: productList
    });
    this.getTotalPrice();
  },

  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let productList = this.data.productList;

    //获取当前点击按钮的数量
    let defNum = productList[index].defNum;

     //初始化list里的num总数
    let totalNum = 0;   

    //选择数量num减少1，并传回data
    productList[index].defNum = defNum -1;
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

    this.getTotalPrice();
  },

  getTotalPrice() {
    let productList = this.data.productList;
    let total = 0;
    for (let i = 0; i < productList.length; i++) {
      total += productList[i].defNum * productList[i].price;
    }
    this.setData({
      productList: productList,
      totalPrice: total.toFixed(2)
    });
  },
  
  //点击支付按钮后发起支付行为
  goOrder(){
    console.log(this.data.productList)
    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success': function (res) {
      },
      'fail': function (res) {
      }
    })
  }

})