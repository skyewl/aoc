
function initshare(){

	wx.ready(function(){
			// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		
	wx.updateAppMessageShareData({ 
                title: mainTitle, // 分享标题
                desc: mainDesc, // 分享描述
                link: mainURL, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: mainImgUrl, // 分享图标
                success: function () {
                  // 设置成功
                }
        });
        
         wx.updateTimelineShareData({ 
                title: mainTitle, // 分享标题
                link: mainURL, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: mainImgUrl, // 分享图标
                success: function () {
                  // 设置成功
                }
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
mainURL= "https://fly.sj90.com/aoc-html/index.html"; 
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
	    console.log(data);
		signature = data.results.data.signature;
		timestape = data.results.data.timestamp;
		noncestr = data.results.data.nonceStr;
		appId = data.results.data.appId; 
		 console.log(noncestr);
		wx.config({
			debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId : appId, // 必填，公众号的唯一标识
			timestamp : timestape,  // 必填，生成签名的时间戳
			nonceStr : noncestr, // 必填，生成签名的随机串
			signature : signature,// 必填，签名，见附录1
			jsApiList : ['updateAppMessageShareData','updateTimelineShareData' ]
		// 必填，需要使用的JS接口列表，所有JS接口列表见附录2 
		});
	  
	}
}); 
 
  initshare();
 
});
