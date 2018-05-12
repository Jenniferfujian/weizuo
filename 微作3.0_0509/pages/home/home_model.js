import {Base} from '../../utils/base.js'

class Home extends Base{
  constructor(){
    super();
  }

  albumList(pageSize,page,callBack) {
    var params = {
      url: 'user/album_list?pageSize='+pageSize+'&page='+page,
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }

  albumDeleteAll(albumID, callBack) {
    var params = {
      url: 'album/delete_all',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      method: "POST",
      data: {
        albumID: albumID
      }
    };
    this.request(params);
  }

}

export{Home}