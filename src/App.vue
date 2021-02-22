<template>
  <div class="app-wrapper">
    <LeftSide />
    <div><Todo /> <Saying /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import Saying from './components/Saying.vue';
import Todo from './components/Todo.vue';
import LeftSide from './components/LeftSide.vue';

export default defineComponent({
  name: 'App',
  components: {
    Todo,
    LeftSide,
    Saying,
  },
  created() {
    this.initTimeInterval();
  },
  methods: {
    ...mapActions(['initTimeInterval']),
  },
});
</script>

<style lang="scss">
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

  > * {
    flex: 1;
  }
}
</style>
