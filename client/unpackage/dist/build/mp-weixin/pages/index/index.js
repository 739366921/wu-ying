(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0937":function(e,n,o){},"13b4":function(e,n,o){"use strict";o.r(n);var a=o("484c"),t=o("bf5e");for(var i in t)"default"!==i&&function(e){o.d(n,e,(function(){return t[e]}))}(i);o("2806");var s,l=o("f0c5"),u=Object(l["a"])(t["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);n["default"]=u.exports},"23b7":function(e,n,o){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={data:function(){return{disabledVideo:!1,disabledImg:!1,analyseflag:!1,isShow:!1,url:"",analyseurl:"",analyseImgUrl:"",downloadurl:"",swiperlist:[{url:"../../static/swiper0.png"},{url:"../../static/swiper1.jpg"}]}},onLoad:function(){},methods:{analyseVideo:function(){var n=this;e.showLoading({title:"解析中...",mask:!0}),this.disabledVideo=!1,this.disabledImg=!1,this.$request(this.$api.wuyin.analyse,{path:this.url}).then((function(o){n.analyseurl=o.data.url,n.analyseImgUrl=o.data.img,"解析失败"==o.msg?(n.isShow=!1,e.hideLoading(),e.showToast({title:"解析失败",icon:"none",duration:2e3})):"解析成功"==o.msg&&(e.hideLoading(),e.showToast({title:"解析成功",icon:"none",duration:2e3}),n.isShow=!0,n.analyseflag=!0),console.log("11",o),console.log("22",n.analyseurl)}))},downloadVideo:function(){console.log("触发下载video按钮");var n=this;this.disabledVideo=!0,e.showLoading({title:"视频下载中...",mask:!0}),this.$requestbuffer(this.$api.wuyin.download,{path:this.analyseurl}).then((function(o){var a=e.arrayBufferToBase64(o),t=e.getFileSystemManager(),i=Math.random();t.writeFile({filePath:wx.env.USER_DATA_PATH+"/"+i+"video.mp4",data:a,encoding:"base64",success:function(o){e.saveVideoToPhotosAlbum({filePath:wx.env.USER_DATA_PATH+"/"+i+"video.mp4",success:function(o){e.hideLoading(),e.showToast({title:"下载成功",icon:"none"}),n.disabledVideo=!1},fail:function(a){console.log(a),e.hideLoading(),"saveVideoToPhotosAlbum:fail auth deny"==o.errMsg||"saveVideoToPhotosAlbum:fail:auth deny"==o.errMsg||"saveVideoToPhotosAlbum:fail:auth denied"==o.errMsg||"saveVideoToPhotosAlbum:fail authorize no response"==o.errMsg||"saveVideoToPhotosAlbum:fail socket hang up"==o.errMsg?e.showToast({title:"您未授权保存到相册，请删除小程序重新进入授权",icon:"none"}):e.showToast({title:"可能视频不支持，请换视频重试",icon:"none"}),n.disabledVideo=!1}})},fail:function(o){e.hideLoading(),e.showToast({title:"视频过大，不支持",icon:"none"}),n.disabledVideo=!1,console.log(o)}})}))},downloadImg:function(){var n=this;console.log("触发下载img按钮",this.analyseImgUrl),this.disabledImg=!0,e.showLoading({title:"封面下载中...",mask:!0}),this.$requestbuffer(this.$api.wuyin.downloadImg,{imgPath:this.analyseImgUrl}).then((function(o){var a=e.arrayBufferToBase64(o),t=e.getFileSystemManager(),i=Math.random();t.writeFile({filePath:wx.env.USER_DATA_PATH+"/"+i+"image.jpg",data:a,encoding:"base64",success:function(o){e.saveImageToPhotosAlbum({filePath:wx.env.USER_DATA_PATH+"/"+i+"image.jpg",success:function(o){e.hideLoading(),e.showToast({title:"下载成功",icon:"none",duration:2e3}),n.disabledImg=!1},fail:function(o){n.disabledImg=!1,e.hideLoading(),"saveImageToPhotosAlbum:fail auth deny"!=o.errMsg&&"saveImageToPhotosAlbum:fail:auth deny"!=o.errMsg&&"saveImageToPhotosAlbum:fail:auth denied"!=o.errMsg&&"saveImageToPhotosAlbum:fail authorize no response"!=o.errMsg&&"saveImageToPhotosAlbum:fail socket hang up"!=o.errMsg||e.showToast({title:"您未授权保存到相册，请删除小程序重新进入授权",icon:"none"}),console.log(o)}})},fail:function(o){e.hideLoading(),n.disabledImg=!1,console.log(o)}})}))},toHelp:function(){e.navigateTo({url:"/pages/help/help"})},copyVideo:function(){var n=this;e.setClipboardData({data:n.analyseurl})},copyImg:function(){var n=this;e.setClipboardData({data:n.analyseImgUrl})},inputing:function(){},copy:function(){var n=this;this.analyseflag=!1,e.getClipboardData({success:function(e){e.data&&(n.url=e.data),console.log("111",e)}})},clear:function(){this.url="",this.analyseflag=!1}}};n.default=o}).call(this,o("543d")["default"])},2806:function(e,n,o){"use strict";var a=o("0937"),t=o.n(a);t.a},"484c":function(e,n,o){"use strict";o.d(n,"b",(function(){return t})),o.d(n,"c",(function(){return i})),o.d(n,"a",(function(){return a}));var a={uIcon:function(){return o.e("uview-ui/components/u-icon/u-icon").then(o.bind(null,"7420"))},uInput:function(){return Promise.all([o.e("common/vendor"),o.e("uview-ui/components/u-input/u-input")]).then(o.bind(null,"2856"))},uButton:function(){return o.e("uview-ui/components/u-button/u-button").then(o.bind(null,"0852"))}},t=function(){var e=this,n=e.$createElement;e._self._c},i=[]},b644:function(e,n,o){"use strict";(function(e){o("393b");a(o("66fd"));var n=a(o("13b4"));function a(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,o("543d")["createPage"])},bf5e:function(e,n,o){"use strict";o.r(n);var a=o("23b7"),t=o.n(a);for(var i in a)"default"!==i&&function(e){o.d(n,e,(function(){return a[e]}))}(i);n["default"]=t.a}},[["b644","common/runtime","common/vendor"]]]);