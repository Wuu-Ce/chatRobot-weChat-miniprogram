// pages/collection/collection.js
const utils = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collections:[{
      sender: 'robot',
      userID: '1',
      img: '',
      message: 'tes message',
      timeStamp: 1635422899097
    },
    {
      sender: 'robot',
      userID: '1',
      img: '',
      message: 'tes message, for 和 for/in 语句都可以迭代数组。for 语句需要配合 length 属性和数组下标来实现，执行效率没有 for/in 语句高。另外，for/in 语句会跳过空元素。',
      timeStamp: 1635422899097
    }]
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
    if(this.data.collections.length){
      this.formatAllDate()
    }
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
  formatAllDate(){
    this.data.collections.forEach(function(value, index, array){
      value.date = utils.js_date_time(value.timeStamp, 'Y/M/D h:m')
    })
    this.setData({
      collections: this.data.collections
    })
  }
})