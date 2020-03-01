// pages/myassesinfo/myassesinfo.js
var app = getApp();
var url = "";
var util = require('../../utils/util.js'); //加密算法
var nonceStr = null;
var package2 = null;
var paySign = null;
var signType = null;
var timeStamp = null;
var outtradeno = "";
var orderId='';
Page({
  data: {
    insName: "",
    sex: "",
    age: "",
    insIdCard: "",
    orderStatus: "",
    orderNo: "",
    createdTime: "",
    insPhone: "",
    appointedAddress: "",
    contactName: "",
    contactSex: "",
    contactIdcard: "",
    relationshipInsUser: "",
    city: "",
    contactPhone: "",
    id: "",
    go_pay:false,
  },

  onLoad: function (options) {
    url = app.globalData.URL;
    var _this = this;
    var orderNo = options.newsid;
    var tokens = wx.getStorageSync('token');
    orderId = options.newsid;
    var url2 = url+"user_apply_order";
    wx.request({
      method: "post",
      url: url2,
      data: {
        act: "getUserApplyOrder",
        orderNo: orderNo,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': tokens
      },
      success(res) {
        console.log(res.data.dataList[1][0].orderStatus)
        if (res.data.dataList[1][0].orderStatus==-4){
          _this.setData({
            go_pay: true
          })
        }
        if (res.data.errorCode == 0) {
          _this.setData({
            insName: res.data.dataList[1][0].insName,
            age : res.data.dataList[1][0].age,
            insIdCard : res.data.dataList[1][0].insIdCard,
            contactPhone : res.data.dataList[0][0].contactPhone,
            createdTime : res.data.dataList[1][0].createdTime,
          })
          var orderStatus = res.data.dataList[1][0].orderStatus;
          switch (orderStatus) {
            case -1:
              orderStatus = "参保人取消";
              break;
            case -2:
              orderStatus = "为评估人取消";
              break;
            case -3:
              orderStatus = "系统取消";
              break;
            case -4:
              orderStatus = "待支付";
              break;
            case -5:
              orderStatus = "支付失败";
              break;
            case 0:
              orderStatus = "未分配";
              break;
            case 1:
              orderStatus = "已完成评估";
              break;
            case 2:
              orderStatus = "待接单";
              break;
            case 3:
              orderStatus = "待评估";
              break;
            case 4:
              orderStatus = "正在评估";
              break;
            case 5:
              orderStatus = "评估师A完成评估";
              break;
            case 6:
              orderStatus = "已评估";
              break;
            case 8:
              orderStatus = "待指派";
              break;
            case 10:
              orderStatus = "待审核";
              break;
            case 11:
              orderStatus = "审核不通过";
              break;
            default:
              orderStatus = "未分配";
              break;
          }
          _this.setData({
            orderStatus: orderStatus,
            orderNo: res.data.dataList[1][0].orderNo,
            insPhone: res.data.dataList[0][0].insPhone,
            appointedAddress: res.data.dataList[0][0].appointedAddress,
            contactName: res.data.dataList[0][0].contactName,
            contactIdcard: res.data.dataList[0][0].contactIdcard,
          })
          var sex = res.data.dataList[1][0].sex;
          if (sex == "M") {
            _this.setData({
              sex:"男"
            })
          } else {
            _this.setData({
              sex: "女"
            })
          }
          var contactSex = res.data.dataList[0][0].contactSex;
          if (contactSex == "M") {
            _this.setData({
              contactSex: "男"
            })
          } else {
            _this.setData({
              contactSex: "女"
            })
          }
          var relationshipInsUser = res.data.dataList[0][0].relationshipInsUser;
          switch (relationshipInsUser) {
            case 0:
              relationshipInsUser = "自己";
              break;
            case 1:
              relationshipInsUser = "子女";
              break;
            case 2:
              relationshipInsUser = "父母";
              break;
            case 3:
              relationshipInsUser = "配偶";
              break;
            case 4:
              relationshipInsUser = "兄弟姐妹";
              break;
            case 5:
              relationshipInsUser = "朋友";
              break;
            case 6:
              relationshipInsUser = "其他";
              break;
            default:
              break;
          }
          _this.setData({
            relationshipInsUser: relationshipInsUser,
            city: res.data.dataList[0][0].city,
          })
        } 
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  //支付函数
  pay2() {
    wx.requestPayment(
      {
        timeStamp: timeStamp,  //时间戳
        nonceStr: nonceStr,  //随机字符串
        package: package2, //统一下单接口返回的 prepay_id 参数值
        signType: signType,
        paySign: paySign, //签名
        success(res) {
          console.log(res)
          wx.request({
            url: url + 'wechat/pay/status',
            method: "get",
            header: {
              'content-type': 'application/json',
            },
            data: {
              outtradeno: outtradeno
            },
            success: function (res) {
              console.log(res.data.data.resultCode)
              switch (res.data.data.resultCode) {
                case 1:
                  wx.navigateTo({
                    url: '../successful/successful'
                  })
                  break;
                case 2:
                  wx.showModal({
                    content: '您支付失败',
                    success(res) {
                      if (res.confirm) {
                        wx.navigateTo({
                          url: '../successful/successful'
                        })
                      } else if (res.cancel) {
                        wx.navigateTo({
                          url: '../successful/successful'
                        })
                      }
                    }
                  })
                  break;
                case 3:
                  wx.showModal({
                    content: '您未支付订单',
                    success(res) {
                      if (res.confirm) {
                        wx.navigateTo({
                          url: '../successful/successful'
                        })
                      } else if (res.cancel) {
                        wx.navigateTo({
                          url: '../successful/successful'
                        })
                      }
                    }
                  })
                  break;
                case 4:
                  wx.showToast({
                    title: '支付中',
                    icon: 'success',
                    duration: 2000
                  })
                  break;
                case 5:
                  wx.showModal({
                    content: '订单已关闭',
                    success(res) {
                      if (res.confirm) {
                        wx.navigateTo({
                          url: '../successful/successful'
                        })
                      } else if (res.cancel) {
                        wx.navigateTo({
                          url: '../successful/successful'
                        })
                      }
                    }
                  })
                  break;
                default:
                  break;
              }
            },
            fail(err) {
              console.log(err)
            }
          })
        },
        fail(err) {
          console.log(err)
        }
      })
  },
  //登录获取信息
  go_pay(){
    var that = this;
    wx.login({
      success: function (res) {
        var userId = wx.getStorageSync('userId');
        var passw = userId + orderId;
        var password = util.sha1(passw);
        console.log(res) //获取用户的code  微信返回的值 
        wx.request({
          url: url + 'wechat/pay/prepay',
          method: "POST",
          header: {
            'content-type': 'application/json',
          },
          data: {
            code: res.code,
            userId: userId,
            orderId: orderId,
            sign: password,
          },
          success: function (res) {
            console.log(res)
            outtradeno = res.data.data.outtradeno
            console.log(outtradeno)
            // if (res.data.resultCode == "000000"){
            nonceStr = res.data.data.nonceStr;
            package2 = res.data.data.package;
            paySign = res.data.data.paySign;
            signType = res.data.data.signType;
            timeStamp = res.data.data.timeStamp;
            that.pay2()
            // }
            console.log(res.data.data.nonceStr)
            console.log(res.data.data.package)
            console.log(res.data.data.paySign)
            console.log(res.data.data.signType)
            console.log(res.data.data.timeStamp)
          },
          fail(err) {
            console.log(err)
          }
        })
      },
      fail(errs) {
        console.log(errs)
      }
    })
  }
})