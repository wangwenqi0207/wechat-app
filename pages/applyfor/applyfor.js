// pages/applyfor/applyfor.js
var insName;
var insIdcard;
var address;
var contactName;
var contactIdcard;
var contactPhone;
var app = getApp();
var url = "";
Page({
  data: {
    userName:'',
    insIdcard:''
  },
  userName: function (e) {
    this.setData({
      userName: e.detail.value.trim()
    })  
  },
  insIdcard: function (e) {
      this.setData({
        insIdcard: e.detail.value.trim()
    }) 
  },
  formSubmit: function (e) {
    console.log(e.detail.value)
    var tokens = wx.getStorageSync('token');
    var insIdcard = this.data.insIdcard;
    var userName = this.data.userName;
    var act = "checkIdCard";
    if (this.data.userName == null || this.data.userName == "" || this.data.insIdcard == null || this.data.insIdcard == "") {
      wx.showToast({
        title: '请输入姓名或身份证',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.request({
        method: "POST",
        url: url+'check_idcard',
        data: {
          act: act,
          insIdcard: insIdcard
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          "token": tokens,
        },
        success(res) {
          console.log(res)
          console.log(userName)
          if (res.data.errorCode == 0) {
            console.log("信息发送成功")
            wx.setStorageSync("userName", userName)
            wx.setStorageSync("idCard", insIdcard)
            if (res.data.sex == "F") {
              var sex = "女"
            } else if (res.data.sex == "M") {
              var sex = "男"
            }
            wx.setStorageSync("sex", sex)
            wx.redirectTo({
              url: '../user_info/user_info'
            })
          }
          if (res.data.errorCode == 1100) {
            wx.showToast({
              title: '您已经提交过信息',
              icon: 'none',
              duration: 2000
            })
          }    
        },
        fail(err) {
          console.log('失败原因',err)
          wx.showToast({
            title: '信息提交失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },
  onLoad: function (options) {
     url = app.globalData.URL
     insName = wx.getStorageSync('insName');
     insIdcard = wx.getStorageSync('insIdcard');
    this.setData({
      userName: insName
    })
    this.setData({
      insIdcard: insIdcard
    })
    console.log(insName)
    console.log(insIdcard)
  },

})