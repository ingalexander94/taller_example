export const debounce = (fn: Function, delay: number) => {
  let timerId: number;
  return (...args: any[]) => {
    clearTimeout(timerId);
    timerId = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
