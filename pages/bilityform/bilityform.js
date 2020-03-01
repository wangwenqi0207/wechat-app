// pages/bility_login/bility_login.js
import * as watch from "./watch.js";
var province;
var nextcity;
var district;
var codeProvince;
var codeCity;
var codeArea;
var score=0;
var score_radio1=0;
var score_radio2=0;
var score_radio3 =0;
var score_radio4 = 0;
var score_radio5 = 0;
var score_radio6 = 0;
var q1=null;
var q2 = null;
var q3 = null;
var q4 = null;
var q5 = null;
var q6 = null;
var app = getApp();
var url = "";
Page({

  data: {
    name:"",
    idcard:"",
    address: "",
    linkname: "",
    linkcard: "",
    linkNum: "",

    chooseCity: "点击我选择",
    selected: '',
    citySelected: '',
    areaSelected: '',
    provinceL: [],
    cityL: [],
    areaL: [],
    city: [],
    provinceName: '',
    cityName: '',
    areaName: '',
    showProvince: true,
    showCity: false,
    showCity2: false,
    showarea: false,
    chooseTit1: "省",
    chooseTit2: "市",
    chooseTit3: "区",
    tit1: true,
    tit2: false,
    tit3: false,
    mackShow: false,

    grade_name: '请选择',
    link_options:"",
    grades: [{
      id: '0',
      label: '自己'
    }, {
      id: '1',
      label: '子女'
    }, {
      id: '2',
      label: '父母'
    }, {
      id: '3',
      label: '配偶'
    }, {
      id: '4',
      label: '兄弟姐妹'
    }, {
      id: '5',
      label: '朋友'
    }, {
      id: '6',
      label: '其他'
    }],

    score: 0,
    score_radio1:"",
    score_radio2: "",
    score_radio3: "",
    score_radio4: "",
    score_radio5: "",
    score_radio6: "",
    radios: [
      {
        value: 0,
        label: "使用餐具将饭菜送入口、咀嚼、吞咽等步骤",
      },
      {
        value: 5,
        label: "使用餐具，在切碎、搅拌等协助下完成"
      },
      {
        value: 10,
        label: "使用餐具有困难，进食需要帮助"
      },
      {
        value: 20,
        label: "不能自主进食，或伴有吞咽困难，完全需要帮助（如喂食、鼻饲等）"
      },
    ],
    radios2: [
      {
        value: 0,
        label: "独立完成",
      },
      {
        value: 5,
        label: "头部清洁能独立完成，洗浴需要协助"
      },
      {
        value: 10,
        label: "在他人协助下能完成部分头部清洁；洗浴需要帮助"
      },
      {
        value: 20,
        label: "完全需要帮助"
      },
    ],
    radios3: [
      {
        value: 0,
        label: "独立完成",
      },
      {
        value: 5,
        label: "需要他人协助，在适当时间内完成部分穿衣"
      },
      {
        value: 10,
        label: "在他人协助下，仍需在较长时间内完成部分 穿衣"
      },
      {
        value: 20,
        label: "完全需要帮助"
      },
    ],
    radios4: [
      {
        value: 0,
        label: "如厕不需协助",
      },
      {
        value: 5,
        label: "在适当提示和协助下能如厕或使用便盆"
      },
      {
        value: 10,
        label: "在很多提示和协助下尚能如厕或使用便盆"
      },
      {
        value: 20,
        label: "如厕完全需要帮助"
      },
    ],
    radios5: [
      {
        value: 0,
        label: "独立完成",
      },
      {
        value: 5,
        label: "借助较小外力或辅助装置能完成站立、转移、行走、上下楼梯等"
      },
      {
        value: 10,
        label: "动则气急喘息，借助较大外力才能完成站立、转移、行走，不能上下楼梯"
      },
      {
        value: 20,
        label: "卧床不起；休息状态下时有气息喘息，难以站立；移动完全需要帮助"
      },
    ],
    radios6: [
      {
        value: 0,
        label: "无帕金森病、中风后遗症等导致上述能力受限的疾病",
      },
      {
        value: 10,
        label: "有帕金森病、中风后遗症等导致上述能力受限的疾病之一"
      },
      {
        value: 20,
        label: "有帕金森病、中风后遗症等导致上述能力受限的疾病一种以上"
      },
    ],
    choose:'',
    parameter: [{ id: 1, name: '是' }, { id: 0, name: '否' }],
  }, 
  //点击选择事件
  radioChange(e) {
    score_radio1 = e.detail.value
    this.setData({
      score_radio1: e.detail.value,
      score: Number(score_radio1) + Number(score_radio2) + Number(score_radio3) 
        + Number(score_radio4) + Number(score_radio5)+Number(score_radio6),
    })
    score = this.data.score
    switch (e.detail.value){
      case "0":
        q1 = 1;
        break;
      case "5":
        q1 = 2;
        break;
      case "10":
        q1 = 3;
        break;
      case "20":
        q1 = 4;
        break;
      default:
         return  
    }
  },
  radioChange2(e) {
    score_radio2 = e.detail.value
    this.setData({
      score_radio2: e.detail.value,
      score: Number(score_radio1) + Number(score_radio2) + Number(score_radio3)
        + Number(score_radio4) + Number(score_radio5) + Number(score_radio6),
    }) 
    score = this.data.score
    switch (e.detail.value) {
      case "0":
        q2 = 1;
        break;
      case "5":
        q2 = 2;
        break;
      case "10":
        q2 = 3;
        break;
      case "20":
        q2 = 4;
        break;
      default:
        return
    }
  },
  radioChange3(e) {
    score_radio3 = e.detail.value
    this.setData({
      score_radio3: e.detail.value,
      score: Number(score_radio1) + Number(score_radio2) + Number(score_radio3)
        + Number(score_radio4) + Number(score_radio5) + Number(score_radio6),
    })
    score = this.data.score
    switch (e.detail.value) {
      case "0":
        q3 = 1;
        break;
      case "5":
        q3 = 2;
        break;
      case "10":
        q3 = 3;
        break;
      case "20":
        q3 = 4;
        break;
      default:
        return
    }
  },
  radioChange4(e) {
    score_radio4 = e.detail.value
    this.setData({
      score_radio4: e.detail.value,
      score: Number(score_radio1) + Number(score_radio2) + Number(score_radio3)
        + Number(score_radio4) + Number(score_radio5) + Number(score_radio6),
    })
    score = this.data.score
    switch (e.detail.value) {
      case "0":
        q4 = 1;
        break;
      case "5":
        q4 = 2;
        break;
      case "10":
        q4 = 3;
        break;
      case "20":
        q4 = 4;
        break;
      default:
        return
    }
  },
  radioChange5(e) {
    score_radio5 = e.detail.value
    this.setData({
      score_radio5: e.detail.value,
      score: Number(score_radio1) + Number(score_radio2) + Number(score_radio3)
        + Number(score_radio4) + Number(score_radio5) + Number(score_radio6),
    })
    score = this.data.score
    switch (e.detail.value) {
      case "0":
        q5 = 1;
        break;
      case "5":
        q5 = 2;
        break;
      case "10":
        q5 = 3;
        break;
      case "20":
        q5 = 4;
        break;
      default:
        return
    }
  },
  radioChange6(e) {
    score_radio6 = e.detail.value
    this.setData({
      score_radio6: e.detail.value,
      score: Number(score_radio1) + Number(score_radio2) + Number(score_radio3)
        + Number(score_radio4) + Number(score_radio5) + Number(score_radio6),
    })
    score = this.data.score
    switch (e.detail.value) {
      case "0":
        q6 = 1;
        break;
      case "10":
        q6 = 2;
        break;
      case "20":
        q6 = 3;
        break;
      default:
        return
    }
    console.log(q6)
  },
  // 监听输入
  name: function (e) {
    var v = e.detail.value;
    v = v.replace(/\s*/g, "");
    this.setData({
      name:v
    })
  },
  idcard: function (e) {
    var v = e.detail.value;
    v = v.replace(/\s*/g, "");
    this.setData({
      idcard:v
    })
  },
  address: function (e) {
    var v = e.detail.value;
    v = v.replace(/\s*/g, "");
    this.setData({
      address: v
    })
  },
  linkname: function (e) {
    var v = e.detail.value;
    v = v.replace(/\s*/g, "");
    this.setData({
      linkname: v
    })
  },
  linkcard: function (e) {
    var v = e.detail.value;
    v = v.replace(/\s*/g, "");
    this.setData({
      linkcard: v
    })
  },
  linkNum: function (e) {
    var v = e.detail.value;
    v = v.replace(/\s*/g, "");
    this.setData({
      linkNum: v
    })
  },
  watch: {
    score: function (newVal, oldVal) {
     //console.log(newVal);
    }
  },
  //页面初始化
  onLoad: function (options) {
    url = app.globalData.URL
    //监听
    watch.setWatcher(this);
    this.setData({
      score: score
    })
    //radio
    this.data.parameter[0].checked = true;
    this.setData({
      parameter: this.data.parameter,
      choose: 1
    })//默认parameter数组的第一个对象是选中的
    //city
    var url2 = url+"get_regions?parentId=0";
    var _this = this;
    wx.request({
      method: "get",
      url: url2,
      data: "data",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        //console.log(res.data)
        _this.setData({
          provinceL: res.data
        })
      },
      fail(err) {
        console.log(err)
      }
    })
  },

  // city
  //点击选择省市区
  clickCity() {
    this.setData({
      showCity: true,
      mackShow: true,
    })
  },
  //点击标题省 省出来 市隐藏
  chooseProvince() {
    this.setData({
      showProvince: true,
      showCity2: false,
    })
  },
  //点击标题市 省和区隐藏 市出现
  chooseCity2() {
    this.setData({
      showProvince: false,
      showCity2: true,
      showarea: false
    })
  },
  //获取市
  getCity() {
    for (var item of this.data.provinceL) {
      this.setData({
        provinceName: item.regionName,
      })
    }
  },
  //获取省
  getProvince(e) {
    var _this = this;
    // console.log(e.currentTarget.dataset.name)
    // console.log(e.currentTarget.dataset.id)
    codeProvince = e.currentTarget.dataset.id + "-" + e.currentTarget.dataset.name
    province = e.currentTarget.dataset.name;
    var regionId = e.currentTarget.dataset.id;
    console.log(codeProvince)
    wx.request({
      method: "get",
      url: url +'get_regions?parentId=' + regionId,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        console.log(res.data)  //省列表
        _this.setData({
          cityL: res.data,
          showProvince: false,
          showCity2: true,
          tit2: true,
        })
      },
      fail(err) {
        console.log(err)
      }
    })
    this.setData({
      areaL: [],
    })
  },
  // //获取市
  getCity2(e) {
    var _this = this;
    codeCity = e.currentTarget.dataset.id + "-" + e.currentTarget.dataset.name
    var regionId = e.currentTarget.dataset.id
    nextcity = e.currentTarget.dataset.name
    wx.request({
      method: "get",
      url: url +'get_regions?parentId=' + regionId,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        console.log(res.data)  //市列表
        _this.setData({
          areaL: res.data,
          showarea: true,
          showCity2: false,
          tit3: true,
        })
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  // //获取区
  getarea(e) {
    codeArea = e.currentTarget.dataset.id + "-" + e.currentTarget.dataset.name
    district = e.currentTarget.dataset.name
    var totalCity = province + "-" + nextcity + "-" + district
    //console.log(codeArea)
    this.setData({
      chooseCity: totalCity,
      showCity: false,
      mackShow: false,
    })
  },
  closeMask() {
    this.setData({
      showCity: false,
      mackShow: false,
    })
  },
  //点击下拉框
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  //点击菜单
  mySelect(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      grade_name: name,
      select: false,
      link_options: e.currentTarget.dataset.id
    })
    console.log(this.data.link_options)
  },
  // 是否
  parameterTap: function (e) {   //e是获取e.currentTarget.dataset.id所以是必备的，跟前端的data-id获取的方式差不多
    var that = this
    var this_checked = e.currentTarget.dataset.id
    console.log(e.currentTarget.dataset.id)
    var parameterList = this.data.parameter//获取Json数组
    for (var i = 0; i < parameterList.length; i++) {
      if (parameterList[i].id == this_checked) {
        parameterList[i].checked = true;//当前点击的位置为true即选中
      }
      else {
        parameterList[i].checked = false;//其他的位置为false
      }
    }
    that.setData({
      parameter: parameterList,
      choose: e.currentTarget.dataset.id
    })
  },
  //提交
   getList(){
     if (this.data.name == "" || this.data.idcard == "" || this.data.address == "" || this.data.linkname=="" ||this.data.link_options==""||
       this.data.linkcard == "" || this.data.linkNum == "" || q1 == null || q2 == null || 
       q3 == null || q4 == null || q5 == null || q6 == null || this.chooseCity=="点击我选择" )
            {
            wx.showToast({
              title: '请正确输入信息',
              icon: 'none',
              duration: 2000
            })
              return false;
          }else{
              console.log("通过")
       var url3 = url +"ins_self_assessment_update";
                    var insName = this.data.name;
                    wx.setStorageSync('insName', insName);
                    var insIdcard =this.data.idcard;
                    wx.setStorageSync('insIdcard', insIdcard);    
                    var address = this.data.address;
                    wx.setStorageSync('address', address);      
                    var contactName = this.data.linkname;
                    wx.setStorageSync('contactName', contactName); 
                    var contactIdcard = this.data.linkcard;
                    wx.setStorageSync('contactIdcard', contactIdcard); 
                    var contactPhone = this.data.linkNum;
                    wx.setStorageSync('contactPhone', contactPhone); 
                    var province = codeProvince;
                    var city = codeCity;
                    var district = codeArea;
                    var relationshipInsUser = this.data.link_options;
                    var confirmApply =this.data.choose; 
                    console.log("申请人姓名"+insName)
                    console.log("申请人身份证"+insIdcard)
                    console.log("联系人姓名"+contactName)
                    console.log("联系人身份证"+contactIdcard)
                    console.log("联系人电话"+contactPhone)
                    console.log("省" + province)
                    console.log("市" + city)
                    console.log("区" + district)
                    console.log("地址"+address)
                    console.log("是否申请 :"+confirmApply)
                    console.log("关系"+relationshipInsUser)
                    console.log(q1,q2,q3,q4,q5,q6)
              wx.request({
                method: "POST",
                url: url3,
                data: {
                    act: "InsSelfAssessment",
                    insName: insName,
                    insIdcard: insIdcard,
                    province: province,
                    district: codeArea,
                    city: codeCity,
                    street: "",
                    address: address,
                    contactName: contactName,
                    contactIdcard: contactIdcard,
                    contactPhone: contactPhone,
                    relationshipInsUser: relationshipInsUser,
                    q1: q1,
                    q2: q2,
                    q3: q3,
                    q4: q4,
                    q5: q5,
                    q6: q6,
                    confirmApply: confirmApply
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success(res) {
                  console.log(res)
                  if (res.data.errorCode == 0){
                    if (tconfirmApply==1){
                      wx.navigateTo({
                        url: '../applyfor/applyfor'
                      })
                    }else{
                      wx.navigateTo({
                        url: '../successful/successful'
                      })
                    }
                  }
                },
                fail(err) {
                  console.log(err)
                  wx.showToast({
                    title: '您未提交成功',
                    icon: 'none',
                    duration: 2000
                  }) 
                }
            })               
        }
      }
})