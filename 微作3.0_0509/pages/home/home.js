// pages/zanwo.js
import { Home } from '../home/home_model.js';
var app = getApp();
var home = new Home();
var pageSize = 4;//下拉刷新，每页返回的个数
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    hiddenLoading: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    home.albumList(pageSize, this.data.page, (res) => {
      this.setData({
        albumModels: res.albumModels,
        hasMore: res.hasMore,
        page: this.data.page + 1,
        hiddenLoading: true
      })
    })
  },

  albumDetail: function (e) {
    var albumID = e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '../editalbum/editalbum?albumID=' + albumID,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  create: function () {
    wx.redirectTo({
      url: '../tianjia/tianjia',
    })
  },

  onReachBottom: function () {
    this.setData({
      hiddenLoading: false
    });
    home.albumList(pageSize, this.data.page, (res) => {
      var resAlbumModels = res.albumModels;
      var albumModels = this.data.albumModels;
      resAlbumModels.forEach(function (albumModel) {
        albumModels.push(albumModel);
      })
      this.setData({
        hasMore: res.hasMore,
        albumModels: albumModels,
        page: this.data.page + 1,
        hiddenLoading: true
      })
    })
  },

  deleteAlbum: function (e) {
    console.log(e);
    var albumID = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var that = this;
    wx.showModal({
      content: '是否删除整个相册',
      success: function (res) {
        if (res.confirm) {
          home.albumDeleteAll(albumID, (res) => {
            if (res.code == 200) {
              var albumModels = that.data.albumModels;
              albumModels.splice(index, 1);
              that.setData({
              albumModels:albumModels  
              })
            }
          })
        }
      }
    })
  },



  onShareAppMessage: function () {
    return {
      title: "微作，让作品为自己代言",
      path: 'pages/home/home'
    }
  }
})
