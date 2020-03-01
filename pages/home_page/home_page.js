// pages/home_page/home_page.js
var app = getApp();
var url = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCall: false,
  },
  my_asses() {
    wx.navigateTo({
      url: '../bilityform/bilityform'
    })
  },
  apply_for() {
    wx.navigateTo({
      url: '../applyfor/applyfor'
    })
    // console.log("sss")
  },
  go_myasses(){
    wx.navigateTo({
      url: '../myasses/myasses'
    })
  },
  onLoad: function (options) {
    url = app.globalData.URL
    var phoneNumber = wx.getStorageSync('phoneNumber');
    var tokens = wx.getStorageSync('token');
    wx.request({
      method: "POST",
      url: url+'customer_contact_login',
      data: {
        act: "AppLogin",
        phoneNumber: phoneNumber
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': tokens,
      },
      success(res) {
        //console.log(res.data)
       
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  cllOut(e) {
    this.setData({isCall:true})
  },
  cllOut2(e) {
    wx.makePhoneCall({
      phoneNumber: '400365099',
      success(res) {
        //console.log(res)
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  callOff(e) {
    this.setData({ isCall: false })
  },
 
})