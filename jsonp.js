let index = 0;
function jsonp(options) {
  const url = options.url;
  const query = options.query;
  const callback = options.callback;
  query.callbackName = '__JSONP__';
  window.[`__JSONP__${index}`] = (res) => {
    callback.call(undefined, res);
    window.__JSONP__
  }
  index++;
  const queryStr = Object.entries(query).reduce((str, [key, value]) => {
    str += `${key}=${value}`;
  }, '')
  const scriptElm = document.createElement('script');
  scriptElm.src = `${url}?${queryStr}`;
  document.body.appendChild(scriptElm);
  scriptElm.onload(() => {
    document.body.removeChild(scriptElm);
  })
}