const orderHttp = require('../service/order-http.service.js')

let wxPay = (successCallback,failCallback) => {
  orderHttp.payProductOrder((d) => { //向后端请求支付所需参数
    let paymentParam = JSON.parse(d.payment_order_info.payment_order_param);
    console.log('payProductOrder回调：支付参数：', paymentParam)
    wx.requestPayment( //向微信发起支付求情
      {
        'timeStamp': paymentParam.timeStamp,
        'nonceStr': paymentParam.nonceStr,
        'package': paymentParam.package,
        'signType': paymentParam.signType,
        'paySign': paymentParam.paySign,
        'success': successCallback,
        'fail': failCallback,
        'complete': function(res) {
        }
      })

  })
}
module.exports = wxPay