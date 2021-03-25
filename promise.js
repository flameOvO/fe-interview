'use strict'
// mon
const microTask = (fn) =>  Promise.resolve().then(fn);

function resolvePromise(promise, value) {
  microTask(() => {
    if (promise.status === 'pending') {
      promise.status = 'fulfilled';
      promise.value = value;
      promise.fulfilledCb.forEach((fn) => {
        fn.call(undefined, promise.value);
      })
    }
  })
  
}
function rejectPromise(promise, value) {
  microTask(() => {
    if (promise.status === 'pending') {
      promise.status = 'rejected';
      promise.value = value;
      promise.rejectedCb.forEach((fn) => {
        fn.call(undefined, promise.value);
      })
    }
  }, 0)
}

function MyPromise(fn) {
  this.status = 'pending'; // 状态
  this.value = undefined;
  this.fulfilledCb = []; // fullfilled回调
  this.rejectedCb = []; // rejected回调
  const promise = this;
  function resolve (result) {
    // 如果resolve接收的是一个Promise实例，要根据Promise的状态来决定当前的promise是fullfilled还是 rejected。
    if (result instanceof MyPromise) {
      if(result.status !== 'pending') {
        result.status === 'fulfilled' ? resolvePromise(promise, result.value) : rejectPromise(promise, result.value);
      } else {
        result.then((value) => {
          resolvePromise(promise, result.value)
        }, () => {
          rejectPromise(promise, result.value)
        })
      }
    } else {
      // 接收的是一个非Promise实例的值，则直接resolve。
      resolvePromise(promise, result)
    }
  }
  function reject(result) {
    rejectPromise(promise, result);
  }
  try {
    fn.call(undefined, resolve, reject);
  } catch (error) {
    reject(error);
  }
}


MyPromise.prototype.then = function(thenCb, catchCb) {
  let cbWrap = (fn, resolve, reject) => {
    return (val) => {
      if(fn) { // 如果有对应的处理函数
        try {
          let res = fn.call(undefined, val);
          resolve(res);
        } catch (error) {
          reject(error); 
        }
      } else { // 如果没有catch处理错误，抛给下一个实例处理错误。
        reject(val);
      }
    }
  }
  const promise = this;
  if(promise.status === 'pending') {
    return new MyPromise((resolve, reject) => {
      promise.fulfilledCb.push(cbWrap(thenCb, resolve, reject));
      promise.rejectedCb.push(cbWrap(catchCb, resolve, reject));
    });
  } else {
    const fn = promise.status === 'fulfilled' ? thenCb : catchCb;
    return new MyPromise((resolve, reject) => {
      cbWrap(fn, resolve, reject)();
    });
  }
}


MyPromise.prototype.catch = function(fn) {
  this.then(null, fn)
}
MyPromise.all = function(promiseArr) {
  let count = 0;
  let result = [];
  const arrLen = promiseArr.length;
  return new MyPromise((resolve, reject) => {
    promiseArr.forEach((promise, index) => {
      promise.then((value) => {
        count += 1;
        result[index] = value;
        if(count === arrLen) {
          resolve();
        }
      }, (error) => {reject(error)})
    })
  })
}


// test
console.log('start');

function fn() {
  return new MyPromise((resolve) => {
    throw new Error('test');

    setTimeout(() => {
      console.log('MyPromise');
      resolve('123');
    }, 0);
  })
}

const res = fn().then((val) => {
  console.log('then', val);
}).catch(e => {console.log('catch', e)});

console.log('end');