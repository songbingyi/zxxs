module.exports = {
  carts: [
    { id: 1, title: '精品午间套餐', num: 0, price: 15.00.toFixed(2), max: 10 },
    { id: 2, title: '驴肉火烧', num: 0, price: 15.00.toFixed(2), max: 2 },
    { id: 3, title: '小卖店', num: 0, price: 15.00.toFixed(2), max: 4 },
    { id: 4, title: '三秦套餐', num: 0, price: 15.00.toFixed(2), max: 7 },
  ],
  orderList:[
    {
      orderNum: 11111111111111,
      orderTime: '2018-05 - 20 20:20',
      orderCarts: [
        { id: 1, title: '小卖店', num: 1, price: 15.00.toFixed(2) },
        { id: 2, title: '三秦套餐三秦套餐', num: 3, price: 15.00.toFixed(2) },
        { id: 3, title: '小卖店', num: 4, price: 45.00.toFixed(2) },
        { id: 4, title: '三秦套餐', num: 5, price: 15.00.toFixed(2) },
        { id: 5, title: '小卖店', num: 1, price: 15.00.toFixed(2) }
      ],
      orderStatus: '订单完成',
      orderTotalNum: 15,
      orderTotalPrice: 60
    },
    {
      orderNum: 22221111111111,
      orderTime: '2018-06 - 20 20:20',
      orderCarts: [
        { id: 1, title: '驴肉火烧', num: 1, price: 15.00.toFixed(2) },
        { id: 2, title: '三秦套餐', num: 1, price: 15.00.toFixed(2) },
        { id: 5, title: '小卖店', num: 3, price: 15.00.toFixed(2) },
        { id: 5, title: '小卖店', num: 3, price: 15.00.toFixed(2) }
      ],
      orderStatus: '订单完成',
      orderTotalNum: 2,
      orderTotalPrice: 10
    },
    {
      orderNum: 22221111111111,
      orderTime: '2018-06 - 20 20:20',
      orderCarts: [
        { id: 1, title: '驴肉火烧', num: 1, price: 15.00.toFixed(2) },
        { id: 2, title: '三秦套餐', num: 1, price: 15.00.toFixed(2) },
        { id: 5, title: '小卖店', num: 3, price: 15.00.toFixed(2) },
        { id: 5, title: '小卖店', num: 3, price: 15.00.toFixed(2) }
      ],
      orderStatus: '订单完成',
      orderTotalNum: 2,
      orderTotalPrice: 10
    },
  ]
}