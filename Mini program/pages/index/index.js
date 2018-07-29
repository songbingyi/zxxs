//index.js
//获取应用实例
const app = getApp();
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
    albumDisabled: true,
    bindDisabled: false
  },
  onLoad: function() {
    //判断用户是否已经同意获取头像信息
    let that = this;
    wx.getSetting({
      success: (res) => {
        //let userInfo = util.storageMethod.get('userInfo')
        if (res.authSetting['scope.userInfo']) { //如果已经授权,从微信获取加密信息,发送给后端
          wx.getUserInfo({
            success: (e) => {
              let submitInfo = {
                iv: e.iv,
                encrypted_data: e.encryptedData,
                signature: e.rawData,
                raw_data: e.rawData
              }

              //测试开始

              if (app.globalData.requestOK == true) {
                console.log('requestOK == true，直接发起请求')
                memberHttp.setWechatMiniProgramMemberInfo(submitInfo, () => { //加密信息发给后端
                  memberHttp.getMemberDetail((d) => { //从后端获取头像
                    that.setData({
                      avatarUrl: d.member_info.icon_image.thumb,
                    })
                  })
                })
              } else { //如果缓存没有member_id，在APP里注册函数，等待APP执行
                console.log('equestOK == false，注册APP函数')
                app.syncallback = () => {
                  memberHttp.setWechatMiniProgramMemberInfo(submitInfo, () => { //加密信息发给后端
                    memberHttp.getMemberDetail((d) => { //从后端获取头像
                      this.setData({
                        avatarUrl: d.member_info.icon_image.thumb,
                      })
                    })
                  })
                }

              }

              //测试结束

              // wx.getStorage({
              //   key: 'member_id',
              //   success: function(res) {
              //     console.log('已经存在member_id，直接发起请求')
              //     memberHttp.setWechatMiniProgramMemberInfo(submitInfo, () => { //加密信息发给后端
              //       memberHttp.getMemberDetail((d) => { //从后端获取头像
              //         that.setData({
              //           avatarUrl: d.member_info.icon_image.thumb,
              //         })
              //       })
              //     })
              //   },
              //   fail: () => {//如果缓存没有member_id，在APP里注册函数，等待APP执行
              //     app.syncallback = () => {
              //       memberHttp.setWechatMiniProgramMemberInfo(submitInfo, () => { //加密信息发给后端
              //         memberHttp.getMemberDetail((d) => { //从后端获取头像
              //           this.setData({
              //             avatarUrl: d.member_info.icon_image.thumb,
              //           })
              //         })
              //       })
              //     }
              //     console.log('不存在member_id，回调发起请求')
              //   }
              // })
            }
          })

          // memberHttp.getMemberDetail((d) => {
          //   console.log('外部调用')
          //   this.setData({
          //     avatarUrl: d.member_info.icon_image.thumb,
          //     hasUserInfo: true
          //   })
          // })
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
    //     token: '8342be59ec4e97a887adaeb472b5356c',
    //     route: 'order/product_order/addProductOrder',
    //     jsonText: JSON.stringify(
    //       {
    //       member_id:"1",
    //       container_no:"CB7IIRVPT"}
    //     )
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
    //测试后端接口结束

    //请求base类接口
    // baseHttp.getWarehouseCategoryList((d) => {
    // })
    baseHttp.getPaymentCodeList((d) => {
      this.setData({
        payment_code_list: d.payment_code_list
      })
    })
    baseHttp.getProductOrderStatusList((d) => {
    })
    //请求base类接口结束

  },
  onShow: function() { //从其他界面返回index界面时，检测如果全局变量里有头像信息，并且this.data没有头像信息，就从全局变量里更新头像
    if (app.globalData.avatarUrl && this.data.avatarUrl == '') {
      this.setData({
        avatarUrl: app.globalData.avatarUrl
      })
      console.log('从全局变量获取头像')
      console.log(app.globalData.avatarUrl)
    }
  },
  onReady: function() {
    wx.hideLoading()
    //测试--获取货柜详情
    // containerHttp.getContainerDetail('CB7IIRVPT', (d) => { //获取仓库分类
    // console.log(d)

    // }) 
    //测试--获取货柜详情结束

  },
  //首页点击扫码
  goAuthorize: function() {
    memberHttp.getMemberAuthInfo((d) => { //从后台获取授权信息
      //模拟电商流程开始
      wx.showLoading({
        title: '开门中',
      })
      if (d.member_auth_info.member_auth_status === "1") { //如果授权总状态为1，进入结算页面
        if (d.member_auth_info.member_deduct_contract_auth_status == '0') { //如果没有签约代扣，支付方式全局变量设置为微信支付
          app.globalData.payment_code_info = this.data.payment_code_list[0]
        }
          var containerNo = 'CH8NMWNW4'; //保存货柜编号 TODO：后期改为硬件动态获取
        orderHttp.addProductOrder(containerNo, (d, status) => { //给后端传递货柜编号，获取订单编号ID，申请开门

          if (status) { //判断是否开门成功————如果开门

            util.storageMethod.set('productOrderId', d.product_order_id) //订单编号ID存到缓存
            containerHttp.getContainerDetail(containerNo, (d) => { //获取仓库分类
              wx.hideLoading()
              let categoryId = d.container_info.warehouse_info.warehouse_category_info.warehouse_category_id
              if (categoryId == "2001") { //判断仓库类型————如果是普通仓库，跳转order页面TODO
                wx.navigateTo({
                  url: '../orders/orders'
                })
              } else if (categoryId == "2002") { //判断仓库类型————如果是重力感应仓库，跳转####页面TODO
              }
            }) //获取仓库分类结束
          } else { //判断是否开门成功————如果开门失败
          wx.hideLoading()
            let errorMsg = d.status.error_desc, //错误提示
              errorCode = d.status.error_code;//错误代码
            switch (errorCode) {
              case '3005':
                wx.showModal({
                  title: '提示',
                  content: '货柜已无商品，请联系客服补货',
                  showCancel: true,
                  confirmText: '联系客服',
                  success: function (res) {
                    if (res.confirm) {//用户点击确定
                      wx.makePhoneCall({//拨打客服电话
                        phoneNumber: app.globalData.CSNumber
                      })
                    }
                  }
                });break;

              case '3004':
                wx.showModal({
                  title: '提示',
                  content: errorMsg,
                  showCancel: false,
                  success: function (res) {
                    wx.navigateTo({
                      url: '../user/orderlist/orderlist'
                    })
                  }
                }); break;


                default:
                wx.showModal({
                  title: '提示',
                  content: errorMsg,
                  showCancel: false
                });break;
            }
            // wx.showModal({
            //   title: '提示',
            //   content: errorMsg,
            //   showCancel: false
            // })

          }
        })
        //模拟电商流程结束
        //硬件扫码程序开始
        // wx.scanCode({
        //   onlyFromCamera: true,
        //   success: (result) => {
        //     console.log(result); //打印扫码成功后返回的数据
        //     var containerNo = 'CB7IIRVPT';//保存货柜编号TODO
        //     orderHttp.addProductOrder(containerNo, (d, status) => { //给后端传递货柜编号，获取订单编号ID，申请开门
        //       console.log(d, status)
        //       if (status) { //判断是否开门成功————如果开门
        //         containerHttp.getContainerDetail(containerNo, (d) => { //获取仓库分类
        //           var categoryId = d.container_info.warehouse_info.warehouse_category_info.warehouse_category_id
        //           if (categoryId == "2001") { //判断仓库类型————如果是普通仓库，跳转order页面TODO
        //             wx.navigateTo({
        //               url: '../orders/orders'
        //             })
        //           } else if(categoryId == "2002") { //判断仓库类型————如果是重力感应仓库，跳转####页面TODO
        //           }
        //         }) //获取仓库分类结束
        //       } else {//判断是否开门成功————如果开门失败
        //         var errorCode = d.status.error_code
        //           console.log(errorCode)
        //           switch(errorCode){//检测失败代码
        //             //如果没有餐
        //             case '0001':wx.showModal({
        //               title: '提示TODO',
        //               content: '暂时没有餐TODO',
        //               showCancel:false
        //             });break;
        //             //如果门是开的
        //             case '0002': wx.showModal({
        //               title: '提示TODO',
        //               content: '请关门后再扫码TODO',
        //               showCancel: false
        //             }); break;
        //             default:console.log(123);
        //           }//检测失败代码结束
        //       }
        //     })
        //   },
        //   fail: (res) => {
        //     // wx.navigateTo({
        //     //   url: '../orders/orders'
        //     // })
        //     wx.showModal({
        //       title: '提示',
        //       showCancel: false,
        //       content: '请扫描正确的二维码',
        //       success: function(res) {
        //         if (res.confirm) {
        //           console.log('点击了确定')
        //         }
        //       }
        //     })
        //   }
        // })
        //硬件扫码程序结束
      } else { //总授权状态不为1
        wx.hideLoading()
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

    if (e.detail.userInfo) { //用户点击同意授权之后，先渲染授权返回的头像，然后给后端发送加密信息，然后从后端拉取头像,点击拒绝后授权弹窗消失
      console.log("按钮", e)
      this.setData({
        avatarUrl: e.detail.userInfo.avatarUrl
      })
      var submitInfo = {
        iv: e.detail.iv,
        encrypted_data: e.detail.encryptedData,
        signature: e.detail.rawData,
        raw_data: e.detail.rawData
      }
      memberHttp.setWechatMiniProgramMemberInfo(submitInfo, () => {
        memberHttp.getMemberDetail((d) => {
          if (d.member_info.icon_image.thumb) {
            this.setData({
              avatarUrl: d.member_info.icon_image.thumb,
            })
          }
        })
      })

      wx.showLoading({
        title: '加载中...',
        duration: 600,
      })
    } else {
    }
  },
  hideUserInfo() {//点击授权的同时，去掉授权弹窗
    this.setData({
      hasUserInfo: true,
    })
  }
})