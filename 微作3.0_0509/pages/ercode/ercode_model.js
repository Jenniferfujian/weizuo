import { Base } from '../../utils/base.js'

class Ercode extends Base {
  constructor() {
    super();
  }
  getCode(uid,callBack) {
    var params = {
      url: 'code/get',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      method:"POST",
      data:{
        path:'pages/zhuye/zhuye',
        uid:uid,
      }
    };
    this.request(params);
  }
}

export { Ercode }