import { getHours, getMinutes, getSeconds } from '@/utils/date';
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
    sayings: ['1', '2', '3', '4', '5'],
  },
  getters: {
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
  },
  modules: {},
});
