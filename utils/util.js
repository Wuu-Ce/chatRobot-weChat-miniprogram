const app = getApp()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

//时间戳转日期
function js_date_time(number, format) {
  var formateArr = ['Y', 'M', 'W','D', 'h', 'm', 's']
  var returnArr = []
  number = number/1000
  var date = new Date(number * 1000)
  returnArr.push(date.getFullYear())
  returnArr.push(formatNumber(date.getMonth() + 1))
  returnArr.push(formatNumber(date.getUTCDay() + 1))
  returnArr.push(formatNumber(date.getDate()))
  returnArr.push(formatNumber(date.getHours()))
  returnArr.push(formatNumber(date.getMinutes()))
  returnArr.push(formatNumber(date.getSeconds()))

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i])
  }
  return format
}

function getUserInfo() {
  let hasUserInfo = false
  wx.getUserProfile({
    desc: '登录获取个人信息',
    success: (res) => {
      wx.setStorageSync('userInfo',res.userInfo)
      hasUserInfo = true
    }
  })
  return hasUserInfo
}

module.exports = {
  formatTime,
  js_date_time: js_date_time, //时间戳
  getUserInfo
}
