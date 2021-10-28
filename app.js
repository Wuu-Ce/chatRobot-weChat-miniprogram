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
            url:  that.globalData.http + '/login',
            data: {
              code: res.code
            },
            success(res){
              that.globalData.userInfo.userID=res.data.userID
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo:{},
    http: 'http://yuxue0824.com'
  }
})