import { padLeft } from '@/utils/pad';
import { createStore } from 'vuex';

export default createStore({
  state: {
    currentTime: new Date()
  },
  getters: {
    currentHours(state) {
      const hours = state.currentTime.getHours();
      return padLeft(2, '0', hours.toString());
    },
    currentMinutes(state) {
      const minutes = state.currentTime.getMinutes();
      return padLeft(2, '0', minutes.toString());
    },
    formattedCurrentTime(_, getters) {
      return `${getters.currentHours}:${getters.currentMinutes}`;
    }
  },
  mutations: {
    setCurrentTime(state) {
      state.currentTime = new Date();
      console.log(
        '🚀 ~ file: index.ts ~ line 15 ~ setCurrentTime ~ state.currentTime',
        state.currentTime
      );
    }
  },
  actions: {
    startTimeInterval(context) {
      const remainSeconds =
        (60 - context.state.currentTime.getMinutes()) * 1000;
      console.log(
        '🚀 ~ file: index.ts ~ line 24 ~ startTimeInterval ~ remainSeconds',
        remainSeconds
      );
      setTimeout(() => {
        context.commit('setCurrentTime');
        setInterval(() => {
          context.commit('setCurrentTime');
        }, 1000 * 60);
      }, remainSeconds);
    }
  },
  modules: {}
});
