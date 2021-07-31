import server from "./server";

// 注册用户信息
export const reg_userinfo = (openid, empNo,empName) => {
	return server.requestPost("login/reg_userinfo", {
        openid: openid, //重定向URL回传的openId
		empNo: empNo, //重定向URL回传的openId
		empName: decodeURIComponent(empName)
	})
}

// 用户登录
export const do_login = () => {
	return server.requestPost("home/do_login", {})
}

// 用户中奖记录
export const user_prize_info = () => {
	return server.requestPost("home/user_prize_info", {})
}

// 全部中奖记录
export const prize_winning_info = () => {
	return server.requestPost("home/prize_winning_info", {})
}

// 抽奖
export const lottery = () => {
	return server.requestPost('home/lottery',{})
}

