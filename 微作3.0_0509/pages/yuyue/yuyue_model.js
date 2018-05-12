import { Base } from '../../utils/base.js'

class Yuyue extends Base {
  constructor() {
    super();
  }
  submit(sellerID,formId,name,phone,xiangmu, callBack) {
    var params = {
      url: 'yorder/place',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      method: 'POST',
      data: {
        sellerID:sellerID,
        formId:formId,
        name:name,
        phone:phone,
        xiangmu:xiangmu
      },
    };
    this.request(params);
  }

  encrypt(encryptedData, iv, callBack, fcallBack) {
    var params = {
      url: 'user/encrypt',
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
}

export { Yuyue }