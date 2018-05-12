// pages/yvewo/yvewo.js
import { Yuewo } from '../yvewo/yuewo_model.js';
var yuewo = new Yuewo();
var pageSize=5;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    text:"预约详情",
    hiddenLoading:false,
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    yuewo.yueWo(pageSize,this.data.page,(res) => {
      this.setData({
        hiddenLoading: true
      })
      var length=res.orders.length;
      if(length==0){
       this.setData({
         text:"暂未收到预约,快去分享自己的作品吧"
       })  
      }
      this.setData({
        orders: res.orders,
        times: res.orders.length,
        page:this.data.page+1
      })
    });
  },
  copyNumber:function(event){
    wx.setClipboardData({
      data: event.currentTarget.dataset.phone,
      success:function(res){
        wx.showModal({
          content: '已复制，电话或微信联系他吧',
          showCancel: false,
        })
      }
    })
  },
  confirm:function(event){
    console.log(event);
    var index = event.currentTarget.dataset.index;
    var yorder_no = event.currentTarget.dataset.yorder_no;
    console.log(yorder_no);
    yuewo.confirm(yorder_no,(res)=>{
       var orders=this.data.orders;
       orders[index]['status']=1;
       this.setData({
         orders:orders
       })
       wx.showToast({
         title: '已确认',
       })
       yuewo.msgConfirmed(yorder_no, event.detail.formId, (res) => {
         console.log(res);
       })
   }
   )
  },

  onReachBottom:function(){
    this.setData({
      hiddenLoading: false
    })
    yuewo.yueWo(pageSize, this.data.page, (res) => {
      var resOrders=res.orders;
      var orders=this.data.orders;
      resOrders.forEach(function(resOrder){
       orders.push(resOrder);
      }) 
      this.setData({
        hiddenLoading: true,
        orders: orders,
        times: res.orders.length,
        page:this.data.page+1
      })
    });
  }
 
})