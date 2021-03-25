function get(obj, path) {
  if(obj == null || !path) {
    return undefined;
  }
  // 'a[b].c[1]' => a.b.c.1
  path = path.replace(/\[([\w\d]+)\]/g, '.$1');

  const pathArr = path.split('.');
  const length = pathArr.length;
  let res = obj;
  for (let i=0; i < length; i++) {
    const key = pathArr[i];
    if(res[key]) {
      res = res[key];
    } else {
      return undefined
    }
  }
  return res;
}

const obj = {
  a : {
    b: {
      c: [1,23,1]
    }
  }
}

console.log(get(obj, 'a[b].c[1]'))