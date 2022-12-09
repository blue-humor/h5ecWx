// index.js
// 获取应用实例
import { reqLogin } from "../../servers/login";

const app = getApp()

Page({
  data: {
    motto: '点击头像获取微信授权',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
    bindViewTap() {

    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res2) => {
        console.log(res2);
        wx.login({
          success (res) {
            if (res.code) {
              reqLogin({code:res.code,userInfo:res2.userInfo}).then((res)=>{
                const {member,token}=res?.data
                console.log(token);
                wx.navigateTo({
                  url: `../logs/logs?token=${token}&&openid=${member.openid}`
                })
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
        this.setData({
          userInfo: res?.userInfo,
          hasUserInfo: true
        })
      },
      fail:()=>{
        wx.navigateTo({
          url: `../logs/logs`
        })
      }
    })
  },
  onLoad() {

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
