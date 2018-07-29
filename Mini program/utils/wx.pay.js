const orderHttp = require('../service/order-http.service.js')

let wxPay = (failCallback) => {
    orderHttp.payProductOrder((d) => { //向后端请求支付所需参数
        let paymentParam = JSON.parse(d.payment_order_info.payment_order_param);
        wx.requestPayment( //向微信发起支付求情
            {
                'timeStamp': paymentParam.timeStamp,
                'nonceStr': paymentParam.nonceStr,
                'package': paymentParam.package,
                'signType': paymentParam.signType,
                'paySign': paymentParam.paySign,
                'success': () => {
                    wx.showToast({
                        title: '支付成功',
                        icon: 'success',
                        duration: 2000
                    })
                    orderHttp.getProductOrderDetail((d) => { //支付成功后，用户点击确认按钮时，询问后台订单状态，如果该订单是已付款，跳转notice/order-success页面
                        if (d.product_order_info.product_order_status_info.product_order_status_id == '2001') {
            
                            wx.reLaunch({
                                url: '/pages/notice/order-success/order-success',
                            })
                        }

                    })
                },
                'fail': failCallback,
                'complete': function(res) {}
            })

    })
}
module.exports = wxPay