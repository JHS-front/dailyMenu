// 手机号码校验
function isPhone(value) {
  if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
    return false
  } else {
    return true
  }
}

//身份证号不严格校验
function isCard(value) {
  var idCardReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

  if (!idCardReg.test(value)) {
    return false
  } else {
    return true
  }
}

//身份证号严格校验
function identityIDCard(code) {
  //身份证号前两位代表区域
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 "
  };
  //身份证格式正则表达式
  var idCardReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  var errorMsg = ""; //错误提示信息
  var isPass = true; //身份证验证是否通过（true通过、false未通过）

  //如果身份证不满足格式正则表达式
  if (!idCardReg.test(code)) {
    errorMsg = "身份证格式有误！";
    isPass = false;
  }

  //区域数组中不包含需验证的身份证前两位
  else if (!city[code.substr(0, 2)]) {
    errorMsg = "身份证地址编码有误！";
    isPass = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != code[17]) {
        errorMsg = "身份证号不存在！";
        isPass = false;
      }
    }
  }
  var returnParam = {
    'errorMsg': errorMsg,
    'isPass': isPass
  }
  return returnParam;
}

/**
 * 将信息进行脱敏
 * phone手机号脱敏  name名称脱敏 email邮箱脱敏 idCard身份证脱敏
 * startIndex 开始位置的索引 endIndex 结束位置的索引
 * **/
function removeSensitive(str, type) {
  if (!str) return;
  function handleStr(str, startIndex, endIndex) {
    if (!startIndex || !endIndex) return str;
    
    const startStr = str.substr(0, startIndex);
    const endStr = str.substr(endIndex);
    const middleStr = str.substring(startIndex, str.length - Math.abs(endIndex)).replace(/[\s\S]/ig, '*');
    const result = startStr + middleStr + endStr;
    return result;
  }
  switch(type) {
    case 'name':
      const strLen = str.length;
      const result = strLen === 2 ? str.substring(0, 1) + '*' : handleStr(str, '1', '-1');
      return result;
    case 'phone':
      return handleStr(str, '3', '-4');
    case 'email':
      return handleStr(str, '8', '-4');
    case 'idCard':
      return handleStr(str, '6', '-4');
    default:
      return handleStr(str);
  }
}

module.exports = {
  isPhone,
  isCard,
  identityIDCard,
  removeSensitive
}