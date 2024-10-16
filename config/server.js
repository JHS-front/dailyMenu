

import {showMessage} from './common/message.js';
// import store from '@/store/index.js';


/**
 * 服务地址
 */
const SERVE_URL = 'https://dzbh-ysjx-xt.nc.bankofbeijing.com.cn/api'; // uat
const SERVE_URL_ONE = 'https://dzbh-ysjx-xt.nc.bankofbeijing.com.cn/minio/'; // OSS动态图片（接口返回用）
const SERVE_URL_TWO = 'https://dzbh-ysjx-xt.nc.bankofbeijing.com.cn/minio/jcaactive/upload/'; // OSS静态图片


// 封装request 含token
const request = (
	url,
	method,
	input,
	token,
	// pubInfo = {
	// 	token: store.state.user.token,
	// 	wechatUserId: store.state.user.wechatUserId,
	// 	timeStamp: new Date(),
	// }
) => {
	const data = input
	// console.log(input,'接口请求input')
	// console.log(token,'接口请求token')
	let tokens = null
	if(token){
		// tokens = store.state.user.token;
		tokens = uni.getStorageSync('token');
	}
	
	let promise = new Promise((resolve, reject) => {
		uni.request({
			url: SERVE_URL + url,
			method,
			data,
			header: {
				// 'tokenId':uni.getStorageSync('token')
				'tokenId':tokens ? tokens : ''
			},
			success: res => {
				// console.log(res,'接口请求')
				if (res.statusCode === 500) {
					showMessage('网络繁忙');
					resolve(res.data);
				} else {
					resolve(res.data);
				}
			},
			fail: res => {
				if (res.statusCode === 500) {
					showMessage('网络繁忙');
					resolve(res.data);
				}  else {
					showMessage(res.data);
					resolve(res.data);
				}
			}
		});
	});
	return promise;
}


module.exports = {
	SERVE_URL: SERVE_URL,
	SERVE_URL_ONE:SERVE_URL_ONE,
	SERVE_URL_TWO:SERVE_URL_TWO,
	request: request,
}
