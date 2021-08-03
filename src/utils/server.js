import Vue from 'vue'
import axios from 'axios'
import {Toast} from "vant";

const host = location.origin.indexOf("192.168") > 0 ? "/api" : location.origin;

const config = {
	// 基础url前缀
	baseURL: `${host}${catalog_api_url}`,
	// 请求头信息
	headers: {
		'Content-Type': 'application/json',
	},
	// 参数
	data: {},
	// 设置超时时间
	timeout: 10000,
	// 携带凭证
	withCredentials: false,
	// 返回数据类型
	responseType: 'json'
};

const request = (options) => {
	return new Promise((resolve, reject) => {
		const instance = axios.create({
			baseURL: config.baseURL,
			headers: config.headers,
			timeout: config.timeout
		})
		// 添加请求拦截器
		instance.interceptors.request.use((config) => {
			if (config.method.toLocaleLowerCase() === 'post' || config.method.toLocaleLowerCase() === "put") {
				config.data = JSON.stringify(config.data)
			}
			Toast.loading({
				message: '加载中...',
				duration: 0,
				forbidClick: true
			});
			return config;
		}, (error) => {
			return reject(error);
		});
		// 添加响应拦截器
		instance.interceptors.response.use((response) => {
			if (response.status === 200) { // 请求成功
				if (response.data.status === 5) {

				}
			}
			return response;
		}, (err) => {
			if (err.response.status === 504 || err.response.status === 404) {
				console.log("服务器被吃了⊙﹏⊙∥");
			} else if (err.response.status === 401) {
				console.log("登录信息失效⊙﹏⊙∥");
			} else if (err.response.status === 500) {
				console.log("服务器开小差了⊙﹏⊙∥");
			}
			return reject(err);
		});

		instance(options).then(res => {
			resolve(res.data);
			Toast.clear();
			return false;
		}).catch(err => {
			Toast.clear();
			reject(err)
		})
	})
};

const requestPost = (url, data) => {
	return request({
		url: `${url}`,
		method: 'post',
		data,
	})
};
const requestGet = (url, params) => {
	return request({
		url: `${url}`,
		method: 'get',
		params
	})

};
const login = (data) => {
	request({
		url: data,
		method: 'post',
		data: {}
	})
}
export default {
	requestPost,
	requestGet
}
Vue.prototype.requestPost = requestPost;
Vue.prototype.requestGet = requestGet;
