import { Base } from '../../utils/base.js'

class Jyuyue extends Base {
  constructor() {
    super();
  }
  jYuYue(yorder_no,callBack) {
    var params = {
      url: 'yorder/jyuyue',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      method: 'POST',
      data: {
        yorder_no: yorder_no
      }
    };
    this.request(params);
  }

  confirm(yorder_no, callBack) {
    var params = {
      url: 'yorder/confirm',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      method: 'POST',
      data: {
        yorder_no: yorder_no
      }
    };
    this.request(params);
  }

  msgConfirmed(yorder_no,formId,callBack) {
    var params = {
      url: 'yorder/msgconfirmed',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      method: 'POST',
      data: {
        yorder_no: yorder_no,
        formId:formId
      }
    };
    this.request(params);
  }
   
}

export { Jyuyue }