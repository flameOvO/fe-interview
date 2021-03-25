function retry(fn, count) {
  return new Promise(async (resolve, reject) => {
    while(count--) {
      try {
        const res = await fn();
        resolve(res);
        break;
      } catch (error) {
        if(count === 0) {
          reject(error);
        }
      }
    }
  });
}
// function retry(fn, count) {
//   const res = fn();
//   return new Promise((resolve, reject) => {
//     res.then((val) => {
//       resolve(val);
//     }).catch((e) => {
//       if (count > 0) {
//         resolve(retry(fn, count-1));
//       } else {
//         reject(e);
//       }
//     })
//   })
// }
// function retry(fn, count) {
//   function callFn(resolve, reject) {
//     fn().then((val) => {
//       resolve(val);
//     }).catch((e) => {
//       if (count > 0) {
//         count--;
//         callFn(resolve, reject);
//       } else {
//         reject(e);
//       }
//     })
//   }
//   return new Promise((resolve, reject) => {
//     callFn(resolve, reject);
//   })
// }
function test() {
  return new Promise((resolve, reject) => {
    const num = (Math.random() * 10);
    console.log('num=====',num);
    setTimeout(() => {
      if (num > 9) {
        resolve(num)
      } else {
        reject('num <= 5');
      }
    }, 500)
  })
}

retry(test, 5).
  then((val) => {
    console.log('success', val)
  })
  .catch((e) => {
    console.log('error====', e);
  })


