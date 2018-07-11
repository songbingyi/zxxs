//index.js
//获取应用实例
let app = getApp();
let util = require('../../utils/util.js');
let memberHttp = require('../../service/member-http.service.js');
let orderHttp = require('../../service/order-http.service.js');
let containerHttp = require('../../service/container-http.service.js');
let baseHttp = require('../../service/base-http.service.js.js');

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
        if (res.authSetting['scope.userInfo']) { //如果已经授权,从后台获取头像信息,设置到view层
          memberHttp.getMemberDetail((d) => {
            this.setData({
              avatarUrl: d.member_info.icon_image.thumb,
              hasUserInfo: true
            })
          })
        } else { //如果没有同意授权,拉起授权按钮
          this.setData({
            hasUserInfo: false
          })
        }
      }
    })
    //测试后端接口
    // wx.request({
    //   url: 'http://218.244.158.175/zxxs_server/api_client/index.php/',
    //   data: {
    //     device_type: '50',
    //     device_version: '1.0',
    //     version_code: '1',
    //     channel: '1001', //20001_website
    //     token: '',
    //     route: 'base/client_config/getClientConfig',
    //     jsonText: {}
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   method: "POST",
    //   success: function (d) {
    //     console.log('Result => 111', JSON.stringify(d.data));

    //   },
    //   fail: function (e) {
    //     console.loh('提示', '请求失败:' + JSON.stringify(e));
    //   }
    // });
  },
  onShow: function() {},
  onReady: function() {
    wx.hideLoading()
  },
  //首页点击扫码
  goAuthorize: function() {
    memberHttp.getMemberAuthInfo((d) => { //从后台获取授权信息
      console.log(d)
      if (d.member_auth_info.member_auth_status) { //如果授权总状态为1，打开相机进行扫描
        wx.scanCode({
          onlyFromCamera: true,
          success: (result) => {
            console.log(result); //打印扫码成功后返回的数据
            var containerNo = '货柜编号';
            orderHttp.addProductOrder(containerNo, (d, status) => { //给后端传递货柜编号，获取订单编号ID，申请开门
              console.log(d, status)
              if (status) { //判断是否开门成功————如果开门
                orderHttp.getContainerDetail(containerNo, (d) => { //获取仓库分类
                  var categoryId = d.container_info.warehouse_info.warehouse_category_info.warehouse_category_id
                  if (categoryId == 1) { //判断仓库类型————如果是普通仓库，跳转order页面
                    wx.navigateTo({
                      url: '../orders/orders'
                    })
                  } else if(categoryId == 2) { //判断仓库类型————如果是重力感应仓库，跳转####页面
                  }
                }) //获取仓库分类结束
              } else {//判断是否开门成功————如果开门失败
                var errorCode = d.status.error_code
                  console.log(errorCode)
                  switch(errorCode){
                    //如果没有餐
                    case '0001':wx.showModal({
                      title: '提示TODO',
                      content: '暂时没有餐TODO',
                      showCancel:false
                    });break;
                    //如果门是开的
                    case '0002': wx.showModal({
                      title: '提示TODO',
                      content: '请关门后再扫码TODO',
                      showCancel: false
                    }); break;
                    default:console.log(123);
                  }
              }
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
        app.globalData.memberAuthStatus = d.member_auth_info; //授权信息传给全局变量，给跳转页面使用
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
        if (d.member_info.icon_image.thumb) {
          this.setData({
            avatarUrl: d.member_info.icon_image.thumb,
          })
        }
      })
      wx.showLoading({
        title: '加载中...',
        duration: 600,
      })
    } else {
      this.setData({
        hasUserInfo: true,
      })
    }
  }
})