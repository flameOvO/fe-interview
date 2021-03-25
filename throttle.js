function throttle(fn, delay) {
  let lastCall = 0;
  if(lastCall === 0) {
    fn();
  }else {
    if(Date.now() - lastCall > delay) {
      fn();
    }
  }
}

function debounce() {
  let lastCall = 0;
  if(lastCall === 0) {
    fn();
  }else {
    const now = Date.now();
    if(now - lastCall > delay) {
      fn();
    } else {
      lastCall = now;
    }
  }
}