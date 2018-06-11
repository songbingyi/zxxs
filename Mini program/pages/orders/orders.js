// page/component/new-pages/cart/cart.js
Page({
  data: {
    carts: [],
    minusNum: false,
    totalPrice: 0,
  },
  onShow() {
    this.setData({
      carts: [
        { id: 1, title: '精品午间套餐', num: 1, price: 15.00.toFixed(2), max: 10}
      ],
    });
    this.getTotalPrice();
  },

  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    let max = carts[index].max;
    if (num >= max) {
      return false;
    }
    num = num + 1;
    if (num >= 2) {
      this.setData({
        minusNum: true
      });
    }
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    if (num <= 1) {
      this.setData({
        minusNum: false
      });
    }
    carts[index].num = num;
    this.setData({
      carts: carts
    });
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
  }

})