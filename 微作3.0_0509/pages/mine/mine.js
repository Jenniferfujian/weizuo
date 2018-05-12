// pages/my/my.js
import { Mine } from '../mine/mine_model.js';
var mine = new Mine();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    amount: 0,
    isOn: true,
    hiddenLoading: false,
    userInfo: {//默认的灰色头像，没有昵称，没有简介
      avatarUrl: '../../images/home1.png',
      nickName: '',
      title: 'null',
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      withCredentials: true,
      lang: 'zh_CN',
      success: function (res) {
        mine.infoSave(res.userInfo, (data) => {
            that.setData({
              userInfo: data.user,
              isOn:data.user.ison,
              hiddenLoading:true
            })
        })
      },
    })
  },

  /*
   *页面导航按钮
   */
  zhuYe: function () {
    var uid = this.data.userInfo.id;
    wx.navigateTo({
      url: "../zhuye/zhuye?uid=" + uid,
    })
  },
  edit: function () {
    var userInfo = this.data.userInfo
    wx.redirectTo({
      url: '../infoedit/infoedit?nickName=' + userInfo.nickName + '&title=' + userInfo.title + '&uid=' + userInfo.id

      ,
    })
  },
  erCode: function () {
    var uid = this.data.userInfo.id;
    wx.navigateTo({
      url: '../ercode/ercode?uid=' + uid,
    })
  },

  yveWo: function () {
    wx.navigateTo({
      url: '../yvewo/yvewo',
    })
  },

  tapSwitch: function (event) {
    this.data.isOn = !this.data.isOn;
    mine.yuyueSwitch(this.data.isOn, (res) => {
      console.log(res);
    })
    this.setData({
      isOn: this.data.isOn
    })
  },
})
