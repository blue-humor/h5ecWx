// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    token:'',
    openid:'',
    url:'',
  },
   // 接受
   postMessage(e){
    console.log(e.detail)//接收H5传过来的数据
  },

  onLoad(options) {
    const {token,openid}=options
    const url ='http://localhost:8000/home'
    if (token) {
      this.setData({
        url:`${url}?token=${token}&openid=${openid}`
       })
    }else{
      this.setData({
        url:`${url}`
       })
    }

    console.log(this.data.url);
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
  }
})
