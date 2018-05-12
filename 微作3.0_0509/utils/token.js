import { Config } from '../utils/config.js'
class Token {
  constructor() {
    this.verifyUrl = Config.restUrl + 'token/verify_token',
    this.tokenUrl = Config.restUrl + 'token/get_token' 
  }
  verify() {
    var token = wx.getStorageSync('token');
    if (!token) {
      this.getTokenFromServer();
    }
    else {
      this.verifyFromServer();
    }
  }
  getTokenFromServer(callBack) {
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('code-----'+res.code)
        wx.request({
          url: that.tokenUrl,
          data: {
            code:res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: "POST",
          success: function (res) {
            wx.setStorageSync('token', res.data.token);
            wx.setStorageSync('loginStatus', res.data.loginStatus);
            callBack && callBack(res.data.token);
          }
        })
      }
    })
  }
  verifyFromServer(token) {
    var that = this;
    wx.request({
      url: that.verifyUrl,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token')
      },
      method: 'GET',
      success: function (res) { 
        if(!res.data){
         that.getTokenFromServer();
        }
      },
    })
  }
}

export {Token};