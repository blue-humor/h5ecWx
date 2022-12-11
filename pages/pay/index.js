// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   const {token,openid}=options
    const payData=JSON.parse(decodeURIComponent(options.payParams))
    const {nonceStr,prepayid,signStr,timestamp}= payData
    wx.requestPayment({
      nonceStr,
      paySign:signStr,
      timeStamp:timestamp,
      signType: "RSA",
      package:'prepay_id='+prepayid,  
      success(res) {
        console.log(res);
        wx.redirectTo({
          url: `../logs/logs?token=${token}&openid=${openid}`,
        })
      },
      fail(err) {
        console.log(err)
        wx.redirectTo({
          url: `../logs/logs?token=${token}&openid=${openid}`,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})