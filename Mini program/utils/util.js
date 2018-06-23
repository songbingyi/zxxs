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


/** @name storageMethod缓存方法
 *  @function get(keys|缓存赋值对象,key|请求缓存的key) 获取缓存
 *  @function set(key|缓存key,data|缓存数据) 存储缓存
 */
const storageMethod = {
  get:(keys, key)=>{
    var tempkey = wx.getStorageSync(key)
    if(tempkey){
      keys = tempkey
      console.log('获取缓存成功:getStorage=>', key)
    }else{
      console.log('获取缓存失败:getStorage=>', key)
    }
  },
  set:(key,data) => {
    wx.setStorageSync(key, data)
    console.log('setStorage=>',key,data)
  }
}

module.exports = {
  formatTime: formatTime,
  showModalWithNotice: showModalWithNotice,
  storageMethod: storageMethod
}
