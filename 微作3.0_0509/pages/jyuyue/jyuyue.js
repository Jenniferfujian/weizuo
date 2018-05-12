// pages/jyuyue/jyuyue.js 这是点击服务通知后进来的页面
import { Jyuyue } from '../jyuyue/jyuyue_model.js';
var jYuYue = new Jyuyue();
Page({
  data: {
    yorder_no: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      yorder_no: options.yorder_no
    })
    jYuYue.jYuYue(options.yorder_no, (res) => {
      this.setData({
        yorder: res.yorder
      })
    })
  },

  copyNumber: function (event) {//拷贝电话号码
    wx.setClipboardData({
      data: event.currentTarget.dataset.phone,
      success: function (res) {
        wx.showModal({
          content: '已复制，电话或微信联系他吧',
          showCancel: false,
        })
      }
    })
  },

  confirm: function (event) {//点解确认按钮
    console.log(event);
    var that = this;
    jYuYue.confirm(this.data.yorder_no, (res) => {
      var yorder = this.data.yorder;
      yorder['status'] = 1;
      this.setData({//更新数据绑定
        yorder: yorder
      })
      wx.showToast({
        title: '已确认',
        duration: 1500
      })
      jYuYue.msgConfirmed(that.data.yorder_no, event.detail.formId, (res) => {
        console.log(res);//向买家发送预约已得到确认的通知
      })
      setTimeout(function () {//返回Home
        wx.switchTab({
          url: '../zhuye/zhuye',
        })
      }, 2000
      )
    }
    )
  }
})