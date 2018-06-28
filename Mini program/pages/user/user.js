// pages/user/user.js
let app = getApp()
let memberHttp = require('../../service/member-http.service.js')
let util = require('../../utils/util.js')
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    hasIconImage:false,
    phoneNumber:''
  },
  makePhoneCall: function () {
    wx.makePhoneCall({
      // phoneNumber: '02968201798'
      phoneNumber: '02968201798'
    })
  },
  onLoad: function () {
    wx.getSetting({//载入时进行userInfo鉴权
      success: (res)=>{
        if (res.authSetting['scope.userInfo']){//如果头像同意过授权，从接口获取用头像url
          memberHttp.getMemberDetail( (d)=>{
            this.setData({
              userInfo:d.member_info,
              hasIconImage:true
            })
          })
        }else{//如果没有userinfo授权,头像显示默认头像
        }
      }
    })
    //载入时进行电话号码鉴权
    memberHttp.getMemberAuthInfo((d)=>{
      if (d.member_auth_info.member_mobile_auth_status){//如果已经授权，从后台拉取电话号码并显示
        memberHttp.getMemberDetail((e) => {
          this.setData({
            phoneNumber:e.member_info.mobile
          })
        })
      }else{//如果没有授权,显示请登录
        
      }
    })

   
  },
  openAuthPage(){//拉起头像授权界面
    this.setData({
      hasUserInfo: true,
    })
  },
  agreeGetUser(e) { //点击授权按钮
    if (e.detail.userInfo) { //用户点击同意授权,从后端拉取memberInfo，渲染V层
      memberHttp.getMemberDetail((d) => {
        this.setData({
          userInfo: d.member_info,
          hasUserInfo: false,
          hasIconImage:true
        })
      })
      wx.showLoading({
        title: '加载中...',
        duration: 600,
      })
    } else {//用户点击拒绝，授权按钮消失，仍然显示默认头像
      this.setData({
        hasUserInfo: false,
      })
    }
  },
  getPhoneNumber(e){
    if(e.detail.iv){
      memberHttp.getMemberDetail((d)=>{
        this.setData({
          phoneNumber: d.member_info.mobile
        })
      })

    }
  }
})