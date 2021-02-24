<template>
  <div class="bg-wrapper" :style="wrapperStyle"></div>
</template>

<script>
import * as api from '@/effects/api';

export default {
  name: 'Bg',
  data() {
    return {
      wrapperStyle: {
        backgroundImage: '',
      },
    };
  },
  created() {
    this.fetchBackground();
  },
  methods: {
    async fetchBackground() {
      const { color, urls } = await api.fetchBgUrl();
      this.wrapperStyle.background = `center / cover no-repeat url("${urls.full}"), ${color}`;
    },
  },
};
</script>

<style scoped>
.bg-wrapper {
  background-size: cover;
  width: 100vw;
  height: 100vh;
}
</style>
