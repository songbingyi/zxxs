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
storageMethod.get = function (key,callback1,callback2){
  if (wx.getStorageSync(key)){
    console.log('读取缓存 =>缓存里存在',key)
    return wx.getStorageSync(key)
  }else{
    console.log('读取缓存 =>缓存里没有', key)}
  };
storageMethod.set = function(key,keys){
  wx.setStorageSync(key, keys)
  console.log('存储缓存 =>', key,keys)

}

/** 
 * @name 防止连续触发
 * @name function hasTouched(t|间隔时间，self|this当前对象)
 */
function hasTouched(t,self){
  self.setData({
    hasTouched: 1 //正在请求中，设置为1
  })
  setTimeout(()=>{
    self.setData({
      hasTouched: 0 //请求结束，设置为0
    })
  },t)
}

module.exports = {
  formatTime: formatTime,
  showModalWithNotice: showModalWithNotice,
  storageMethod: storageMethod,
  hasTouched:hasTouched
}
