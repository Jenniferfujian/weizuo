import { Base } from '../../utils/base.js'

class Yuewo extends Base {
  constructor() {
    super();
  }
  yueWo(pageSize,page,callBack) {
    var params = {
      url: 'yorder/yuewo?pageSize=' + pageSize + '&page=' + page +'&XDEBUG_SESSION_START=11495',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }

  confirm(yorder_no,callBack) {
    var params = {
      url: 'yorder/confirm',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      method:'POST',
      data:{
        yorder_no: yorder_no
      }
    };
    this.request(params);
  }

  msgConfirmed(yorder_no, formId, callBack) {
    var params = {
      url: 'yorder/msgconfirmed?XDEBUG_SESSION_START=18217',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      method: 'POST',
      data: {
        yorder_no: yorder_no,
        formId: formId
      }
    };
    this.request(params);
  }

}

export { Yuewo }