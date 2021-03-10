import { compose, concat, flip, join, repeat } from 'ramda';

const flipConcat = flip(concat);

export const padLeft = (count: number, char: string) => (
  str: string,
): string => {
  return str.length < count
    ? compose(flipConcat(str), join(''), repeat(char))(count - str.length)
    : str;
};
