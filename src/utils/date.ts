import { invoker } from 'ramda';

export const getSeconds: (date: Date) => number = invoker(0, 'getSeconds');

export const getMinutes: (date: Date) => number = invoker(0, 'getMinutes');

export const getHours: (date: Date) => number = invoker(0, 'getHours');
