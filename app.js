// app.js
App({
  onLaunch: function (options) {
   const that = this
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
    wx.login({
      success (res) {
        if (res.code) {
          //发起登录网络请求
          wx.request({
            url:  that.globalData.http + '/login/',
            data: {
              code: res.code
            },
            success(res1) {
              wx.setStorageSync('userID', res1.data.userID)
              that.globalData.userInfo.userID = res1.data.userID
            },
            fail() {
              console.log('login fail')
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo:{userInfo:{userID:1}},
    http: 'https://yuxue0824.com'
  }
})