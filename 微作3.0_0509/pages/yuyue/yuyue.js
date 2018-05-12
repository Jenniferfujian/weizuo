// pages/yuyue/yuyue.js
import { Yuyue } from '../yuyue/yuyue_model.js';
var yuyue = new Yuyue();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clickAble:true 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      sellerID: options.sellerID,
      name:options.nickName,
    })

  },

  btnSubmit: function (e) {//提交预约
    console.log(e);
    var value = e.detail.value;
    if ((!value.phone) || (!value.phone) || (!value.xiangmu)) {
      wx.showModal({
        title: '请填写以上内容',
        showCancel: false
      })
    }
    else {
      this.setData({
        clickAble:false
      })
      yuyue.submit(this.data.sellerID, e.detail.formId, value.name, value.phone, value.xiangmu, (res) => {
        console.log(res);
        if (res.code == '200') {
          wx.showToast({
            title: '预约成功',
          })
          setTimeout(function () {
            wx.navigateBack({
              delta:1
            })
          }
          , 2000)
        }
      })
    }
  },

  phone:function(event){
    yuyue.encrypt(event.detail.encryptedData, event.detail.iv,(res)=>{
      console.log(res);
      this.setData({
        phone:res.phoneNumber
      })
    });
  }
 
})