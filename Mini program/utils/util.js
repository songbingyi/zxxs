const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** @name 显示提示对话框：只有一个确定按钮且无点击后回调事件 */
const showModalWithNotice = (title, content) => {
  wx.showModal({
    title: title,
    content: content,
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        console.log('function showModalWithNotice 用户点击确定');
      }
    }
  });
}
/** @name 存储缓存
 *  @keys 缓存键
 *  @value 缓存值
 *  @callback 回调
 */
const setStorage = (keys,value,callback) => {
  wx.setStorage({
    key: keys,
    data: value,
    success:(res)=>{console.log('success:setStorage=>',res);callback},
    fail: (res) => { console.log('fail:setStorage=>', res)}
  })
}
/** @name 获取缓存
 *  @keys 缓存键
 *  @callback 回调
 */
const getStorage = (keys,callback) => {
  if(wx.getStorageSync(keys)){
    console.log('getStorage =>', keys, ':', wx.getStorageSync(keys))
    callback()
  }else{
    console.log('getStorage =>',keys,'fail')
  }
}
module.exports = {
  formatTime: formatTime,
  showModalWithNotice: showModalWithNotice,
  getStorage: getStorage
}
