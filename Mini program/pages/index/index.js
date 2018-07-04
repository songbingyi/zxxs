//index.js
//获取应用实例
let app = getApp();
let util = require('../../utils/util.js');
let memberHttp = require('../../service/member-http.service.js');
let orderHttp = require('../../service/order-http.service.js');
let containerHttp = require('../../service/container-http.service.js');

Page({
  data: {
    avatarUrl: '',
    hasUserInfo: true,
    indexLogo: "http://218.244.158.175/static/zuoxiang/images/logo_indexbg.png",
  },
  onLoad: function() {
    //判断用户是否已经同意获取头像信息
    wx.getSetting({
      success: (res) => {
        //let userInfo = util.storageMethod.get('userInfo')
        if (res.authSetting['scope.userInfo']) {  //如果已经授权,从后台获取头像信息,设置到view层
          memberHttp.getMemberDetail((d)=>{
            this.setData({
              avatarUrl: d.member_info.icon_image.thumb,
              hasUserInfo: true
            })
          })
          }
         else { //如果没有同意授权,拉起授权按钮
          this.setData({
            hasUserInfo: false
          })
        }
      }
    })
  },
  onShow: function() {
  },
  onReady: function() {
    wx.hideLoading()
  },
  //首页点击扫码
  goAuthorize: function() {
    memberHttp.getMemberAuthInfo((d) => {//从后台获取授权信息
      console.log(d)
      app.globalData.memberAuthStatus = d.member_auth_info;//授权信息传给全局变量，给跳转页面使用
      if (d.member_auth_info.member_auth_status == 1) { //如果授权总状态为1，打开相机进行扫描
        wx.scanCode({
          onlyFromCamera: true,
          success: (result) => { //打印扫码成功后返回的数据
            console.log(result);
            containerHttp.getContainerDetail("container_no",(d)=>{//向后台传递货柜编号,返回仓库类型，判断仓库类型进入不同页面
            //判断货柜分类
            //判断货柜开门状态
            })
            orderHttp.addMemberOrder("container_no",(d)=>{// ((()))待处理 向后台传递货柜编号，开门

            })
          },
          fail: (res) => {
            // wx.navigateTo({
            //   url: '../orders/orders'
            // })
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '请扫描正确的二维码',
              success: function(res) {
                if (res.confirm) {
                  console.log('点击了确定')
                }
              }
            })
          }
        })
      } else { //总授权状态不为1
     
       wx.navigateTo({
         url: '../authorize/authorize'
        })
      }
    })
  },
  goUser: function() {
    wx.navigateTo({
      url: '../user/user'
    })
  },


  agreeGetUser(e) { //点击授权按钮
    if (e.detail.userInfo) { //用户点击同意授权之后，先渲染授权返回的头像，然后从后端拉取头像,点击拒绝后授权弹窗消失
      this.setData({
        hasUserInfo: true,
        avatarUrl: e.detail.userInfo.avatarUrl
      })
      
      memberHttp.getMemberDetail((d) => {
        if (d.member_info.icon_image.thumb){
        this.setData({
          avatarUrl: d.member_info.icon_image.thumb,
        })
        }
      })
      wx.showLoading({
        title: '加载中...',
        duration: 600,
      })
    }else{
      this.setData({
        hasUserInfo: true,
      })
    }
  }
})