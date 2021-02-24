import { compose, inc, invoker } from 'ramda';

export const getYear: (date: Date) => number = invoker(0, 'getFullYear');

export const getMonth: (date: Date) => number = compose(
  inc,
  invoker(0, 'getMonth'),
);

export const getDate: (date: Date) => number = invoker(0, 'getDate');

export const getSeconds: (date: Date) => number = invoker(0, 'getSeconds');

export const getMinutes: (date: Date) => number = invoker(0, 'getMinutes');

export const getHours: (date: Date) => number = invoker(0, 'getHours');

export const getStartTimestampOfDay = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate.getTime();
};
