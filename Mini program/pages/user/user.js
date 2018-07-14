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
      phoneNumber: '02968201798'
    })
  },
  onLoad: function () {
    wx.getStorage({//载入页面前先判断缓存里有没有电话号码，设置到V层
      key: 'userPhoneNum',
      success: (res)=> {
        this.setData({
          phoneNumber: res.data
        })
      },
    // TODO 是否需要考虑缓存里有电话号码，但是没有授权的状况
    })
    wx.getSetting({//载入时在前端进行userInfo鉴权
      success: (res)=>{
        if (res.authSetting['scope.userInfo']){//如果头像同意过授权，从后端获取用头像url
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
    //载入时从后端进行电话号码鉴权
    memberHttp.getMemberAuthInfo((d)=>{
      if (d.member_auth_info.member_mobile_auth_status){//如果已经授权，从后台拉取电话号码并显示
        memberHttp.getMemberDetail((e) => {
          this.setData({
            phoneNumber:e.member_info.mobile
          })
        })
      }else{//如果没有授权,头像下的文字显示请登录
        this.setData({
          phoneNumber: ''
        })
        util.storageMethod.getSync('userPhoneNum','')
      }
    })

   
  },
  openAuthPage(){//拉起头像授权界面
    this.setData({
      hasUserInfo: true,
    })
  },
  agreeGetUser(e) { //点击头像授权按钮
    if (e.detail.userInfo) { //用户点击同意授权,从后端获取memberInfo，设置到视图层
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
  getPhoneNumber(res){
    if(res.detail.iv){//如果用户点击同意授权电话信息
    wx.showLoading({
      title: '加载中...',
    })
      let submitInfo = {
        iv: res.detail.iv,
        encrypted_data: res.detail.encryptedData
      }//拼接电话加密信息参数
      memberHttp.getPhoneNumber(submitInfo, () => {//把返回的电话加密信息传给后端
        memberHttp.getMemberDetail((d)=>{//从后端获取解密后的电话号码，设置到视图层
            this.setData({
              phoneNumber:d.member_info.mobile
            })
            util.storageMethod.set('userPhoneNum',d.member_info.mobile)//把电话号码存到缓存中
 
          }
        )
        wx.hideLoading()
      })
    }
  }
})