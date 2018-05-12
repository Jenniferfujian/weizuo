import { Zhuye } from '../zhuye/zhuye_model.js';
var zhuYe = new Zhuye();
var pageSize = 4;
var app = getApp();  
Page({
  data: {
    page: 1,
    hiddenLoading: false,
    zpCount: 0,
    redu:0,
    yorderCount: 0,
    userModel: {
      avatarUrl: "../../images/login.png",
      ison:1
    }
  },

  onLoad: function (options) {
    var that = this;
    var uid=options.uid;
    if (!uid) {
      app.globalData.isAuthor=true;
      zhuYe.info((res) => {
        var uid=res.uid;
        this.setData({
          uid:uid
        })
        that.zhuYeData(uid);
      })
    }
    else {//通过转发，导航等进入
      this.setData({
        uid: uid
      })
      zhuYe.info((res)=>{//判断当前用户是不是该页面的作者
        if(uid==res.uid){
          app.globalData.isAuthor = true;
        }
      }) 
      that.zhuYeData(uid);
    }
  },
  
  onShow:function(){
    var authorID=this.data.uid;
    if(authorID){
     zhuYe.redu(authorID,(res)=>{
       console.log(res);
       this.setData({
       redu:res.redu
      })
     });
    }
    if (app.globalData.loginStatus && app.globalData.isAuthor && app.globalData.zanEncrypt){
      var that=this;
      that.setData({
        page: 1,
      })
      var that=this;
      zhuYe.info((res) => {
        var uid = res.uid;
        that.zhuYeData(uid);
      })
    }
  },


  zhuYeData:function(uid){
    zhuYe.zhuYe(uid, pageSize, this.data.page, (res) => {
      console.log(res);
      this.setData({
        yorderCount: res.yorderCount,
        albumModels: res.albumModels,
        page: this.data.page + 1,
        hasMore: res.hasMore,
        uid:uid,
        // hiddenLoading: true,
        zpCount: res.zpCount,
      })
      if (res.userModel) {
        this.setData({
          userModel: res.userModel,
          redu:res.userModel.redu
        })
      }
    })
  },

  onShareAppMessage: function () {//设置分享页面的信息
    var userName = this.data.userModel.nickName
    var uid = this.data.uid;
    return {
      title: userName + '的作品集',
      path: 'pages/zhuye/zhuye?uid=' + uid
    }
  },

  albumDetail: function (e) {//点击进入作品详情页
    var id = e.currentTarget.dataset.id;
    var userName = this.data.userModel.nickName;
    wx.navigateTo({
      url: '../zydetail/zydetail?albumID=' + id + '&userName=' + userName+'&authorID='+this.data.uid,
    })
  },

  //这个方法只有是用户不具备unionID，的时候才会调用
  login:function(event){
    console.log("login");
    this.wxGetUserInfo(event,(res)=>{
      // console.log(res);
    });
  },

  yuyue: function (event) {
    this.wxGetUserInfo(event, (res) => {
      wx.navigateTo({
        url: '../yuyue/yuyue?sellerID=' + this.data.uid + '&nickName=' + res,
      })
    });
  },

  onReachBottom() {
    if (this.data.hasMore == true) {
      this.setData({
        hiddenLoading: false
      })
      zhuYe.zhuYe(this.data.uid, pageSize, this.data.page, (res) => {
        var resAlbumModels = res.albumModels;
        var albumModels = this.data.albumModels;
        resAlbumModels.forEach(function (albumModel) {
          albumModels.push(albumModel);
        })
        this.setData({
          albumModels: albumModels,
          page: this.data.page + 1,
          hasMore: res.hasMore,
          hiddenLoading: true
        })
      })
    }
  },

  erWeiCode:function() {//点击二维码小图标
    wx.navigateTo({
      url: '../ercode/ercode?uid=' + this.data.uid
    })
  },

  wxGetUserInfo:function(event,callBack){
    if (!event.detail.userInfo) {
      wx.showModal({
        title: '提示',
        content: '取消授权，部分功能无法正常使用，是否重新授权',
        cancelText: "否",
        confirmText: "是",
        success: function (res) {
          if (res.confirm) {
            wx.openSetting({
            })
          }
        }
      })
    } else {
      var that = this;
      if (!app.globalData.loginStatus){
      zhuYe.encrypt(event.detail.encryptedData, event.detail.iv,
        (res) => {
          console.log(app.globalData.loginStatus + '' + app.globalData.isAuthor )
          if (app.globalData.isAuthor ) {
            var uid = res.user.id;
            that.setData({
              page: 1,
            })
            that.zhuYeData(uid);
          }
          if (res.code == 201) {
            wx.setStorageSync('token', res.token);
            wx.setStorageSync('loginStatus', res.loginStatus);
            app.globalData.loginStatus = wx.getStorageSync('loginStatus');
          }
        },
        (res) => {
          console.log(res);
        }
      )
     }
    callBack && callBack(event.detail.userInfo.nickName);
    }
  }
})