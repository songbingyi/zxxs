// pages/notice/notice.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
      backToIndex:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
    },
    backToIndex: function() {
      clearTimeout(this.data.backToIndex)
        wx.navigateBack({
          //url: '/pages/index/index',
          delta:2
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
      
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {//5秒钟后跳转首页，不可返回
        this.setData({
          backToIndex: setTimeout(function () {
              wx.navigateBack({
              //url: '/pages/index/index',
                delta: 2
            })
          }, 5000)
        })
    },


    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        clearTimeout(this.data.backToIndex)
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        clearTimeout(this.data.backToIndex)
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }


})