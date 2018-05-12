//app.js
import {Token} from 'utils/token.js';
App({
  globalData: {
    loginStatus:false, //用户注册状态 
    isAuthor:false,//判断是否是作者  
    zanEncrypt:false
  },
  onLaunch: function () {
    var token = new Token();
    token.verify();
    this.globalData.loginStatus=wx.getStorageSync('loginStatus');
  },
})