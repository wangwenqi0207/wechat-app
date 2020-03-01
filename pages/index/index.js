//index.js
var token;
var showMsg;
var app = getApp();
var url="";
Page({
  data: {
    phone_number:"",
    time: null,
    isDisabled: false,
    dialogShow: false,
    get_code:"获取验证码",
    code_active:false,
  },
  //点击获取验证码按钮 如果手机号填写正确 开始获取
  get_login(e){
    //var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
    //console.log(this.data.phone_number)
    if (this.data.phone_number == '') {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 2000
      })
      // this.getLogin = false
    // } else if (!reg.test(this.data.phone_number)) {
    //   wx.showToast({
    //     title: '手机格式不正确',
    //     icon: 'none',
    //     duration: 2000
    //   })
      // this.getLogin = false
    } else {
      this.setData({ 
        time: 60,
      })
      this.timer()
      this.sendCode()
    }
    //this.data.isDisabled = true
  },
  timer() {
    if (this.data.time > 0) {
      this.setData({ code_active: true, isDisabled: true, get_code: this.data.time + "秒"})
      this.data.time--;
      setTimeout(this.timer, 1000);
    } else {
      this.data.time = 0;
      this.setData({ get_code: "获取验证码", isDisabled: false, code_active: false })
    }
    // console.log(this.data.time)
  },
  //用户输入的数据实时监听
  //获取用户输入的电话
  phone_number: function (e) {
    this.setData({
      phone_number: e.detail.value
    })
    //console.log(this.data.phone_number)
  },
  //获取用户输入的验证码
  check_code: function (e) {
    this.setData({
      check_code: e.detail.value
    })
    //console.log(this.data.check_code)
  },
  //获取验证码请求发起
  sendCode() {
    var phoneNumber = this.data.phone_number;
    var data = JSON.stringify({ 'phoneNumber': phoneNumber });  //如果传的参数是对象，需要用JSON.stringify转义
    //console.log(phoneNumber)
    wx.request({
      method: "POST",
      url: url +'send_veri_code',
      data: {
        params: data
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data)
        var getToken = res.data.errorMsg.split(":");  //分割errorMsg
        token = getToken[1];  //获取token
        showMsg = getToken[0];  //获取验证码
        //存一个过期时间
        var timestamp = Date.parse(new Date());
        var expiration = timestamp + 1296000000;//2592000秒（一个月）
        wx.setStorageSync("index_data_expiration", expiration);
        if (res.data.errorCode == 0) {
          wx.setStorageSync('token', token);
          wx.setStorageSync('phoneNumber', phoneNumber);
        } else {
          if (res.data.errorMsg == null || res.data.errorMsg == "") {
            wx.showToast({
              title: '获取验证码失败！',
              icon: 'none',
              duration: 2000
            })
          } else {
            //console.log(res.data);
          }
        }
      },
      fail(err) {
        //console.log(err)
      }
    })
  },
  // 点击下一步
  formSubmit: function (e) {
    //console.log(e.detail.value)
    var str = Math.random() * 100;
    var str1 = str.toFixed(6)
    var time = new Date().getTime();
    //获取设备信息  
    var version;
    wx.getSystemInfo({
      success(res) {
        //console.log(res.model)
        version = res.model
      }
    })
    var appId = version + '-' + time + '-' + str1;
    var tokens = wx.getStorageSync('token');
    var veriCode = this.data.check_code;
    var phoneNumber = this.data.phone_number;
    var datas = JSON.stringify({ "veriCode": veriCode, "phoneNumber": phoneNumber, "appId": appId});
    var _this= this;
    wx.request({
      method: "POST",
      url: url+'register_login',
      data: {
        params: datas
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': tokens
      },
      success(res) {
         var userId = res.data.response.userId
        console.log(res.data)
        wx.setStorageSync('userId', userId);
        if (res.data.errorCode = "0") {
          if (showMsg === _this.data.check_code && _this.data.check_code != undefined) {
            wx.navigateTo({
              url: '../home_page/home_page'
            })
          } else {
            wx.showToast({
              title: '请您先登录或输入正确的验证码',
              icon: 'none',
              duration: 2000
            })
          }
        }
      },
      fail(err) {
        wx.showToast({
          title: '您登录失败',
          icon: 'none',
          duration: 2000
        })
        console.log('失败原因',err)
      }
    })
  }, 
 
  //页面加载完后，获取本地保存的数据 
  onLoad: function (options) {
    url = app.globalData.URL
    //console.log(url)
    //体验版打开调试
    wx.setEnableDebug({
      enableDebug: true
    })
    var expiration = wx.getStorageSync("index_data_expiration");//拿到过期时间
    //console.log(expiration)
    var timestamp = Date.parse(new Date());//拿到现在时间
    //进行时间比较
    if (expiration < timestamp) {//过期了，清空缓存，跳转到登录
      console.log("缓存已过期");
      wx.clearStorageSync();//清空缓存
      return;
    }
    //获取本地保存的token
    var tokens = wx.getStorageSync('token');
    wx.request({
      method: "POST",
      url: url +'checkToken',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': tokens,
      },
      success(res) {
        //console.log(res.data.resultCode)
        if (res.data.resultCode == "000000") {
          setTimeout(function () {
            wx.navigateTo({
              url: '../home_page/home_page'
            })
          }, 0)
        } else {
          return
        }
      },
      fail(err) {
        //console.log(err)
      }
    })
  },
 })

//  本地存储过期时间