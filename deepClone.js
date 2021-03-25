// 深克隆
function deepClone(obj, map = new WeakMap()) {
  if (obj == null || typeof obj !== 'object') {
    return obj;
  }
  // 解决循环引用。
  if(map.get(obj)) {
    return map.get(obj);
  }
  const newObj = Object.create(null);
  map.set(obj, newObj);

  for(let key in obj) {
    // 如果是数组，对数组每一个元素做判断，非原始类型做deepClone
    if(Array.isArray(obj[key])) {
      newObj[key] = obj[key].map(item => {
        if (typeof item === 'object') {
          return deepClone(item, map)
        } else {
          return item;
        }
      });
    } else if(typeof obj[key] === 'object') {
      // 如果是对象做deepClone
      newObj[key] = deepClone(obj[key], map);
    } else {
      // 其他的直接赋值。
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

const obj = {
  a: 1,
  b: {
    name: 1,
  },
  c: [2,{age: 123}],
  d: function() {},
}
obj.e = obj;

const newObj = deepClone(obj);

console.log(newObj);
console.log(obj);
console.log(obj === newObj);
console.log(obj.b === newObj.b);
console.log(obj.c[1] === newObj.c[1]);
console.log(obj.e === newObj.e);
