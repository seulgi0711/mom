import { IO } from 'fp-ts/lib/IO';
import { fromNullable, Option } from 'fp-ts/lib/Option';
import { curry } from 'ramda';

export const getItem = (key: string): IO<Option<string>> => () => {
  return fromNullable(localStorage.getItem(key));
};

export const setItem = curry(
  (key: string, value: string): IO<void> => () => {
    return localStorage.setItem(key, value);
  },
);

export const removeItem = (key: string): IO<void> => () => {
  localStorage.removeItem(key);
};
