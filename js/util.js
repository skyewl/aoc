/* 接口域名 */
var apipath = 'https://www.heisezhizhao.com';

//本地存储
var localStorage = window.sessionStorage;
function getLoc(name) {
  var value = localStorage.getItem(name);
  if (/^\{.*\}$/.test(value)) {
    value = JSON.parse(value);
  }
  return value;
}
function setLoc(name, value) {
  if (typeof value === typeof {}) {
    value = JSON.stringify(value);
  }
  return localStorage.setItem(name, value);
}
function remove(name) {
  return localStorage.removeItem(name);
}

//获取链接参数
function getparam(name, url) {
  var m, reg, tmp;
  url = (url || window.location.href).split('#');
  if (name.indexOf('#') != -1) {
    tmp = url.length < 2 ? '' : url[1];
  } else {
    tmp = url[0];
  }
  m = tmp.match(new RegExp('(|[?&#])' + name.replace('#', '') + '=([^#&?]*)(\\s||$)', 'gi'));
  if (m) {
    return decodeURIComponent(m[0].split('=')[1]);
  } else {
    return '';
  }
}

// ajaxpost异步请求
function ajaxPost(url, data, success, error, comp) {
  $.ajax({
    url: url,
    type: 'POST',
    data: data ? data : {},
    // beforeSend: function () {
    //   $(".loading").show();
    // },
    contentType: 'application/json;charset=UTF-8',
    dataType: 'json',
    success: function (data) {
      if (success) {
        success(data);
      }
    },
    error: function (data) {
      if (error) {
        error(data);
      }
    },
    complete: function () {
      // $('.loading').hide();
      if (comp) {
        comp(data);
      }
    }
  });
}

// ajaxpost同步请求
function ajaxPost_syn(url, data, success, error, comp) {
  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    async: false,
    // contentType: 'application/json;charset=UTF-8',
    data: data ? data : {},
    // beforeSend: function () {
    //   $(".loading").show();
    // },
    success: function (data) {
      if (success) {
        success(data);
      }
    },
    error: function (data) {
      if (error) {
        error(data);
      }
    },
    complete: function () {
      // $('.loading').hide();
      if (comp) {
        comp(data);
      }
    }
  });
}

// ajaxget请求 无缓存
function ajaxGet(url, data, success, error) {
  $.ajax({
    url: url,
    data: data ? data : {},
    //cache: false,
    // beforeSend: function () {
    //   $(".loading").show();
    // },
    async: false,
    success: function (data) {
      if (success) {
        success(data);
      }
    },
    // complete: function () {
    //   $('.loading').hide();
    // },
    error: function (data) {
      if (error) {
        error(data);
      }
    }
  });
}

//信息提示
function layerMsg(msg) {
  layer.open({
    content: msg,
    skin: 'msg',
    time: 2
  });
}

//历史回退
function goBack() {
  window.history.back();
}

// 获取openid
function getOpenid(){
  const url = new URL(window.location);
  let openid = url.searchParams.get('openid');
  if(openid) {
    setLoc('openid', openid)
  }
  openid = openid ? openid : localStorage.getItem('openid')
  
  // if (!openid) {
  //   window.location.href = apipath + '/aoc/api/wechat/wechatindex';
  // }
  return openid
}