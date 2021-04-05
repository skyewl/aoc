
function initshare(){

	wx.ready(function(){
			// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
			wx.onMenuShareTimeline({
			    title: mainTitle, // 分享标题
			    link: mainURL, // 分享链接
			    imgUrl: mainImgUrl, // 分享图标
			    success: function () { 
			        // 用户确认分享后执行的回调函数
			    	submitshare();
			    },
			    cancel: function () { 
			        // 用户取消分享后执行的回调函数
			    }
			});
			wx.onMenuShareWeibo({
			    title: mainTitle, // 分享标题
			    desc: mainDesc, // 分享描述
			    link: mainURL, // 分享链接
			    imgUrl: mainImgUrl, // 分享图标
			    success: function () { 
			       // 用户确认分享后执行的回调函数
			    	submitshare();
			    },
			    cancel: function () { 
			        // 用户取消分享后执行的回调函数
			    }
			});
			
			wx.onMenuShareAppMessage({
			    title: mainTitle, // 分享标题
			    desc:  mainDesc, // 分享描述
			    link: mainURL, // 分享链接
			    imgUrl:  mainImgUrl, // 分享图标
			    type: '', // 分享类型,music、video或link，不填默认为link
			    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			    success: function () { 
			        // 用户确认分享后执行的回调函数
			    	submitshare();
			    },
			    cancel: function () { 
			        // 用户取消分享后执行的回调函数
			    }
			});
				

		wx.error(function(res) {
			
			}); 
		
	}); 
}


var serurl="https://www.heisezhizhao.com/aoc";
var signature;
var timestape;
var noncestr;
var appId;  
 
var mainTitle ="全屏云视代 融竞犇新篇",
mainDesc="2021年AOC渠道合作伙伴大会",
mainURL= serurl+"/api/wechat/wechatindex"; 
mainImgUrl= "http://kmaoc.oss-cn-beijing.aliyuncs.com/icon.png";

$(document).ready(function(){
var location = window.location.href.split('#')[0];
var url = serurl+"/api/wechat/getsignature?requestUrl=" + encodeURIComponent(location);
$.ajax({
	type : "get",
	url : url,
	dataType : "json",
	async:false,
	success : function(data){
		signature = data.results.signature;
		timestape = data.results.timestape;
		noncestr = data.results.noncestr;
		appId = data.results.appId; 
		wx.config({
			debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId : appId, // 必填，公众号的唯一标识
			timestamp : timestape,  // 必填，生成签名的时间戳
			nonceStr : noncestr, // 必填，生成签名的随机串
			signature : signature,// 必填，签名，见附录1
			jsApiList : [ 'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareWeibo' ]
		// 必填，需要使用的JS接口列表，所有JS接口列表见附录2 
		});
	}
}); 

initshare();
	
});
