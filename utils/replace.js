//替换URL中特殊字符
function replaceSpecialChar(url) {
  url = url.replace(/&quot;/g, '"');
  url = url.replace(/&amp;/g, '&');
  url = url.replace(/&lt;/g, '<');
  url = url.replace(/&gt;/g, '>');
  url = url.replace(/&nbsp;/g, ' ');
  console.log("转义字符", url);
  return url;
}
module.exports = {
  replaceSpecialChar: replaceSpecialChar
}
