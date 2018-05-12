import { Base } from '../../utils/base.js'

class Zhuye extends Base {
  constructor() {
    super();
  }
  
  info(callBack) {
    var params = {
      url: 'user/info',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }
  
  redu(authorID,callBack){
    var params = {
      url: 'user/redu?authorID='+authorID,
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }

  zhuYe(authorID,pageSize,page,callBack) {
    var params = {
      url: 'user/zhuye?authorID='+authorID+'&pageSize='+pageSize+'&page='+page,
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }

  encrypt(encryptedData, iv, callBack,fcallBack) {
    var params = {
      url: 'user/encrypt_user_info',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      fCallBack:function(res){//失败的回调函数
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
}
export { Zhuye }