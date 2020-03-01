// pages/imgdemo/imgdemo.js
Page({
  data: {


  },
  onLoad: function (options) {
  },
  
  pay() {
    wx.requestPayment(
      {
        timeStamp: "1566623306",  //时间戳
        nonceStr: "F5rEcSX9Ua5E8z1OK11dQzxFK9H7yjYQ",  //随机字符串
        package: "prepay_id=wx2413082656444781a84ad0381805657000", //统一下单接口返回的 prepay_id 参数值
        signType: 'MD5',
        paySign: "CEF7F7C45F6B628EEF8ED661CE834703", //签名
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
    })

  }
})