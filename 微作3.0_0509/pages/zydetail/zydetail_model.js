import { Base } from '../../utils/base.js'

class ZyDetail extends Base {
  constructor() {
    super();
  }
  zyDetail(albumID,pageSize,page,callBack) {
    var params = {
      url: 'album/detail?albumID=' + albumID +'&pageSize='+pageSize+'&page='+page,
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }

  zanStatus(albumID, callBack) {
    var params = {
      url: 'album/zan_status?albumID='+albumID,
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }

  zan(albumID,callBack) {
    var params = {
      url: 'album/zan',
      method: 'POST',
      data: {
        albumID: albumID
      },
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }

  encrypt(encryptedData, iv, callBack, fcallBack) {
    var params = {
      url: 'user/encrypt_user_info',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      fCallBack: function (res) {//失败的回调函数
        fcallBack && fcallBack(res);
      },
      method: 'POST',
      data: {
        encryptedData: encryptedData,
        iv: iv
      }
    };
    this.request(params);
  }

  userInfo(callBack) {
    var params = {
      url: 'user/info',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }

}
export { ZyDetail }