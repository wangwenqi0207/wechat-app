// pages/myasses/myasses.js
var app = getApp();
var url = "";
Page({
  data: {
    orderStatus: "",
    createdTime: "",
    showList: true,
    noList: false,
    datalist: "",
    orderList: [
      {
        orderNo: "", insName: "", insIdCard: "", sex: "", age: "", orderStatus: "", createdTime: "",
      },
    ]
  },
  onLoad: function (options) {
    url = app.globalData.URL
    //console.log(this.orderList[1].orderNo)
    var phoneNumber = wx.getStorageSync('phoneNumber');
    var _this = this;
    var tokens = wx.getStorageSync('token');
    var url2 = url+"user_apply_order_list";
    wx.request({
      method: "post",
      url: url2,
      data: {
        act: "getOrderList",
        pageSize: "100",
        pageNo: "1",
        phoneNumber: phoneNumber
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': tokens
      },
      success(res) {
        console.log(res)
           if (res.data.errorCode = "0") {
             _this.setData({
               orderList: res.data.dataList,
             })
            
            for (var p in _this.data.orderList) {
            var dataList = 'orderList[' + p + '].sex';
            if (_this.data.orderList[p].sex == "M") {
              _this.setData({
                [dataList]: "男"
              })
            } else {
              _this.setData({
                [dataList]: "女"
              })
            }

            var dataList2 = 'orderList[' + p + '].orderStatus';
            var orderStatus = _this.data.orderList[p].orderStatus;
            
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
                 [dataList2]: orderStatus
               })
          }
             _this.setData({
               noList: false
             })
       }
        if (res.data.dataList.length ==0){
          _this.setData({
            noList: true
          })
       }
      },
      fail(err) {
        console.log(err)
      } 
    })
  },
  go_info(e){
    var orderNo = e.currentTarget.dataset.newsid;
    //console.log(orderNo)
    wx.navigateTo({
      url: '../myassesinfo/myassesinfo?newsid=' + orderNo,
    })
  }
})