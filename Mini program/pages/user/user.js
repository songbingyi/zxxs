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
      success: (res)=> {//缓存里有电话号码
        this.setData({
          phoneNumber: res.data
        })
      },
      fail: ()=>{//如果缓存没有电话号码
        memberHttp.getMemberAuthInfo((d) => {//询问后台是否授权

          if (d.member_auth_info.member_mobile_auth_status) {//如果已经授权，从后台拉取电话号码并显示
            memberHttp.getMemberDetail((e) => {
              let phoneNumber = util.phoneNumSub(e.member_info.mobile)//将电话号码中间五位加密
              this.setData({
                phoneNumber: phoneNumber
              })
              util.storageMethod.set('phoneNumber', phoneNumber)
            })
          } else {//如果没有授权,头像下的文字显示请登录，并且可以点击登录
            this.setData({
              phoneNumber: ''
            })
            util.storageMethod.getSync('userPhoneNum', '')
          }
        })
      }
    })
    wx.getSetting({//载入时在前端进行userInfo鉴权
      success: (res)=>{
        if (res.authSetting['scope.userInfo']){//如果头像同意过授权，从后端获取用头像url
          memberHttp.getMemberDetail( (d)=>{
            this.setData({
              userInfo:d.member_info,
              hasIconImage:true
            })
            app.globalData.avatarUrl = d.member_info.icon_image.thumb //把更新后的头像传给全局变量
          })
        }else{//如果没有userinfo授权,头像显示默认头像，默认头像可以通过点击发起授权界面
        }
      }
    })
    //载入时从后端进行电话号码鉴权


   
  },
  openAuthPage(){//拉起头像授权界面
    this.setData({
      hasUserInfo: true,
    })
  },
  agreeGetUser(e) { //点击头像授权按钮
    if (e.detail.userInfo) { //用户点击同意授权,从后端获取memberInfo，设置到视图层

      var submitInfo = {//拼接userInfo请求参数
        iv: e.detail.iv,
        encrypted_data: e.detail.encryptedData,
        signature: e.detail.rawData,
        raw_data: e.detail.rawData
      }
      memberHttp.setWechatMiniProgramMemberInfo(submitInfo, () => {//将userinfo加密信息发给后端以解密
        memberHttp.getMemberDetail((d) => {//从后端获取userinfo

          this.setData({
            userInfo: d.member_info,
            hasUserInfo: false,
            hasIconImage: true,
          })
          app.globalData.avatarUrl = d.member_info.icon_image.thumb //把更新后的头像传给全局变量
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
  
    console.log("电话号码解密信息",res)
    if(res.detail.iv){//如果用户点击同意授权电话信息
    wx.showLoading({
      title: '加载中...',
    })
      let submitInfo = {
        iv: res.detail.iv,
        encrypted_data: res.detail.encryptedData
      }//拼接电话加密信息参数
      memberHttp.setPhoneNumber(submitInfo, () => {//把返回的电话加密信息传给后端
        memberHttp.getMemberDetail((d)=>{//从后端获取解密后的电话号码，设置到视图层
          let phoneNumber = util.phoneNumSub(d.member_info.mobile)//将电话号码中间五位加密
            this.setData({
              phoneNumber: phoneNumber
            })
            util.storageMethod.set('userPhoneNum', phoneNumber)//把电话号码存到缓存中

          }
        )
        wx.hideLoading()
      })
    }
  }
})