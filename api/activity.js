import server from '@/config/server.js'

// 活动报名
const SaveEnrollInfo = (input) => {
	return server.request('/activityorder/SaveEnrollInfo', 'POST', input,true);
}

//活动列表
const appletFindActivityList = (id)=>{
	return server.request('/activityinfo/appletFindActivityList','GET',id,true)
}

//活动详情
const appletFindActivityDetail = (id)=>{
	return server.request('/activityinfo/appletFindActivityDetail','GET',id,true)
}

//活动报名成功结果
const appletFindEnrollResult = (input)=>{
	return server.request('/activityorder/appletFindEnrollResult','GET',input,true)
}

//获取财商类活动ID
const appletFindFQActivity = (input)=>{
	return server.request('/activityinfo/appletFindFQActivity','GET',input,true)
}

// 敏感词校验
const checkContentIsBad = (input)=>{
	return server.request('/demandsensitiveword/checkContentIsBad','GET',input,true)
}

//查询活动类详情
const appletFindActivity = (input)=>{
	return server.request('/activityinfo/appletFindActivity','GET',input,true)
}

// 查询活动类活动报名结果
const appletFindActivityEnrollResult = (input)=>{
	return server.request('/activityorder/appletFindActivityEnrollResult','GET',input,true)
}
// 小程序查询活动网点
const networkinfoPage = (input)=>{
	return server.request('/networkinfo/page','GET',input,true)
}


module.exports = {
	SaveEnrollInfo: SaveEnrollInfo,
	appletFindActivityList: appletFindActivityList,
	appletFindEnrollResult: appletFindEnrollResult,
	appletFindActivityDetail:appletFindActivityDetail,
	appletFindFQActivity:appletFindFQActivity,
	checkContentIsBad:checkContentIsBad,
	appletFindActivity:appletFindActivity,
	appletFindActivityEnrollResult:appletFindActivityEnrollResult,
	networkinfoPage:networkinfoPage
}