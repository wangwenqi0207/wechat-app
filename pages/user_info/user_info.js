// pages/user_info/user_info.js
var app = getApp();
var url = "";
Page({

  data: {
    user:'',
    card:'',
    sex:'',
    detail_phone:'',
    filesName: "",
    filesName2: "",
    srcbox1:"/images/card_f.jpg",
    srcbox2:"/images/card_b.jpg"
  },
  onLoad: function (options) {
    url = app.globalData.URL;
    var user = wx.getStorageSync('userName');
    this.setData({
      user: user
    })
    var card = wx.getStorageSync('idCard');
    this.setData({
      card: card
    })
    var sex = wx.getStorageSync('sex');
    this.setData({
      sex: sex
    })
    var detail_phone = wx.getStorageSync('phoneNumber');
    this.setData({
      detail_phone: detail_phone
    })
  },
  uploadimg1: function () {
    var that = this;
    wx.chooseImage({  //从本地相册选择图片或使用相机拍照
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res.tempFilePaths[0])
        //前台显示
        that.setData({
          srcbox1: res.tempFilePaths[0]
        })
        var tempFilePaths = res.tempFilePaths
        var phoneNumber = wx.getStorageSync('phoneNumber');
        wx.uploadFile({
          url: url +'upload_file',
          filePath: tempFilePaths[0], //必须写[0] 不然真机上无法预览
          name: 'imgFile',
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData: {
            "phoneNumber": phoneNumber,
            "imgFile": tempFilePaths[0]
          },
          success: function (res) {
           var data= JSON.parse(res.data);
            if(data.errorCode="0"){
              var filepic1 = data.file
              wx.setStorageSync("filepic1", filepic1)
              that.setData({
                filesName: data.file
              })
            }
          },
          fail(err) {
            console.log(err)
            wx.showToast({
              title: '上传失败，请重新上传',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    })
  },
  uploadimg2: function () {
    var that = this;
    wx.chooseImage({  //从本地相册选择图片或使用相机拍照
      count: 1, // 默认9
      // sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      // sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        //前台显示
        that.setData({
          srcbox2: res.tempFilePaths[0]  //必须写[0] 不然真机上无法预览
        })
        var tempFilePaths = res.tempFilePaths
        var phoneNumber = wx.getStorageSync('phoneNumber');
        wx.uploadFile({
          url: url +'upload_file',
          filePath: tempFilePaths[0],
          name: 'imgFile',  //需要指定为参数名
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData: {
            "phoneNumber": phoneNumber,
            "imgFile": tempFilePaths[0]
          },
          success: function (res) {
            var data2 = JSON.parse(res.data);
            if (data2.errorCode = "0") {
              var filepic2 = data2.file
              wx.setStorageSync("filepic2", filepic2)
              that.setData({
                filesName2: data2.file
              })
            }
          },
          fail(err) {
            wx.showToast({
              title:'上传失败，请重新上传',
              icon: 'none',
              duration: 2000
            })
            console.log(err)
          }
        })
      }
    })
  },
  userNext(){
    if ((this.data.filesName && this.data.filesName2) == "") {
      wx.showToast({
        title: '您还未上传身份证',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../link_man/link_man'
      })
    }      
  }
})