export function handleWithDebounce(fn, interval = 1000) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, +interval);
  };
}
