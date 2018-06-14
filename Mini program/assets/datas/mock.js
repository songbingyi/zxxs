module.exports = {
  carts: [
    { id: 1, title: '精品午间套餐', num: 0, price: 15.00.toFixed(2), max: 10 },
    { id: 2, title: '驴肉火烧', num: 0, price: 15.00.toFixed(2), max: 2 },
    { id: 3, title: '小卖店', num: 0, price: 15.00.toFixed(2), max: 4 },
    { id: 4, title: '三秦套餐', num: 0, price: 15.00.toFixed(2), max: 7 },
  ],
  orderListPage1:[
    {
      orderNum: '12345678901234567890',
      orderTime: '2018-05-20 20:20:20',
      orderCarts: [
        { id: 1, title: '小卖店', num: 1, price: 1500.00.toFixed(2) },
        { id: 2, title: '三秦套餐三秦套餐三秦套餐三秦套餐三秦套餐三秦套餐', num: 300, price: 15000.00.toFixed(2) },
        { id: 3, title: '小卖店', num: 40, price: 45.00.toFixed(2) },
      ],
      orderStatus: '订单完成',
      orderTotalNum: 15,
      orderTotalPrice: 600.00.toFixed(2)
    },
    {
      orderNum: 22222222,
      orderTime: '2018-06 - 20 20:20',
      orderCarts: [
        { id: 1, title: '驴肉火烧', num: 1, price: 15.00.toFixed(2) },
        { id: 2, title: '驴肉火烧', num: 1, price: 15.00.toFixed(2) },
      ],
      orderStatus: '订单完成',
      orderTotalNum: 2,
      orderTotalPrice: 1.00.toFixed(2)
    },
    {
      orderNum: 3333333333,
      orderTime: '2018-06 - 20 20:20',
      orderCarts: [
        { id: 1, title: '驴肉火烧', num: 1, price: 15.00.toFixed(2) },
      ],
      orderStatus: '订单完成',
      orderTotalNum: 2,
      orderTotalPrice: 10
    },
    {
      orderNum: 4444444444,
      orderTime: '2018-06 - 20 20:20',
      orderCarts: [
        { id: 1, title: '驴肉火烧', num: 1, price: 15.00.toFixed(2) },
      ],
      orderStatus: '订单完成',
      orderTotalNum: 2,
      orderTotalPrice: 10
    },

   
  ],

  orderListPage2: [
    {
      orderNum: '12345678901234567890',
      orderTime: '2018-05-20 20:20:20',
      orderCarts: [
        { id: 1, title: '我是page2', num: 1, price: 1500.00.toFixed(2) },
        { id: 2, title: '三秦套餐三秦套餐三秦套餐三秦套餐三秦套餐三秦套餐', num: 300, price: 15000.00.toFixed(2) },
        { id: 3, title: '小卖店', num: 40, price: 45.00.toFixed(2) },
      ],
      orderStatus: '订单完成',
      orderTotalNum: 15,
      orderTotalPrice: 600.00.toFixed(2)
    },
    {
      orderNum: 22222222,
      orderTime: '2018-06 - 20 20:20',
      orderCarts: [
        { id: 1, title: '我是page2', num: 1, price: 15.00.toFixed(2) },
        { id: 2, title: '驴肉火烧', num: 1, price: 15.00.toFixed(2) },
      ],
      orderStatus: '订单完成',
      orderTotalNum: 2,
      orderTotalPrice: 1.00.toFixed(2)
    },
    {
      orderNum: 3333333333,
      orderTime: '2018-06 - 20 20:20',
      orderCarts: [
        { id: 1, title: '我是page2', num: 1, price: 15.00.toFixed(2) },
      ],
      orderStatus: '订单完成',
      orderTotalNum: 2,
      orderTotalPrice: 10
    },
  ]
}