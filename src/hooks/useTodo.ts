import { pipe } from 'fp-ts/lib/function';
import * as storage from '@/effects/storage';
import { chainIoOption, mapIoOption } from '@/utils/fn';
import { convertStoredTodo, validateStoredTodo } from '@/utils/todo';
import { map as ioMap } from 'fp-ts/lib/IO';
import { foldW as oFoldW } from 'fp-ts/lib/Option';
import { ref } from '@vue/reactivity';
import { getStartTimestampOfDay } from '@/utils/date';
import { computed } from '@vue/runtime-core';
import useTime from './useTime';

export default function useTodo() {
  const todo = ref('');
  const { currentTime } = useTime();

  const setTodo = (value: string) => {
    todo.value = value;
  };

  const hasTodo = computed(() => todo.value !== '');

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
    setTodo: (value: string) => {
      setTodo(value);
      const storageValue = `${getStartTimestampOfDay(
        currentTime.value,
      )}:${value}`;
      storage.setItem('todo', storageValue)();
    },
  };

  return {
    api,
    setTodo,
    hasTodo,
    todo,
  };
}
