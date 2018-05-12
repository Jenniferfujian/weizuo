// pages/zanwo.js
import { Config } from '../../utils/config.js'
import { Infoedit } from '../infoedit/infoedit_model.js';
var infoedit = new Infoedit();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageSource: "../../images/addPic.png",
    nickName: '',
    title: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nickName: options.nickName,
      title: options.title,
      uid: options.uid
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * formBindsubmit
   */
  formBindSubmit: function (event) {
    wx.showLoading({
      title: '保存中',
    })
    var value = event.detail.value;
    var title = value.title;
    var nickName = value.nickName;
    var uid = this.data.uid;
    var path = this.data.imageToUpload;
    if(path==null){
     console.log("haha");
     infoedit.edit(nickName,title,(res)=>{
         wx.hideLoading();
         wx.showToast({
           title: '修改成功',
           icon: 'success',
           duration: 2000
         })
         setTimeout(function () {
           wx.switchTab({
             url: '../mine/mine',
           })
         }
           , 2500
         )
     })
    }else{
    console.log("hehe");  
    wx.uploadFile({
      url: Config.restUrl + 'user/info_edit',
      filePath: path,
      name: 'avatar',
      formData: {
        nickName: nickName,
        title: title,
        uid: uid
      },
      success: function (res) {
        if (res.statusCode == 200) {
          wx.hideLoading();
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
        }
      },
      complete: function (res) {
        setTimeout(function () {
          wx.switchTab({
            url: '../mine/mine',
          })
        }
          , 2500
        )
      }
    })
    }
  },

  cancal:function(){
    wx.switchTab({
      url: '../mine/mine',
    })
  },
  /*
  选择图片上传,显示成对应的
  */
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (res) {
        that.setData({
          imageSource: res.tempFilePaths[0],
          imageToUpload: res.tempFilePaths[0],
        })
      },
    })
  },


})
