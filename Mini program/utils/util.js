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


/** 
 * @name storage基类方法对象
 * @function storageMethod.get(key|希望获取缓存的键)
 */
function storageMethod(){};
storageMethod.get = function (key){
  if (wx.getStorageSync(key)){
    console.log('读取缓存 =>缓存里存在',key)
    return wx.getStorageSync(key)
  }else{
    console.log('读取缓存 =>缓存里没有', key)}
  };
storageMethod.set = function(key,keys){
  wx.setStorageSync(key, keys)
}


module.exports = {
  formatTime: formatTime,
  showModalWithNotice: showModalWithNotice,
  storageMethod: storageMethod
}
