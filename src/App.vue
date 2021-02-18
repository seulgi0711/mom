<template>
  <div>
    <Time />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import Time from './components/Time.vue';

export default defineComponent({
  name: 'App',
  components: {
    Time
  },
  created() {
    this.startTimeInterval();
  },
  methods: {
    ...mapActions(['startTimeInterval'])
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
