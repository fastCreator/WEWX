import APIConnection from './APIConnection'
// 配置项
var wsUri = 'ws://47.105.103.75:51717/jiabao'
const httpUri = 'http://www.baodesc.com'
var testUser = {
  // 'ip': '192.168.135.57',
  'ip': 'localhost',
  'openid': 'wxc6fb62c4ea043404',
  'access_token': '13_QUhx7hedJV1pqvKBqcK6EuPh9rQeYzlBpBV7GPWtbkBuVPtIU3upvYnC3RJR4GsRaO2x3wCeSpjlAFVKnLllCg&state=aHR0cDovLzEyNy4wLjAuMTo4MDgwLyMvcGFnZS9zaGFyZQ=='
}
// END配置项
var apiCallback = {}
var apiconn = null
function getData (attr, callback) {
  // attr.person_id=person_id;
  // window.console.info('send:', JSON.stringify(attr))
  // 发送信息
  apiCallback[attr.obj + '_' + attr.act] = function (data) {
    // window.console.log("获取信息:",data);
    if (data.derr || data.ERR) {
      if (window.Toast) {
        window.Toast(data.ustr || data.ERR)
      } else {
        console.error('Toast:' + (data.ustr || data.ERR))
      }
    } else if (callback) {
      callback(data)
    }
  }
  apiconn.send_obj(attr)
}

function startApiconn () {
  // 全局SDK用的变量 【初始化和登录 A】
  apiconn = new APIConnection()
  // 服务端连接状态改变了的通知 【初始化和登录 B】
  apiconn.state_changed_handler = function (ds) {
    // window.console.log(ds, 'state: ' + apiconn.from_state, ' => ' + apiconn.conn_state)
    // 这时候成功进入登录状态了。没登录时候只是访客状态。
    if (apiconn.conn_state === 'IN_SESSION') {
      sessionStorage.setItem('login_name', apiconn.login_name)
      sessionStorage.setItem('login_passwd', apiconn.login_passwd)
      // 连接状态，表明SDK和服务端已经成功连上，获得了 server_info
      // 客户端可以允许用户输入密码（或从客户端保存密码）进行登录了
    } else if (apiconn.conn_state === 'LOGIN_SCREEN_ENABLED') {

      // 自动登录指定账户
      // apiconn.credential(login_name, login_passwd);
      // apiconn.connect();
      // auto re login after page refresh
      // 处理网页刷新自动登录的机制
    }
  }
  // SDK 说服务端有数据过来了，这可以是请求的响应，或推送 【初始化和登录 C】
  apiconn.response_received_handler = function (jo) {
    var key = jo.obj + '_' + jo.act
    // window.console.log(key, 'JO:', jo)
    // if (key == 'server_info') {
    //   apiInfoData = jo
    // }
    if (apiCallback[key]) {
      apiCallback[key](jo)
    }
  }
}

function init (deal, startCall) {
  var match = location.href.match(/\?([^#/]+)/)
  var search = match ? match[1] : ''
  // var search = decodeURI(location.search)
  var searchObj = {}
  if (search !== '') {
    search.split('&').forEach(function (data) {
      var datas = data.split('=')
      searchObj[datas[0]] = datas[1]
    })
  }

  if (deal) {
    for (let key in deal) {
      if (searchObj[key]) {
        localStorage[key] = searchObj[key]
      }
    }
  }

  if (!location.host.match(testUser.ip)) {
    if (!searchObj.openid) {
      location.href = httpUri + '/cgi-bin/get.pl?redirect=' + window.btoa(location.href)
      return false
    }
  } else {
    searchObj = testUser
  }
  window.access_token = searchObj['access_token']
  startApiconn()
  apiconn.wsUri = wsUri

  apiCallback['server_info'] = function () {
    if (startCall) {
      startCall(searchObj)
    }
  }
  apiconn.connect()
}
// 登录
function login (searchObj, deal, call) {
  apiCallback['person_login'] = function (data) {
    // 这是入口
    if (call) {
      call(data)
    }
  }
  var openid = searchObj.openid
  var accessToken = searchObj.access_token
  var attr = {
    'access_token': accessToken,
    'ctype': 'user',
    'openid': openid
  }
  if (deal) {
    for (let key in deal) {
      if (localStorage[key] && deal[key] === 'attr') {
        attr[key] = localStorage[key]
      }
    }
  }
  apiconn.credentialx(attr)
  apiconn.connect()
}

var server = {
  admin_accountlist: function (call) {
    // 账号列表
    var attr = {
      'obj': 'admin',
      'act': 'accountlist'
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  to_cart_point: function (id, call) {
    var attr = {
      'obj': 'product',
      'act': 'to_cart_point',
      product_id: id,
      product_number: 1
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  p_order_addr_update: function (id, call) {
    var attr = {
      'obj': 'order',
      'act': 'addr_update',
      'order_id': id
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  collection_delete_point: function (id, call) {
    var attr = {
      'obj': 'product',
      'act': 'collection_delete_point',
      collection_id: id
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  p_point_show: function (call) {
    var attr = {
      'obj': 'point',
      'act': 'show'
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  cart_list_delete_tailored: function (id1, id2, call) {
    var attr = {
      'obj': 'cart',
      'act': 'list_delete_tailored',
      'cart_list_id': id1,
      'product_id': id2
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  cart_list_delete_point: function (id1, id2, call) {
    var attr = {
      'obj': 'cart',
      'act': 'list_delete_point',
      'cart_list_id': id1,
      'product_id': id2
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  order_list_search: function (name, call) {
    var attr = {
      'obj': 'order',
      'act': 'list_search',
      state: name
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  qrcode_create: function (call) {
    var attr = {
      'obj': 'QRcode',
      'act': 'create',
      'access_token': window.access_token
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  order_delete: function (id, call) {
    var attr = {
      'obj': 'order',
      'act': 'delete',
      order_id: id
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  wepay_test: function (id, call) {
    var attr = {
      'obj': 'wepay',
      'act': 'test',
      openid: id
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  wepay_wx: function (id, call) {
    var attr = {
      'obj': 'wepay',
      'act': 'wx',
      order_id: id
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  list_create_charge: function (amount, call) {
    var attr = {
      'obj': 'order',
      'act': 'list_create_charge',
      amount: amount
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  p_point_exchange: function (jf, call) {
    var attr = {
      'obj': 'point',
      'act': 'exchange',
      amount: jf
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  p_point_give: function (amount, accepter, type, call) {
    var attr = {
      'obj': 'point',
      'act': 'give',
      amount: amount,
      accepter_name: accepter,
      pt_type: type
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  list_create_point: function (call) {
    var attr = {
      'obj': 'order',
      'act': 'list_create_point'
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  list_create_tailored: function (call) {
    var attr = {
      'obj': 'order',
      'act': 'list_create_tailored'
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  qr_create: function (amount, accepter, type, call) {
    var attr = {
      'obj': 'qr',
      'act': 'create',
      amount: amount,
      accepter_name: accepter,
      pt_type: type
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  qr_read: function (code, call) {
    var attr = {
      'obj': 'qr',
      'act': 'read',
      qr_code: code
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  addr_list_id: function (id, call) {
    var attr = {
      'obj': 'person',
      'act': 'addr_default',
      addr_list_id: id
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  right_now_point: function (id, call) {
    var attr = {
      'obj': 'buy',
      'act': 'right_now_point',
      product_id: id,
      product_number: 1
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  checkout_point: function (id, call) {
    var attr = {
      'obj': 'checkout',
      'act': 'point',
      order_id: id
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  right_now_tailored: function (id, call) {
    var attr = {
      'obj': 'buy',
      'act': 'right_now_tailored',
      product_id: id,
      product_number: 1
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  chargecheckout: function (amount, call) {
    var attr = {
      'obj': 'charge',
      'act': 'checkout',
      amount: amount
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  person_change: function (numb, call) {
    var attr = {
      'obj': 'person',
      'act': 'change',
      phone_number: numb
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  collection_delete_tailored: function (id, call) {
    var attr = {
      'obj': 'product',
      'act': 'collection_delete_tailored',
      collection_id: id
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  collection_display_point: function (call) {
    var attr = {
      'obj': 'product',
      'act': 'collection_display_point'
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  fansShow: function (call) {
    var attr = {
      'obj': 'fans',
      'act': 'show'
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  details_show: function (type, call) {
    var attr = {
      'obj': 'point',
      'act': 'details_search',
      point_type: type
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  collection_display_tailored: function (call) {
    var attr = {
      'obj': 'product',
      'act': 'collection_display_tailored'
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  person_addr_add: function (obj, call) {
    var attr = {
      'obj': 'person',
      'act': 'addr_add'
    }
    getData(Object.assign(attr, obj), function (data) {
      if (call) {
        call(data)
      }
    })
  },
  person_addr_details: function (call) {
    var attr = {
      'obj': 'person',
      'act': 'addr_details'
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  hasaddr: function (call) {
    var attr = {
      'obj': 'person',
      'act': 'addr_details'
    }
    getData(attr, function (data) {
      if (call) {
        if (!data.list_out.length || !data.list_out.find(it => it.default === 'true')) {
          call(false)
        } else {
          call(true)
        }
      }
    })
  },
  category_inquire: function (call) {
    // 商品分类列表
    var attr = {
      'obj': 'category',
      'act': 'inquire'
    }
    getData(attr, function (data) {
      if (call) {
        call(data.category_list)
      }
    })
  },
  p_cart_number_edit_tailored: function (id, num, call) {
    var attr = {
      'obj': 'cart',
      'act': 'number_edit_tailored',
      cart_id: id,
      number: num + ''
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  bonus2useful_show: function (call) {
    var attr = {
      'obj': 'point',
      'act': 'bonus2useful_show'
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  p_order_details: function (id, call) {
    var attr = {
      'obj': 'order',
      'act': 'details',
      'order_id': id
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  p_cart_number_edit_point: function (id, num, call) {
    var attr = {
      'obj': 'cart',
      'act': 'number_edit_point',
      cart_id: id,
      number: num + ''
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  product_collection_point: function (id, call) {
    var attr = {
      'obj': 'product',
      'act': 'collection_point',
      product_id: id,
      type: 'product_collection_point'
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  product_collection_tailored: function (id, call) {
    var attr = {
      'obj': 'product',
      'act': 'collection_tailored',
      product_id: id,
      type: 'product_collection_tailored'
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  to_cart_tailored: function (id, call) {
    var attr = {
      'obj': 'product',
      'act': 'to_cart_tailored',
      product_id: id,
      product_number: 1
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  product_list_tailored: function (id, call) {
    var attr = {
      'obj': 'product',
      'act': 'list_tailored',
      category_id: id,
      sale_state: ''
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  product_list_point: function (id, call) {
    var attr = {
      'obj': 'product',
      'act': 'list_point',
      category_id: id,
      sale_state: ''
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  product_details_point: function (id, call) {
    var attr = {
      'obj': 'product',
      'act': 'details_point',
      product_id: id
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  product_details_tailored: function (id, call) {
    var attr = {
      'obj': 'product',
      'act': 'details_tailored',
      product_id: id
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  cart_details_point: function (call) {
    var attr = {
      'obj': 'cart',
      'act': 'details_point'
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  },
  cart_details_tailored: function (call) {
    var attr = {
      'obj': 'cart',
      'act': 'details_tailored'
    }
    getData(attr, function (data) {
      if (call) {
        call(data)
      }
    })
  }
}

window.server = server
window.ajax = getData
window.apiconn = apiconn
window.start = function (cb, deal) {
  init(deal, function (searchObj) {
    login(searchObj, deal, (data) => {
      cb(data)
      if (deal) {
        for (let key in deal) {
          if (localStorage[key] && typeof (deal[key]) === 'function') {
            deal[key](localStorage[key])
            localStorage[key] = ''
          }
        }
      }
    })
  })
}
