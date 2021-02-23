import { curry } from 'ramda';

export const within = curry((min: number, max: number, value: number) => {
  return min <= value && max >= value;
});
