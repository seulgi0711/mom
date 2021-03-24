import * as storage from '@/effects/storage';
import { getStartTimestampOfDay } from '@/utils/date';
import { chainIoOption, mapIoOption } from '@/utils/fn';
import type { Todo } from '@/utils/todo';
import { convertStoredTodo, validateStoredTodo } from '@/utils/todo';
import { reactive } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
import { pipe } from 'fp-ts/lib/function';
import { map as ioMap } from 'fp-ts/lib/IO';
import { foldW as oFoldW } from 'fp-ts/lib/Option';
import { tap } from 'ramda';
import useTime from './useTime';

export default function useTodo() {
  const todo = reactive({ content: '', done: false });
  const { currentTime } = useTime();

  const setTodo = (newTodo: typeof todo) => {
    todo.content = newTodo.content;
    todo.done = newTodo.done;
  };

  const hasTodo = computed(() => todo.content !== '');

  const getTodoStorageValue = (todo: Todo) => {
    return `${getStartTimestampOfDay(currentTime.value)}:|:${JSON.stringify(todo)}`;
  }

  const api = {
    deleteTodo: () => {
      storage.removeItem('todo')();
    },
    fetchTodo: () => {
      pipe(
        storage.getItem('todo'),
        mapIoOption(convertStoredTodo),
        chainIoOption(validateStoredTodo),
        ioMap(oFoldW(api.deleteTodo, setTodo)),
      )();
    },
    setTodo: (todo: Todo) => {
      pipe(
        todo,
        tap(setTodo),
        getTodoStorageValue,
        (value) => storage.setItem('todo', value)
      )();
    },
  };

  return {
    api,
    setTodo,
    hasTodo,
    todo,
  };
}
