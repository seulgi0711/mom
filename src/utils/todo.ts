import { pipe } from 'fp-ts/lib/function';
import type { IO } from 'fp-ts/lib/IO';
import { map as ioMap } from 'fp-ts/lib/IO';
import { none, Option, some } from 'fp-ts/lib/Option';
import { evolve, split, zipObj } from 'ramda';
import { getStartTimestampOfDay } from './date';

export type Todo = {
  content: string;
  done: boolean;
}

type StoredTodo = {
  timestamp: number,
  todo: Todo;
}

const dateIO: IO<Date> = () => new Date();

export const convertStoredTodo = (todo: string): StoredTodo => {
  // prettier-ignore
  return pipe(
    split(':|:', todo),
    zipObj(['timestamp', 'todo']),
    evolve({ timestamp: parseInt, todo: JSON.parse })
  );
};


export const validateStoredTodo = (storedTodo: StoredTodo): Option<Todo> => {
  return pipe(
    dateIO,
    ioMap(getStartTimestampOfDay),
    ioMap((ts) => storedTodo.timestamp === ts ? some(storedTodo.todo) : none)
  )()
}