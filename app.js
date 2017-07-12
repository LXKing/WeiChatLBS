//app.js
// 引用百度地图微信小程序JSAPI模块   
var bmap = require('/libs/bmap-wx/bmap-wx.min.js');
var wxMarkerData = [];  //定位成功回调对象 
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getLBSinfo:function(e){
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      //type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.globalData.LBSinfo = res;
        typeof e == "function" && e(that.globalData.LBSinfo)
      }
    })
  },
  getBDLBSinfo:function(e){
    var that = this;
    /* 获取定位地理位置 */
    // 新建bmap对象   
    var BMap = new bmap.BMapWX({
      ak: that.globalData.ak
    });
    var fail = function (data) {
      //console.log(data);
    };
    var success = function (data) {
      //返回数据内，已经包含经纬度  
      //console.log(data);
      that.globalData.BDLBSinfo = data;
      typeof e == "function" && e(that.globalData.BDLBSinfo)
      //使用wxMarkerData获取数据  
      //wxMarkerData = data.wxMarkerData;
      //把所有数据放在初始化data内  
      //that.setData({
       // markers: wxMarkerData,
       // latitude: wxMarkerData[0].latitude,
      //  longitude: wxMarkerData[0].longitude,
      //  address: wxMarkerData[0].address,
     //   cityInfo: data.originalData.result.addressComponent
     // });
    }
    // 发起regeocoding检索请求   
    BMap.regeocoding({
      fail: fail,
      success: success
    });  
  },
  globalData:{
    userInfo:null,
    LBSinfo:null,
    BDLBSinfo:null,
    ak: "Fqw2wCPEFlsx9nM9vQP1LwQVT6Hyg6dt"
  }
})