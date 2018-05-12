import { Base } from '../../utils/base.js'

class Infoedit extends Base {
  constructor() {
    super();
  }
  edit(nickName,title,callBack) {
    var params = {
      url: 'user/info_edit_nt',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      method:"POST",
      data:{
        nickName:nickName,
        title:title,
      }
    };
    this.request(params);
  }

}
export { Infoedit }