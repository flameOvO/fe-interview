const fs = require('fs');
function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile('/path/to/file', callback);
}
const timeoutScheduled = Date.now();
setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;
  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);
// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  const startCallback = Date.now();
  console.log('fs');
  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
});
console.log('start');
setTimeout(function () {
    console.log('setTimeout');
},0);;

new Promise(function (resolve, rejected) {
    console.log('promise');
    resolve()
}).then(res=>{
    console.log('then');
    process.nextTick(() => {
        process.nextTick(() => {
            console.log('nextTick-then2');
        });
        console.log('nextTick-then1');
    });
})
Promise.resolve().then(() => {
    console.log('resolve.then');
    process.nextTick(() => {
        console.log('nextTick-then3');
    });
})
process.nextTick(() => {
    process.nextTick(() => {
        console.log('after-nextTick');
    });
    console.log('nextTick-before');
});
setImmediate(function () {
    console.log('setImmediate')
})

console.log('end');
