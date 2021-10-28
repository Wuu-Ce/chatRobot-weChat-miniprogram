// pages/collection/collection.js
const utils = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    InputBottom: 0,
    inputValue: '',
    buttonDisable: true,
    userInfo: {
      nickName: '昵称',
      avatarUrl: '',
      gender: '性别',
      country: '国家',
      province: '省份',
      city: '城市',
      language: '语言'
    },
    record: [{
        sender: 'robot',
        message: ' test1',
        timeStamp: 1634056139502,
        date: ''
      },
      {
        sender: 'robot',
        message: ' test2',
        timeStamp: 1634856139502,
        date: ''
      },
      {
        sender: 'Gnn',
        message: ' 长安大学有几个校区？',
        timeStamp: 1635060034502, // util.js_data_time( new Date().getTime(), 'Y/M/D')
        date: ''
      },
      {
        sender: 'robot',
        message: ' 三个，分别是渭水校区、校本部北院教学区、雁塔校区和小寨校区。',
        timeStamp: 1635065139502,
        date: ''
      },
      {
        sender: 'robot',
        message: ' test',
        timeStamp: 1635066139502,
        date: ''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    wx.nextTick(() => {
      const requestAnimFrame = (function () {
        // 自执行函数
        return function (callback) {
          setTimeout(callback, 30000)
        }
      })()
      const setDateLoop = function () {
        that.formatRecordDate()
        requestAnimFrame(setDateLoop)
      }
      setDateLoop()
    })
    console.log('userID:' + wx.getStorageSync('userID'))
    console.log('id'+app.globalData.userInfo.userID)
    wx.request({
      url: app.globalData.http + '/chat/getChatRecords',
      data: {
        userID: app.globalData.userInfo.userID
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success(res) {

        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0,
    })
    this.getInputValue('inputValue', this.data.inputValue)
  },
  InputIn(e) {
    this.data.inputValue = e.detail.value
    if (this.data.inputValue == '') {
      this.setData({
        buttonDisable: true
      })
    } else {
      this.setData({
        buttonDisable: false
      })
    }
  },
  getInputValue(name, value) {
    let data = {};
    data[name] = value;
    this.setData(data)
  },
  //发送消息
  sendMessage() {
    let that = this
    let time = new Date().getTime()
    this.data.record.push({
      sender: that.data.userInfo.nickName,
      message: this.data.inputValue,
      timeStamp: time,
      date: this.formatDate(time),
    })
    this.setData({
      record: this.data.record,
      inputValue: '',
      buttonDisable: true
    })
    const userID = wx.getStorageSync('userID')
    wx.request({
      url: app.globalData.http + '/chat/chatreply',
      data: {
        userID: app.globalData.userInfo.userID,
         sender: that.data.userInfo.nickName,
        message: that.data.inputValue,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data.data)
        res.data.data.time *= 1000
        that.data.record.push(res.data.data)
        that.setData({
          record: that.data.record
        })
        console.log(that.data.record)
        that.ScrollToBottom()
      }
    })
    this.ScrollToBottom()
  },
  ScrollToBottom() {
    wx.createSelectorQuery().select('#chatView').boundingClientRect(res => {
      // 到这里，我们可以从res中读到class为bb4的top，即离顶部的距离（px）
      // 2使用wx.pageScrollTo()将页面滚动到对应位置
      wx.pageScrollTo({
        scrollTop: res.height, // 滚动到的位置（距离顶部 px）
        duration: 300 //滚动所需时间 如果不需要滚动过渡动画，设为0（ms）
      })
    }).exec()
  },
  //重新继续日期
  formatRecordDate() {
    const that = this
    this.data.record.forEach(function (item) {
      item.date = that.formatDate(item.timeStamp)
    })
    this.setData({
      record: this.data.record
    })
  },
  //格式化时间
  formatDate(time) {
    const nowTime = new Date().getTime()
    let beetwn = nowTime - time
    if (beetwn < 60000) {
      return ('')
    } else if (beetwn >= 60000 && beetwn < 3600000) {
      return (Math.ceil(beetwn / 60000) + '分钟前 ')
    } else if (beetwn >= 3600000 && beetwn < 86400000) {
      return (utils.js_date_time(time, 'h:m'))
    } else if (beetwn >= 86400000 && beetwn < 604800000) {
      return (this.getWeekDay(utils.js_date_time(time, 'W')) + ' ' + utils.js_date_time(time, 'h:m'))
    } else {
      return (utils.js_date_time(time, 'Y/M/D h:m'))
    }
  },
  getWeekDay(day) {
    switch (day) {
      case '01':
        return ('周一')
      case '02':
        return ('周二')
      case '03':
        return ('周三')
      case '04':
        return ('周四')
      case '05':
        return ('周五')
      case '06':
        return ('周六')
      case '07':
        return ('周日')
      default:
        return
    }
  }
})