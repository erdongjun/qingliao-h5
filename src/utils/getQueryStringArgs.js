
  

export default (url) => {
  // 取得查询字符串并去掉开头的问号
  const qs = url.substr(1);
  //保存数据的对象
  const args = {};
  //取得每一项
  const items = qs.length > 0 ? qs.split('&'):[];
  let item = null,name = null,value = null;
  for(var i = 0;i < items.length;i++) {
      item = items[i].split('=');
      name = decodeURIComponent(item[0]);
      value = decodeURIComponent(item[1]);
      if(name.length) {
          args[name] = value;
      }
  }
  return args;
}
