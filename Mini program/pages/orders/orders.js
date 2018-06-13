// page/component/new-pages/cart/cart.js
const app = getApp()
var datas = require('../../assets/datas/mock.js')
Page({
  data: {
    carts: [],
    minusNum: false,
    totalPrice: 0,
    disabled:false,
    orderPayBtn:'确认支付'
  },
  
  //onReady navigate返回后可以继续保持数据
  onReady() {
    var data = datas.carts
    data[0].num = 1
    this.setData({
      carts: data
    });
    this.getTotalPrice();
  },

  addCount:function(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    let max = carts[index].max;
    if (num >= max) {
      wx.showModal({
        title: '提示',
        content: '没有那么多库存，不能再添加啦',
        showCancel: false
      })
      return false;
    }
    num = num + 1;
    if (this.data.disabled){
      this.setData({
        disabled: false,
        orderPayBtn: '确认支付'
      })
    }
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;

    //获取当前点击按钮的数量
    let num = carts[index].num;

     //初始化list里的num总数
    let totalNum = 0;   

    //选择数量num减少1，并传回data
    carts[index].num = num -1;
    this.setData({
      carts: carts
    });

    //获取list里的num总数
    for (var i = 0; i < carts.length; i++) {
      totalNum = carts[i].num + totalNum
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
    let carts = this.data.carts;
    let total = 0;
    for (let i = 0; i < carts.length; i++) {
      total += carts[i].num * carts[i].price;
    }
    this.setData({
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  
  //点击支付按钮后发起支付行为
  goOrder(){
    app.globalData.orderList = this.data.carts
    wx.navigateTo({
      url: '/pages/user/orderlist/orderlist',
    })
  }

})