<template>
  <div class="app-wrapper" :style="wrapperStyle">
    <LeftSide />
    <div><Todo /> <Saying /></div>
  </div>
</template>

<script lang="ts">
import * as api from '@/api';
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import LeftSide from './components/LeftSide.vue';
import Saying from './components/Saying.vue';
import Todo from './components/Todo.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      wrapperStyle: {
        backgroundImage: '',
      },
    };
  },
  components: {
    Todo,
    LeftSide,
    Saying,
  },
  created() {
    this.fetchBackground();
    this.initTimeInterval();
  },
  methods: {
    ...mapActions(['initTimeInterval']),
    async fetchBackground() {
      const url = await api.fetchBgUrl();
      this.wrapperStyle.backgroundImage = `url("${url}")`;
    },
  },
});
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

.app-wrapper {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-size: cover;

  > * {
    flex: 1;
  }
}
</style>
