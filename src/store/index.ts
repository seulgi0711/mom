import {
  getHours,
  getMinutes,
  getSeconds,
  getStartTimestampOfDay,
} from '@/utils/date';
import { padLeft } from '@/utils/pad';
import { delayed, interval } from '@/utils/timer';
import {
  compose,
  converge,
  identity,
  join,
  multiply,
  nthArg,
  prop,
  subtract,
  toString,
  unapply,
} from 'ramda';
import { createStore } from 'vuex';

const SECOND = 1000;
const MINUTE = SECOND * 60;

const getGetters = nthArg(1);

export default createStore({
  state: {
    currentTime: new Date(),
    todo: '',
    sayings: [
      'Seeing is believing',
      'Whatever you do, make it pay.',
      'You will never know until you try.',
      'No sweat, no sweet.',
      'Let bygones be bygones.',
      'Do not count the eggs beore they hatch.',
      'Life is venture or nothing.',
      'She can do, he can do, why not me?',
      'Pain past is pleasure.',
      'Time is gold.',
      'Step by step goes a long way.',
    ],
  },
  getters: {
    today: compose(getStartTimestampOfDay, prop('currentTime')),
    currentHours: compose(
      padLeft(2, '0'),
      toString,
      getHours,
      prop('currentTime'),
    ),
    currentMinutes: compose(
      padLeft(2, '0'),
      toString,
      getMinutes,
      prop('currentTime'),
    ),
    formattedCurrentTime: compose(
      join(':'),
      converge(unapply(identity), [
        prop('currentHours'),
        prop('currentMinutes'),
      ]),
      getGetters,
    ),
  },
  mutations: {
    setCurrentTime(state) {
      state.currentTime = new Date();
    },
    setTodo(state, value: string) {
      state.todo = value;
    },
  },
  actions: {
    initTimeInterval({ dispatch, state }) {
      compose(
        delayed(() => dispatch('startTimeInterval')),
        subtract(MINUTE),
        multiply(1000),
        getSeconds,
      )(state.currentTime);
    },
    startTimeInterval({ commit }) {
      commit('setCurrentTime');
      interval(() => commit('setCurrentTime'), MINUTE);
    },
    getTodo({ commit }) {
      const todoItem = localStorage.getItem('todo') ?? '';
      const [timestamp, todo] = todoItem.split(':');
      const todsyTimestamp = getStartTimestampOfDay(new Date());
      if (timestamp === todsyTimestamp.toString()) {
        commit('setTodo', todo);
      } else {
        localStorage.removeItem('todo');
      }
    },
    setTodo({ commit, state }, value: string) {
      commit('setTodo', value);
      localStorage.setItem(
        'todo',
        `${getStartTimestampOfDay(state.currentTime)}:${value}`,
      );
    },
  },
  modules: {},
});
