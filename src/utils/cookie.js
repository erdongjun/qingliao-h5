const cookie = {
  set(key, val, time) { // 设置cookie方法
    const date = new Date(); // 获取当前时间
    const expiresDays = time; // 将date设置为n天以后的时间
    date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); // 格式化为cookie识别的时间
    document.cookie = `${key}=${val};expires=${date.toGMTString()}`; // 设置cookie
  },
  get(key) { // 获取cookie方法
    const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`);
    const arr = document.cookie.match(reg);
    if (arr) { return unescape(arr[2]); }
    return null;
  },
  delete(key) { // 删除cookie方法
    const date = new Date(); // 获取当前时间
    date.setTime(date.getTime() - 10000); // 将date设置为过去的时间
    document.cookie = `${key}=v; expires =${date.toGMTString()}`;// 设置cookie
  },
};

export default cookie;
