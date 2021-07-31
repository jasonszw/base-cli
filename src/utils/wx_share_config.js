import axios from 'axios';
import {Toast} from "vant";

const share = ()=>{
	return new Promise((resolve, reject) => {
		axios.post('https://axatp.55hudong.com/api/wxjsconfig',{
			url: location.href
		}).then(res=>{
			if (res.data.status === 0) {
				resolve(res.data.data)
				let data = res.data.data;
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: data.appId, // 必填，公众号的唯一标识
					timestamp: data.timestamp, // 必填，生成签名的时间戳
					nonceStr: data.noncestr, // 必填，生成签名的随机串
					signature: data.signature,// 必填，签名
					jsApiList: [
						'checkJsApi',
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'onMenuShareQQ',
						'onMenuShareWeibo',
						'hideMenuItems',
						'showMenuItems',
						'hideAllNonBaseMenuItem',
						'showAllNonBaseMenuItem'
					] // 必填，需要使用的JS接口列表
				});
				wx.ready(function(){
					wxReady()
					// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
				});
			} else {
				Toast.fail(res.data.msg);
			}
		}).catch(err=>{
			reject();
		})
	})
};
const wxReady = () =>{
	wx.onMenuShareAppMessage({
		title: window.shareData.title,
		desc: window.shareData.desc,
		link: window.shareData.link,
		imgUrl: window.shareData.imgUrl,
		success: function (res) {
			console.log(res)
		}
	});
	wx.onMenuShareTimeline({
		title: window.shareData.title,
		link: window.shareData.link,
		imgUrl: window.shareData.imgUrl,
		success: function (res) {
			console.log(res)
		}
	});
	wx.onMenuShareQQ({
		title: window.shareData.title,
		desc: window.shareData.desc,
		link: window.shareData.link,
		imgUrl: window.shareData.imgUrl
	});
	wx.onMenuShareWeibo({
		title: window.shareData.title,
		desc: window.shareData.desc,
		link: window.shareData.link,
		imgUrl: window.shareData.imgUrl
	});
	wx.hideMenuItems({
		menuList: [
			'menuItem:openWithQQBrowser',
			'menuItem:openWithSafari',
			'menuItem:share:email',
			'menuItem:readMode',
			'menuItem:copyUrl',
			'menuItem:exposeArticle',
			'menuItem:setFont',
			'menuItem:refresh'
		]
	});
}
export default share
