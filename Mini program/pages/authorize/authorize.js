// pages/authorize/authorize.js
let app = getApp()
let memberHttp = require('../../service/member-http.service.js');
let util = require('../../utils/util.js');
Page({
  data: {
    phoneNumberBtnDisabled: false,
    extraData:{},
    authorizeStatus:'授权登录',
  },
  onLoad:function(){
    let authstatus = app.globalData.memberAuthStatus//从全局变量里获取授权信息
    console.log(authstatus.member_mobile_auth_status == "0")//判断按钮值真假TODO
    this.setData({
      phoneNumberBtnDisabled:authstatus.member_mobile_auth_status == "1"?true:false//决定按钮的激活和关闭
    })
  },
  //电话信息授权登录按钮功能:
  getPhoneNumberAuth: function(res) {
    if (res.detail.iv) {//如果用户点击确定，给后台传递电话加密信息
      let submitInfo = {
        iv:res.detail.iv,
        encrypted_data: res.detail.encryptedData
        }//拼接电话加密信息作为参数
      memberHttp.getPhoneNumber(submitInfo,()=>{//电话加密信息传给后端
        memberHttp.getMemberDetail((d) => {//从后端获取电话号码，设置到视图层
          util.storageMethod.set('userPhoneNum', d.member_info.mobile) //电话号码存储到缓存
        })
      })
      this.setData({
       
        phoneNumberBtnDisabled: true, //1号按钮变暗，2号按钮变亮
        authorizeStatus:'  已授权  ' //1号按钮文字改变
      })
    }
  }, 

  //免密支付 TODO
  getContractData: () => {
    memberHttp.submitDeductContract(//获取免密支付参数
      (d)=> {
          this.setData({
            extraData: d.deduct_contract_order_info.deduct_contract_order_param//将参数传递给免密支付请求
          })
      }
    )
  }

})