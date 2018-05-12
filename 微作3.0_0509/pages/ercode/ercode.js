import { Ercode } from '../ercode/ercode_model.js';
var erCode = new Ercode();
const myCanvas = wx.createCanvasContext('myCanvas', this);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    whiteBackground: "../../images/white.jpg",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      uid: options.uid
    })
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        that.setData({
          canvasWidth: res.windowWidth * 0.86,
        })
      },
    })
  },

  onReady() {
    this._drawCode();
  },

  save: function () {//保存到本地
    wx.showLoading({
      title: '保存中',
    })
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      fileType: 'jpg',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function () {
            wx.hideLoading()
          }
        })
      }
    })
  },

  _drawCode:function(){//绘制
    wx.showLoading({
      title: '正在生成',
    })
    var canvasWidth = this.data.canvasWidth;
    var canvasHeight = canvasWidth * 1.389;
    myCanvas.drawImage(this.data.whiteBackground, 0, 0, canvasWidth, canvasHeight);//1画一个白色背景图片
    myCanvas.draw(true);
    var that = this;
    erCode.getCode(this.data.uid, (res) => {
      var user = res.user;
      var codeSize = 1.14 //TODO 535/470的尺寸大小 
      // var canvasHeight=canvasWidth*1.14
      var zy = 20;//整体往下的增量
      wx.downloadFile({//绘制头像
        url: user.avatarUrl,
        success: function (avatar) {
          myCanvas.drawImage(avatar.tempFilePath, canvasWidth * 0.125, canvasHeight * 0.03 + zy, 50, 50);
          myCanvas.setFontSize(16);
          myCanvas.fillText(user.nickName, 100, 35 + zy);
          myCanvas.setFontSize(12);
          myCanvas.fillText(user.title, 100, 35 + 20 + zy);
          myCanvas.draw(true);
        }
      })
      wx.downloadFile({//绘制二维码
        url: user.code,
        success: function (res) {
          myCanvas.drawImage(res.tempFilePath, canvasWidth * 0.125, canvasHeight * 0.16 + zy, canvasWidth * 0.75, canvasWidth * 0.75 * 1.14);
          myCanvas.setFontSize(15);
          myCanvas.fillText("进入我的作品集", canvasWidth / 2 - 51, canvasHeight * 0.85);
          myCanvas.draw(true);
          wx.hideLoading();
        }
      })
      that.setData({
        ercode: res.code
      })
    })
  }
})