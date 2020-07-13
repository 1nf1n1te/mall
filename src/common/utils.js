// 事件监听相关方法
export function debounce(func,delay) {
  let timer = null
  // ...表示可以传递多个
  return function(...args) {
    if (timer)  clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    },delay)
  }
}

export function formatDate(date, fmt) {
  // 获取年份
  // y+表示匹配后面多个y +表示至少一个多的不限制 *表示可有可无多了不限 ?表示可有可无至多一个
  if (/(y+)/.test(fmt)) {
    // 这里是看RegExp.$1有几位 也就是y有几个 匹配4-个数位 并替换之
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 获取月 日 时 。。。
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

// 1:1:1 --> 01:01:01
// 不足两位用0补齐两位 下面这个比较巧妙记一下
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

