import { ZyDetail } from '../zydetail/zydetail_model.js';
var zyDetail = new ZyDetail();
var pageSize = 7;
var app=getApp();
Page({
  data: {
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: [],
    page: 1,
    col1H:0,
    col2H:0,
    hasMore:true
  },

  onLoad: function (options) {
    zyDetail.userInfo((res)=>{
      if (options.authorID == res.uid) {
        app.globalData.isAuthor = true;
      }
    })
    this.setData({
      id: options.albumID,
      userName:options.userName
    })
    zyDetail.zanStatus(options.albumID,(res=>{
      this.setData({
        zanStatus:res.zanStatus
      })
    }))  
    wx.getSystemInfo({
      success: (res) => {
        var ww = res.windowWidth;
        var wh = res.windowHeight;
        var imgWidth = ww * 0.48;
        var scrollH = wh;
        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });
        this.loadImages();
      }
    })

  },

  onShareAppMessage: function () {//设置分享信息
    return {
      title: this.data.userName + '的作品',
      path: 'pages/zydetail/zydetail?albumID=' + this.data.id+'&userName='+this.data.userName
    }
  },

  imagePreview: function (e) {//点击大图预览
    var images = [];
    var url = e.currentTarget.dataset.url;
    var dataImages = this.data.images;
    for (var i = 0; i < this.data.images.length; i++) {
      images[i] = dataImages[i].url;
    }
    wx.previewImage({
      urls: images,
      current: url
    })
  },
 
  onImageLoad: function (e) {//渲染图片
    var imageId = e.currentTarget.id;
    var oImgW = e.detail.width;         //图片原始宽度
    var oImgH = e.detail.height;        //图片原始高度
    var imgWidth = this.data.imgWidth;  //图片设置的宽度
    var scale = imgWidth / oImgW;        //比例计算
    var imgHeight = oImgH * scale;      //自适应高度
    var images = this.data.images;
    var imageObj = null;
    for (var i = 0; i < images.length; i++) {
      var img = images[i];
      if (img.id == imageId) {
        imageObj = img;
        break;
      }
    }
    imageObj.height = imgHeight;
    var col1 = this.data.col1;
    var col2 = this.data.col2;
    var col1H=this.data.col1H;
    var col2H=this.data.col2H;
    // console.log(col1H+'-----------'+col2H+'------------')
    if (Math.ceil(col1H) <=Math.ceil(col2H)){
      col1.push(imageObj);
      col1H += imgHeight;
    } else {
      col2.push(imageObj);
      col2H += imgHeight;
    }
    var data = {
      col1: col1,
      col2: col2,
      col1H:col1H,
      col2H:col2H
    };
    this.setData(data);
  },

  loadImages: function () {//向下滚动刷新
    if(this.data.hasMore==true){
    zyDetail.zyDetail(this.data.id, pageSize, this.data.page, (res) => {
      if (this.data.page == 1) {
        this.setData({
          zan:res.albumModel.zan,
          albumModel: res.albumModel,
          zanModels:res.zanModels
        })
      }
      var list = this.data.images;
      for (var i = 0; i < res.images.length; i++) {
        list.push(res.images[i])
      }
      this.setData({
        hasMore: res.hasMore,
        images: list,
        page: this.data.page + 1
      });
     })
    }
  },
  
  zan:function(event){
    console.log(event);
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
    }
    else{
     if(!app.globalData.loginStatus){
       zyDetail.encrypt(event.detail.encryptedData, event.detail.iv,
         (res) => {
           if (app.globalData.isAuthor) {
             app.globalData.zanEncrypt=true;
           }
           if (res.code == 201) {
             wx.setStorageSync('token', res.token);
             wx.setStorageSync('loginStatus', res.loginStatus);
             app.globalData.loginStatus = wx.getStorageSync('loginStatus');
           }
         },
       )
     }
     if(this.data.zanStatus){
       wx.showToast({
         title: '你已经点过赞啦',
         icon: 'none'
       })
     }else{
     var zan=this.data.zan;
     this.setData({
       zanStatus:true,
       zan:zan+1
     });
     zyDetail.zan(this.data.id,(res)=>{
      console.log(res.avatarUrl);
      var zanModels=this.data.zanModels;
      if(zanModels.length==7){
        zanModels.pop();
      }
        zanModels.splice(0,0,{'avatarUrl':res.avatarUrl});
       this.setData({
        zanModels:zanModels
       });
     });
    }
    }
  },

  moreImg:function(){
   wx.navigateTo({
     url: '../dianzanimg/dianzanimg?albumID='+this.data.albumModel.id,
   })
  }

})