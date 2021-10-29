// pages/main/main.js
const utils = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true
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
    const query = wx.createSelectorQuery()
    query.select('#mainCanvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {

        this.initCanvas(res)
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
  //延迟模拟数据
  dataFun: function () {
    //延迟500ms,模拟网络请求时间
    // setTimeout(() => {
    //   this.setData({
    //     canvasData: [1, 2, 3, 4],
    //     testLoad: true
    //   })
    // }, 500);
    //解决办法
    //cover-view的显示延迟时间,  大于canvas循环数据时间即可,  比如这里,  只要延迟时间>500就行
    setTimeout((res) => {
      this.setData({
        hidden: false
      })
      this.initCanvas()
    }, 800)

  },

  initCanvas: function (res) {
    const canvas = res[0].node
    const ctx = canvas.getContext('2d')
    const dpr = wx.getSystemInfoSync().pixelRatio
    canvas.width = res[0].width * dpr
    canvas.height = res[0].height * dpr

    wx.nextTick(() => {
      const height = canvas.height
      const width = canvas.width
      const lines = [
        'rgba(237,175,139, 0.5)',
        'rgba(179,201,224, 0.5)',
        'rgba(247,204,244, 0.5)'
      ]
      const boHeight = height / 8
      const posHeight = height / 1.6 // 波浪高度
      const canvasAny = {
        width,
        height
      }
      const requestAnimFrame = (function () {
        // 波浪自执行函数
        return function (callback) {
          setTimeout(callback, 20)
        }
      })()
      let step = 0
      // 动起来
      const loop = function () {
        ctx.clearRect(0, 0, canvasAny.width, canvasAny.height)
        step++
        // 画三个不同颜色的矩阵
        for (let j = lines.length - 1; j >= 0; j--) {
          // 每个矩阵的角度都不同，每个之间相差100度
          const angle = ((step + j * 100) * Math.PI) / 180
          const deltaHeight = Math.sin(angle) * boHeight
          const deltaHeightRight = Math.cos(angle) * boHeight
          ctx.fillStyle = lines[j]
          ctx.beginPath() // 开始绘制
          ctx.moveTo(0, 0)
          ctx.lineTo(0, posHeight + deltaHeight)
          ctx.bezierCurveTo(
            0,
            posHeight + deltaHeight + boHeight,
            canvasAny.width,
            posHeight + deltaHeightRight + boHeight,
            canvasAny.width,
            posHeight + deltaHeightRight
          )
          ctx.lineTo(canvasAny.width, 0)
          ctx.lineTo(0, 0)
          ctx.fill() // 上色
          ctx.closePath() // 结束绘制
        }
        requestAnimFrame(loop) // 启动函数
      }
      loop()
    })
  },
  toChatPage: function () {
    //添加登录
    if (wx.getStorageSync('userInfo')) {
      wx.navigateTo({
        url: '../chat/chatPage',
        success: function (res) {}
      })
    } else if (utils.getUserInfo()) {
      wx.navigateTo({
        url: '../chat/chatPage',
        success: function (res) {}
      })
    }
  },
  toUserPage: function () {
    wx.navigateTo({
      url: '../user/user',
      success: function (res) {}
    })
  },
  showModal(e) {
    this.setData({
      modalName: 'e.currentTarget.dataset.target'
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
})