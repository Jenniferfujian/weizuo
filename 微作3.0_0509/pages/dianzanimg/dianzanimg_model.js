import { Base } from '../../utils/base.js'

class Dianzanimg extends Base {
  constructor() {
    super();
  }
  allZan(albumID,callBack) {
    var params = {
      url: 'album/allzan?albumID='+albumID,
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }

}
export { Dianzanimg }