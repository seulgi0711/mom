import { curry } from 'ramda';

export const delayed = curry((func: Function, milliseconds: number) => {
  return setTimeout(func, milliseconds);
});

export const interval = curry((func: Function, milliseconds: number) => {
  return setInterval(func, milliseconds);
});
