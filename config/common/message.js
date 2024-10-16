export function showMessage(title) {
	uni.showToast({
		icon: 'none',
		title,
		duration: 1500
	})
}
const showMessage2s=(title) =>{
	uni.showToast({
		icon:'none',
		title,
		duration:2000
	})
}
module.exports = {
	showMessage:showMessage,
	showMessage2s:showMessage2s
}
