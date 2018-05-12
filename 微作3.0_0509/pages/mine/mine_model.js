import { Base } from '../../utils/base.js'

class Mine extends Base {
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

  infoSave(userInfo,callBack) {
    var params = {
      url: 'user/info_save?XDEBUG_SESSION_START=12672',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      method:'POST',
      data:{
        userInfo:userInfo
      }
    };
    this.request(params);
  }
   
  yuyueSwitch(isOn,callBack) {
    var params = {
      url: 'user/yuyue_switch?isOn='+isOn,
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }

}

export { Mine }