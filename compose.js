// logger

async function md1(ctx, next) {
  try {
    console.log('md1');
    await next();
    console.log('md1111');

  } catch (error) {
    console.log(error);
  }
 
};

// x-response-time

const md2 = async (ctx, next) => {
  try {
    const start = Date.now();
    await next();
    next();
    const ms = Date.now() - start;
    console.log('X-Response-Time', `${ms}ms`);
  } catch (error) {
    console.log(error);
  }
  
};

// response
const md3 = async ctx => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      ctx.body = 123;
      return resolve('md3========123');
    }, 1000);
  })
 
}

const middleware = [md1, md2, md3];

const FN = compose(middleware);

function compose(middleware) {
  return function (ctx, next) {
    function dispatch(i) {
      let fn = i === middleware.length ? next : middleware[i];
      if (!fn) {
        return Promise.resolve();
      }
      try {
        const res = fn(ctx, dispatch.bind(null, i+1));
        console.log(i, '=======', res);
        return Promise.resolve(res);
      } catch (err) {
        return Promise.reject(err);
      }
      
    }
    return dispatch(0);
  }
}
const ctx ={};
const promise = FN(ctx);
console.log(promise);
promise.then(() => {
  console.log(ctx, 'success');
});