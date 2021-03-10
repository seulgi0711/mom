import { pipe } from 'fp-ts/lib/function';
import type { IO } from 'fp-ts/lib/IO';
import { map as ioMap } from 'fp-ts/lib/IO';
import { none, Option, some } from 'fp-ts/lib/Option';
import { evolve, split, zipObj } from 'ramda';
import { getStartTimestampOfDay } from './date';

type StoredTodo = {
  timestamp: number,
  todo: string;
}

const dateIO: IO<Date> = () => new Date();

export const convertStoredTodo = (todo: string): StoredTodo => {
  return pipe(split(':', todo), zipObj(['timestamp', 'todo']), evolve({timestamp: parseInt}));
};


export const validateStoredTodo = (storedTodo: StoredTodo): Option<string> => {
  return pipe(
    dateIO,
    ioMap(getStartTimestampOfDay),
    ioMap((ts) => storedTodo.timestamp === ts ? some(storedTodo.todo) : none)
  )()
}